const LANGUAGES = [{"code":"pl","flag":"🇵🇱","name":"Polski"},{"code":"en","flag":"🇬🇧","name":"English"},{"code":"sq","flag":"🇦🇱","name":"Shqip"},{"code":"hy","flag":"🇦🇲","name":"Հայերեն"},{"code":"az","flag":"🇦🇿","name":"Azərbaycan dili"},{"code":"eu","flag":"🇪🇸","name":"Euskara"},{"code":"bs","flag":"🇧🇦","name":"Bosanski"},{"code":"bg","flag":"🇧🇬","name":"Български"},{"code":"ca","flag":"🇦🇩","name":"Català"},{"code":"co","flag":"🇫🇷","name":"Corsu"},{"code":"hr","flag":"🇭🇷","name":"Hrvatski"},{"code":"cs","flag":"🇨🇿","name":"Čeština"},{"code":"da","flag":"🇩🇰","name":"Dansk"},{"code":"nl","flag":"🇳🇱","name":"Nederlands"},{"code":"et","flag":"🇪🇪","name":"Eesti"},{"code":"fi","flag":"🇫🇮","name":"Suomi"},{"code":"fr","flag":"🇫🇷","name":"Français"},{"code":"gl","flag":"🇪🇸","name":"Galego"},{"code":"ka","flag":"🇬🇪","name":"ქართული"},{"code":"de","flag":"🇩🇪","name":"Deutsch"},{"code":"el","flag":"🇬🇷","name":"Ελληνικά"},{"code":"hu","flag":"🇭🇺","name":"Magyar"},{"code":"is","flag":"🇮🇸","name":"Íslenska"},{"code":"ga","flag":"🇮🇪","name":"Gaeilge"},{"code":"it","flag":"🇮🇹","name":"Italiano"},{"code":"ja","flag":"🇯🇵","name":"日本語"},{"code":"kk","flag":"🇰🇿","name":"Қазақша"},{"code":"lv","flag":"🇱🇻","name":"Latviešu"},{"code":"lt","flag":"🇱🇹","name":"Lietuvių"},{"code":"lb","flag":"🇱🇺","name":"Lëtzebuergesch"},{"code":"mk","flag":"🇲🇰","name":"Македонски"},{"code":"mt","flag":"🇲🇹","name":"Malti"},{"code":"cnr","flag":"🇲🇪","name":"Crnogorski"},{"code":"mo","flag":"🇲🇩","name":"Moldovenească"},{"code":"no","flag":"🇳🇴","name":"Norsk"},{"code":"pt","flag":"🇵🇹","name":"Português"},{"code":"ro","flag":"🇷🇴","name":"Română"},{"code":"sr","flag":"🇷🇸","name":"Српски"},{"code":"sk","flag":"🇸🇰","name":"Slovenčina"},{"code":"sl","flag":"🇸🇮","name":"Slovenščina"},{"code":"es","flag":"🇪🇸","name":"Español"},{"code":"sw","flag":"🇰🇪","name":"Kiswahili"},{"code":"sv","flag":"🇸🇪","name":"Svenska"},{"code":"tr","flag":"🇹🇷","name":"Türkçe"},{"code":"uk","flag":"🇺🇦","name":"Українська"},{"code":"hi","flag":"🇮🇳","name":"हिन्दी"},{"code":"tg","flag":"🇹🇯","name":"Тоҷикӣ"},{"code":"uz","flag":"🇺🇿","name":"O‘zbekcha"},{"code":"isv","flag":"🌍","name":"Medžuslovjansky"}];

const APPS = [{"id":"up","name":"AyoUP","version":"1.7.0","languages":43,"logo":"assets/logo/Up.png","href":"https://github.com/Klucznik26/Ayo-UP","tags":["NCNN / Vulkan","Batch","ZIP models","6 themes"],"status":"public"},{"id":"convert","name":"AyoCONVERT","version":"1.7.0","languages":43,"logo":"assets/logo/Convert.png","href":"https://github.com/Klucznik26/AyoCONVERT","tags":["Pillow","Batch","AVIF / WEBP / ICO","6 themes"],"status":"public"},{"id":"archi","name":"AyoARCHI","version":"1.5.5","languages":24,"logo":"assets/logo/AyoARCH.png","href":"https://github.com/Klucznik26/AyoARCHI","tags":["ZIP / 7Z","RAR / CBR","Zero-Temp","ZIP creator"],"status":"public"},{"id":"sort","name":"AyoSORT","version":"1.8.1","languages":49,"logo":"assets/logo/AyoSORT.png","href":"https://github.com/Klucznik26/AyoSORT","tags":["Session recovery","Safe copy","EXIF","Image compare"],"status":"public"},{"id":"monitor","name":"AyoMONITOR","version":"1.1.0","languages":42,"logo":null,"href":null,"tags":["CPU / RAM","Disk","GPU","AppImage"],"status":"private"},{"id":"hub","name":"AyoHUB","version":null,"languages":null,"logo":null,"href":null,"tags":["Unified launcher","Ayo Ecosystem"],"status":"coming"}];

