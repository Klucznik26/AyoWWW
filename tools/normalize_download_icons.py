from pathlib import Path
from PIL import Image

FILES = [
    Path('assets/Icons Ayo/ayoup.png'),
    Path('assets/Icons Ayo/ayoconvert.png'),
    Path('assets/Icons Ayo/ayoarch.png'),
    Path('assets/Icons Ayo/ayosort.png'),
    Path('assets/Icons Ayo/ayofolder.png'),
]

TARGET_HEIGHT = 512
ALPHA_THRESHOLD = 8


def visible_bbox(im: Image.Image):
    alpha = im.getchannel('A')
    mask = alpha.point(lambda a: 255 if a >= ALPHA_THRESHOLD else 0)
    return mask.getbbox()


def normalize(path: Path) -> None:
    im = Image.open(path).convert('RGBA')
    bbox = visible_bbox(im)
    if not bbox:
        raise RuntimeError(f'No visible pixels found in {path}')

    cropped = im.crop(bbox)
    new_width = max(1, round(cropped.width * TARGET_HEIGHT / cropped.height))
    resized = cropped.resize((new_width, TARGET_HEIGHT), Image.Resampling.LANCZOS)

    bbox2 = visible_bbox(resized)
    if bbox2:
        resized = resized.crop((0, bbox2[1], resized.width, bbox2[3]))
        if resized.height != TARGET_HEIGHT:
            new_width = max(1, round(resized.width * TARGET_HEIGHT / resized.height))
            resized = resized.resize((new_width, TARGET_HEIGHT), Image.Resampling.LANCZOS)

    resized.save(path, format='PNG', optimize=True)
    print(f'{path}: {im.size} -> {resized.size}')


for file_path in FILES:
    normalize(file_path)
