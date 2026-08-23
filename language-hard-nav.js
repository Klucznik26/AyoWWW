(() => {
    'use strict';

    const PARAM = 'lang';

    function requestedLanguage() {
        try {
            return new URL(window.location.href).searchParams.get(PARAM);
        } catch (_) {
            return null;
        }
    }

    function applyRequestedLanguage() {
        const code = requestedLanguage();
        if (!code) return;

        try {
            if (typeof setLanguage === 'function') {
                setLanguage(code);
            }
        } finally {
            try {
                const clean = new URL(window.location.href);
                clean.searchParams.delete(PARAM);
                history.replaceState(null, '', clean.pathname + clean.search + clean.hash);
            } catch (_) {}
        }
    }

    document.addEventListener('click', event => {
        const button = event.target.closest?.('.flag-button');
        if (!button?.dataset?.lang) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        const target = new URL(window.location.href);
        target.searchParams.set(PARAM, button.dataset.lang);
        window.location.assign(target.toString());
    }, true);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyRequestedLanguage, { once: true });
    } else {
        applyRequestedLanguage();
    }
})();
