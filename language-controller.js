(function () {
    function applyLanguage(code) {
        const lang = LANGUAGES.find(item => item.code === code) || LANGUAGES[0];
        const t = activeTranslation(lang.code) || activeTranslation(DEFAULT_LANG) || {};

        // Update the visible selector first so a secondary UI failure can never
        // leave the page apparently stuck on the previous language.
        const currentFlag = document.getElementById("current-flag");
        if (currentFlag) currentFlag.textContent = lang.flag;

        try { currentLanguageCode = lang.code; } catch (error) { console.warn(error); }
        document.documentElement.lang = lang.code;
        try { localStorage.setItem("ayo-lang", lang.code); } catch (error) { console.warn(error); }

        const toggle = document.getElementById("language-toggle");
        if (toggle) {
            const menuLabel = t.languageMenu || lang.name;
            toggle.title = `${menuLabel}: ${lang.name}`;
            toggle.setAttribute("aria-label", `${menuLabel}: ${lang.name}`);
        }

        const values = [
            ["intro-text", t.intro],
            ["projects-title", t.projects],
            ["icons-title", t.icons],
            ["updated-text", t.updated]
        ];
        for (const [id, value] of values) {
            const node = document.getElementById(id);
            if (node && value != null) node.textContent = value;
        }

        document.querySelectorAll(".flag-button").forEach(button => {
            const active = button.dataset.lang === lang.code;
            button.classList.toggle("active", active);
            button.setAttribute("aria-current", active ? "true" : "false");
        });

        try {
            setFeedbackLanguage();
        } catch (error) {
            console.error("Feedback language update failed:", error);
        }

        const grid = document.getElementById("project-grid");
        if (grid) {
            try {
                grid.innerHTML = APPS.map(app => projectCard(app, t)).join("");
            } catch (error) {
                console.error("Project card translation failed:", error);
            }
        }

        document.title = `Ayo Ecosystem — ${t.projects || lang.name}`;
    }

    // Keep the public function working for initialisation and any other callers.
    setLanguage = applyLanguage;

    // The original picker listener was created before the feedback add-ons were
    // loaded. Handle flag clicks in the capture phase and stop the old listener
    // so feedback code can never interfere with changing the site language.
    document.addEventListener("click", function (event) {
        const button = event.target.closest && event.target.closest(".flag-button");
        if (!button) return;

        event.preventDefault();
        event.stopImmediatePropagation();
        applyLanguage(button.dataset.lang);
        closeLanguagePanel();
    }, true);
})();
