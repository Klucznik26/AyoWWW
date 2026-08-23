const LANGUAGES = [{"code":"pl","flag":"🇵🇱","name":"Polski"},{"code":"en","flag":"🇬🇧","name":"English"},{"code":"sq","flag":"🇦🇱","name":"Shqip"},{"code":"hy","flag":"🇦🇲","name":"Հայերեն"},{"code":"az","flag":"🇦🇿","name":"Azərbaycan dili"},{"code":"eu","flag":"🇪🇸","name":"Euskara"},{"code":"bs","flag":"🇧🇦","name":"Bosanski"},{"code":"bg","flag":"🇧🇬","name":"Български"},{"code":"ca","flag":"🇦🇩","name":"Català"},{"code":"co","flag":"🇫🇷","name":"Corsu"},{"code":"hr","flag":"🇭🇷","name":"Hrvatski"},{"code":"cs","flag":"🇨🇿","name":"Čeština"},{"code":"da","flag":"🇩🇰","name":"Dansk"},{"code":"nl","flag":"🇳🇱","name":"Nederlands"},{"code":"et","flag":"🇪🇪","name":"Eesti"},{"code":"fi","flag":"🇫🇮","name":"Suomi"},{"code":"fr","flag":"🇫🇷","name":"Français"},{"code":"gl","flag":"🇪🇸","name":"Galego"},{"code":"ka","flag":"🇬🇪","name":"ქართული"},{"code":"de","flag":"🇩🇪","name":"Deutsch"},{"code":"el","flag":"🇬🇷","name":"Ελληνικά"},{"code":"hu","flag":"🇭🇺","name":"Magyar"},{"code":"is","flag":"🇮🇸","name":"Íslenska"},{"code":"ga","flag":"🇮🇪","name":"Gaeilge"},{"code":"it","flag":"🇮🇹","name":"Italiano"},{"code":"ja","flag":"🇯🇵","name":"日本語"},{"code":"kk","flag":"🇰🇿","name":"Қазақша"},{"code":"lv","flag":"🇱🇻","name":"Latviešu"},{"code":"lt","flag":"🇱🇹","name":"Lietuvių"},{"code":"lb","flag":"🇱🇺","name":"Lëtzebuergesch"},{"code":"mk","flag":"🇲🇰","name":"Македонски"},{"code":"mt","flag":"🇲🇹","name":"Malti"},{"code":"cnr","flag":"🇲🇪","name":"Crnogorski"},{"code":"mo","flag":"🇲🇩","name":"Moldovenească"},{"code":"no","flag":"🇳🇴","name":"Norsk"},{"code":"pt","flag":"🇵🇹","name":"Português"},{"code":"ro","flag":"🇷🇴","name":"Română"},{"code":"sr","flag":"🇷🇸","name":"Српски"},{"code":"sk","flag":"🇸🇰","name":"Slovenčina"},{"code":"sl","flag":"🇸🇮","name":"Slovenščina"},{"code":"es","flag":"🇪🇸","name":"Español"},{"code":"sw","flag":"🇰🇪","name":"Kiswahili"},{"code":"sv","flag":"🇸🇪","name":"Svenska"},{"code":"tr","flag":"🇹🇷","name":"Türkçe"},{"code":"uk","flag":"🇺🇦","name":"Українська"},{"code":"hi","flag":"🇮🇳","name":"हिन्दी"},{"code":"tg","flag":"🇹🇯","name":"Тоҷикӣ"},{"code":"uz","flag":"🇺🇿","name":"O‘zbekcha"},{"code":"isv","flag":"🌍","name":"Medžuslovjansky"}];

