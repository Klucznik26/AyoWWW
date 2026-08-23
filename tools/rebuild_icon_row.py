from __future__ import annotations

from io import BytesIO
from pathlib import Path
import subprocess

from PIL import Image

# One-off rebuild: restore the known-good source artwork, normalize its visible
# bounds, and publish fresh asset URLs so browser/CDN caches cannot reuse the
# previously broken row.
SOURCE_COMMIT = "dcc7acae09644012b8263295321e24f777539097"
ICON_DIR = Path("assets/Icons Ayo")
OUT_DIR = ICON_DIR / "v2"
NAMES = ["ayoup.png", "ayoconvert.png", "ayoarch.png", "ayosort.png", "ayofolder.png"]
TARGET_HEIGHT = 512
ALPHA_THRESHOLD = 12
CACHE_VERSION = "20260823-1320"


def source_bytes(name: str) -> bytes:
    spec = f"{SOURCE_COMMIT}:assets/Icons Ayo/{name}"
    return subprocess.check_output(["git", "show", spec])


def visible_bbox(image: Image.Image):
    rgba = image.convert("RGBA")
    alpha = rgba.getchannel("A")
    mask = alpha.point(lambda value: 255 if value >= ALPHA_THRESHOLD else 0)
    bbox = mask.getbbox()
    if bbox is None:
        raise RuntimeError("image has no visible pixels")
    return bbox


def normalize(name: str) -> None:
    image = Image.open(BytesIO(source_bytes(name))).convert("RGBA")
    bbox = visible_bbox(image)
    cropped = image.crop(bbox)

    width = max(1, round(cropped.width * TARGET_HEIGHT / cropped.height))
    resized = cropped.resize((width, TARGET_HEIGHT), Image.Resampling.LANCZOS)

    bbox2 = visible_bbox(resized)
    resized = resized.crop((0, bbox2[1], resized.width, bbox2[3]))
    if resized.height != TARGET_HEIGHT:
        width = max(1, round(resized.width * TARGET_HEIGHT / resized.height))
        resized = resized.resize((width, TARGET_HEIGHT), Image.Resampling.LANCZOS)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / name
    resized.save(out, "PNG", optimize=True)
    print(f"{name}: {image.size} -> {resized.size}, source bbox={bbox}")


def update_index() -> None:
    path = Path("index.html")
    text = path.read_text(encoding="utf-8")

    text = text.replace(
        '<link rel="stylesheet" href="style.css">',
        f'<link rel="stylesheet" href="style.css?v={CACHE_VERSION}">',
    )

    for name in NAMES:
        old_href = f'<a href="assets/Icons%20Ayo/{name}" download>'
        new_href = f'<a href="assets/Icons%20Ayo/v2/{name}" download="{name}">'
        text = text.replace(old_href, new_href)

        old_src = f'src="assets/Icons%20Ayo/{name}"'
        new_src = f'src="assets/Icons%20Ayo/v2/{name}?v={CACHE_VERSION}"'
        text = text.replace(old_src, new_src)

    path.write_text(text, encoding="utf-8")


for icon_name in NAMES:
    normalize(icon_name)

update_index()