const I18N = window.AYO_I18N || {};
const DEFAULT_LANG = "pl";

function activeTranslation(code) {
    return I18N[code] || I18N.en;
}

function renderLanguagePicker() {
    const panel = document.getElementById("language-panel");
    panel.innerHTML = "";

    for (const lang of LANGUAGES) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "flag-button";
        button.dataset.lang = lang.code;
        button.textContent = lang.flag;
        button.title = lang.name;
        button.setAttribute("aria-label", lang.name);
        button.setAttribute("role", "menuitem");
        button.addEventListener("click", () => {
            setLanguage(lang.code);
            closeLanguagePanel();
        });
        panel.appendChild(button);
    }
}

function projectCard(app, t) {
    const status = app.status === "private"
        ? `<span class="status-badge private">${t.private}</span>`
        : app.status === "coming"
        ? `<span class="status-badge coming">${t.coming}</span>`
        : "";

    const version = app.version ? `<span class="version-badge">v${app.version}</span>` : "";
    const description = t[app.id] || I18N.en[app.id] || "";
    const tags = app.tags.map(tag => `<span class="tag">${tag}</span>`).join("");
    const languageCount = app.languages
        ? `<span class="language-count">${app.languages} ${t.languages}</span>`
        : "";

    const action = app.href
        ? `<a class="repo-link" href="${app.href}" target="_blank" rel="noopener noreferrer">${t.github}</a>`
        : `<span class="disabled-link">${app.status === "coming" ? t.coming : t.private}</span>`;

    const logo = app.logo
        ? `<div class="card-logo"><img src="${app.logo}" alt="${app.name}"></div>`
        : `<div class="card-logo"><div class="placeholder-logo" aria-hidden="true">${app.id === "monitor" ? "M" : "H"}</div></div>`;

    return `
        <article class="project-card">
            <div class="card-main">
                <div class="card-topline">
                    <h3>${app.name}</h3>
                    ${version}
                    ${status}
                </div>
                <p class="project-description">${description}</p>
                <div class="tags">${tags}</div>
                <div class="card-bottom">
                    ${action}
                    ${languageCount}
                </div>
            </div>
            ${logo}
        </article>`;
}

function setLanguage(code) {
    const lang = LANGUAGES.find(item => item.code === code) || LANGUAGES[0];
    const t = activeTranslation(lang.code);

    document.documentElement.lang = lang.code;
    localStorage.setItem("ayo-lang", lang.code);
    document.getElementById("current-flag").textContent = lang.flag;
    document.getElementById("language-toggle").title = `${t.languageMenu}: ${lang.name}`;
    document.getElementById("language-toggle").setAttribute("aria-label", `${t.languageMenu}: ${lang.name}`);

    document.getElementById("intro-text").textContent = t.intro;
    document.getElementById("projects-title").textContent = t.projects;
    document.getElementById("icons-title").textContent = t.icons;
    document.getElementById("updated-text").textContent = t.updated;

    document.getElementById("project-grid").innerHTML = APPS.map(app => projectCard(app, t)).join("");

    document.querySelectorAll(".flag-button").forEach(button => {
        button.classList.toggle("active", button.dataset.lang === lang.code);
        button.setAttribute("aria-current", button.dataset.lang === lang.code ? "true" : "false");
    });

    document.title = `Ayo Ecosystem — ${t.projects}`;
}

function openLanguagePanel() {
    const panel = document.getElementById("language-panel");
    const toggle = document.getElementById("language-toggle");
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
}

function closeLanguagePanel() {
    const panel = document.getElementById("language-panel");
    const toggle = document.getElementById("language-toggle");
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
}

document.addEventListener("DOMContentLoaded", () => {
    renderLanguagePicker();

    const toggle = document.getElementById("language-toggle");
    toggle.addEventListener("click", () => {
        const panel = document.getElementById("language-panel");
        if (panel.hidden) openLanguagePanel();
        else closeLanguagePanel();
    });

    document.addEventListener("click", event => {
        if (!event.target.closest(".language-picker")) closeLanguagePanel();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeLanguagePanel();
    });

    const saved = localStorage.getItem("ayo-lang");
    const browser = (navigator.language || "").toLowerCase();
    const exact = LANGUAGES.find(item => browser === item.code.toLowerCase());
    const prefix = LANGUAGES.find(item => browser.startsWith(item.code.toLowerCase() + "-"));
    setLanguage(saved || exact?.code || prefix?.code || DEFAULT_LANG);
});