const APPS = [{"id":"up","name":"AyoUP","version":"1.7.0","languages":43,"logo":"assets/logo/Up.png","href":"https://github.com/Klucznik26/Ayo-UP","tags":["NCNN / Vulkan","Batch","ZIP models","6 themes"],"status":"public"},{"id":"convert","name":"AyoCONVERT","version":"1.7.0","languages":43,"logo":"assets/logo/Convert.png","href":"https://github.com/Klucznik26/AyoCONVERT","tags":["Pillow","Batch","AVIF / WEBP / ICO","6 themes"],"status":"public"},{"id":"archi","name":"AyoARCHI","version":"1.5.5","languages":24,"logo":"assets/logo/AyoARCH.png","href":"https://github.com/Klucznik26/AyoARCHI","tags":["ZIP / 7Z","RAR / CBR","Zero-Temp","ZIP creator"],"status":"public"},{"id":"sort","name":"AyoSORT","version":"1.8.1","languages":49,"logo":"assets/logo/AyoSORT.png","href":"https://github.com/Klucznik26/AyoSORT","tags":["Session recovery","Safe copy","EXIF","Image compare"],"status":"public"},{"id":"monitor","name":"AyoMONITOR","version":"1.1.0","languages":42,"logo":null,"href":null,"tags":["CPU / RAM","Disk","GPU","AppImage"],"status":"private"},{"id":"hub","name":"AyoHUB","version":null,"languages":null,"logo":null,"href":null,"tags":["Unified launcher","Ayo Ecosystem"],"status":"coming"}];

const I18N = window.AYO_I18N || {};
const DEFAULT_LANG = "pl";
const FEEDBACK_ISSUE_URL = "https://github.com/Klucznik26/AyoWWW/issues/new";

const FEEDBACK_UI = {
    pl: {
        button: "Zgłoś uwagę",
        title: "Zgłoś uwagę",
        intro: "Znalazłeś błąd, masz pomysł albo pytanie? Opisz je tutaj.",
        note: "Zgłoszenie otworzy się jako nowe GitHub Issue. Adres e-mail autora strony nie jest publikowany ani wpisywany w formularzu.",
        program: "Program",
        type: "Rodzaj zgłoszenia",
        message: "Wiadomość",
        send: "Przejdź do wysłania",
        bug: "Błąd",
        suggestion: "Sugestia",
        question: "Pytanie",
        other: "Inne",
        required: "Wpisz wiadomość przed wysłaniem.",
        opening: "Otwieram zgłoszenie w GitHub…"
    },
    en: {
        button: "Send feedback",
        title: "Send feedback",
        intro: "Found a bug, have an idea, or want to ask a question? Describe it here.",
        note: "The report opens as a new GitHub Issue. The site owner's email address is never published or embedded in this form.",
        program: "Application",
        type: "Feedback type",
        message: "Message",
        send: "Continue to submit",
        bug: "Bug",
        suggestion: "Suggestion",
        question: "Question",
        other: "Other",
        required: "Write a message before submitting.",
        opening: "Opening GitHub issue…"
    }
};

let currentLanguageCode = DEFAULT_LANG;
let feedbackReturnFocus = null;

function activeTranslation(code) {
    return I18N[code] || I18N.en;
}

