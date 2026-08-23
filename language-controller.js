(function () {
    function safeLanguage(code) {
        const lang = LANGUAGES.find(item => item.code === code) || LANGUAGES[0];
        const t = activeTranslation(lang.code) || activeTranslation(DEFAULT_LANG);

        currentLanguageCode = lang.code;
        document.documentElement.lang = lang.code;

        try {
            localStorage.setItem("ayo-lang", lang.code);
        } catch (error) {
            console.warn("Ayo language preference could not be saved:", error);
        }

        const currentFlag = document.getElementById("current-flag");
        const toggle = document.getElementById("language-toggle");
        if (currentFlag) currentFlag.textContent = lang.flag;
        if (toggle) {
            const menuLabel = t.languageMenu || lang.name;
            toggle.title = `${menuLabel}: ${lang.name}`;
            toggle.setAttribute("aria-label", `${menuLabel}: ${lang.name}`);
        }

        const intro = document.getElementById("intro-text");
        const projectsTitle = document.getElementById("projects-title");
        const iconsTitle = document.getElementById("icons-title");
        const updatedText = document.getElementById("updated-text");

        if (intro) intro.textContent = t.intro || "";
        if (projectsTitle) projectsTitle.textContent = t.projects || "";
        if (iconsTitle) iconsTitle.textContent = t.icons || "";
        if (updatedText) updatedText.textContent = t.updated || "";

        try {
            setFeedbackLanguage();
        } catch (error) {
            console.error("Ayo feedback translation failed without blocking page language:", error);
        }

        const grid = document.getElementById("project-grid");
        if (grid) {
            try {
                grid.innerHTML = APPS.map(app => projectCard(app, t)).join("");
            } catch (error) {
                console.error("Ayo project cards could not be re-rendered:", error);
            }
        }

        document.querySelectorAll(".flag-button").forEach(button => {
            const active = button.dataset.lang === lang.code;
            button.classList.toggle("active", active);
            button.setAttribute("aria-current", active ? "true" : "false");
        });

        document.title = `Ayo Ecosystem — ${t.projects || lang.name}`;
    }

    // Keep language selection independent from optional feedback integrations.
    // All existing picker listeners resolve this binding dynamically.
    setLanguage = safeLanguage;
})();