function feedbackTranslation(code = currentLanguageCode) {
    return FEEDBACK_UI[code] || FEEDBACK_UI.en;
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
    const ui = feedbackTranslation();
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

    const feedback = `<button class="feedback-card-button feedback-button" type="button" data-feedback-app="${app.name}">${ui.button}</button>`;

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
                    ${feedback}
                    ${languageCount}
                </div>
            </div>
            ${logo}
        </article>`;
}

function setFeedbackLanguage() {
    const ui = feedbackTranslation();
    const headerLabel = document.getElementById("header-feedback-label");
    const footerButton = document.querySelector(".footer-feedback");

    if (headerLabel) headerLabel.textContent = ui.button;
    if (footerButton) footerButton.textContent = ui.button;

    document.getElementById("feedback-title").textContent = ui.title;
    document.getElementById("feedback-intro").textContent = ui.intro;
    document.getElementById("feedback-note").textContent = ui.note;
    document.getElementById("feedback-program-label").textContent = ui.program;
    document.getElementById("feedback-type-label").textContent = ui.type;
    document.getElementById("feedback-message-label").textContent = ui.message;
    document.getElementById("feedback-submit").textContent = ui.send;

    const type = document.getElementById("feedback-type");
    type.options[0].textContent = ui.bug;
    type.options[1].textContent = ui.suggestion;
    type.options[2].textContent = ui.question;
    type.options[3].textContent = ui.other;
}

function setLanguage(code) {
    const lang = LANGUAGES.find(item => item.code === code) || LANGUAGES[0];
    const t = activeTranslation(lang.code);
    currentLanguageCode = lang.code;

    document.documentElement.lang = lang.code;
    localStorage.setItem("ayo-lang", lang.code);
    document.getElementById("current-flag").textContent = lang.flag;
    document.getElementById("language-toggle").title = `${t.languageMenu}: ${lang.name}`;
    document.getElementById("language-toggle").setAttribute("aria-label", `${t.languageMenu}: ${lang.name}`);

    document.getElementById("intro-text").textContent = t.intro;
    document.getElementById("projects-title").textContent = t.projects;
    document.getElementById("icons-title").textContent = t.icons;
    document.getElementById("updated-text").textContent = t.updated;

    setFeedbackLanguage();
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

function populateFeedbackPrograms() {
    const select = document.getElementById("feedback-program");
    const names = ["AyoWWW", ...APPS.map(app => app.name)];
    select.innerHTML = names.map(name => `<option value="${name}">${name}</option>`).join("");
}

function openFeedback(appName = "AyoWWW") {
    const modal = document.getElementById("feedback-modal");
    const select = document.getElementById("feedback-program");
    feedbackReturnFocus = document.activeElement;

    if ([...select.options].some(option => option.value === appName)) {
        select.value = appName;
    } else {
        select.value = "AyoWWW";
    }

    document.getElementById("feedback-status").textContent = "";
    modal.hidden = false;
    document.body.classList.add("feedback-open");
    requestAnimationFrame(() => document.getElementById("feedback-message").focus());
}

function closeFeedback() {
    const modal = document.getElementById("feedback-modal");
    modal.hidden = true;
    document.body.classList.remove("feedback-open");
    if (feedbackReturnFocus && typeof feedbackReturnFocus.focus === "function") {
        feedbackReturnFocus.focus();
    }
}

function submitFeedback(event) {
    event.preventDefault();

    const ui = feedbackTranslation();
    const honeypot = document.getElementById("feedback-website");
    const program = document.getElementById("feedback-program").value;
    const typeSelect = document.getElementById("feedback-type");
    const typeLabel = typeSelect.options[typeSelect.selectedIndex].textContent;
    const message = document.getElementById("feedback-message").value.trim();
    const status = document.getElementById("feedback-status");

    if (honeypot.value) {
        closeFeedback();
        return;
    }

    if (!message) {
        status.textContent = ui.required;
        document.getElementById("feedback-message").focus();
        return;
    }

    const title = `[${program}] ${typeLabel}`;
    const body = [
        `## ${ui.program}`,
        program,
        "",
        `## ${ui.type}`,
        typeLabel,
        "",
        `## ${ui.message}`,
        message,
        "",
        "---",
        `Page language: ${currentLanguageCode}`,
        `Source: ${window.location.href}`
    ].join("\n");

    const url = `${FEEDBACK_ISSUE_URL}?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
    status.textContent = ui.opening;
    window.open(url, "_blank", "noopener,noreferrer");
    closeFeedback();
}

function setupFeedback() {
    populateFeedbackPrograms();
    setFeedbackLanguage();

    document.addEventListener("click", event => {
        const feedbackButton = event.target.closest(".feedback-button");
        if (feedbackButton) {
            openFeedback(feedbackButton.dataset.feedbackApp || "AyoWWW");
            return;
        }

        if (event.target.closest("[data-feedback-close]")) {
            closeFeedback();
        }
    });

    document.getElementById("feedback-form").addEventListener("submit", submitFeedback);
}

document.addEventListener("DOMContentLoaded", () => {
    renderLanguagePicker();
    setupFeedback();

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
        if (event.key === "Escape") {
            closeLanguagePanel();
            if (!document.getElementById("feedback-modal").hidden) closeFeedback();
        }
    });

    const saved = localStorage.getItem("ayo-lang");
    const browser = (navigator.language || "").toLowerCase();
    const exact = LANGUAGES.find(item => browser === item.code.toLowerCase());
    const prefix = LANGUAGES.find(item => browser.startsWith(item.code.toLowerCase() + "-"));
    setLanguage(saved || exact?.code || prefix?.code || DEFAULT_LANG);
});
