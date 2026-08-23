(() => {
    'use strict';

    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mkjwaqor';
    const DEFAULT_LANG = 'pl';

    const LANGUAGES = [{"code":"pl","flag":"🇵🇱","name":"Polski"},{"code":"en","flag":"🇬🇧","name":"English"},{"code":"sq","flag":"🇦🇱","name":"Shqip"},{"code":"hy","flag":"🇦🇲","name":"Հայերեն"},{"code":"az","flag":"🇦🇿","name":"Azərbaycan dili"},{"code":"eu","flag":"🇪🇸","name":"Euskara"},{"code":"bs","flag":"🇧🇦","name":"Bosanski"},{"code":"bg","flag":"🇧🇬","name":"Български"},{"code":"ca","flag":"🇦🇩","name":"Català"},{"code":"co","flag":"🇫🇷","name":"Corsu"},{"code":"hr","flag":"🇭🇷","name":"Hrvatski"},{"code":"cs","flag":"🇨🇿","name":"Čeština"},{"code":"da","flag":"🇩🇰","name":"Dansk"},{"code":"nl","flag":"🇳🇱","name":"Nederlands"},{"code":"et","flag":"🇪🇪","name":"Eesti"},{"code":"fi","flag":"🇫🇮","name":"Suomi"},{"code":"fr","flag":"🇫🇷","name":"Français"},{"code":"gl","flag":"🇪🇸","name":"Galego"},{"code":"ka","flag":"🇬🇪","name":"ქართული"},{"code":"de","flag":"🇩🇪","name":"Deutsch"},{"code":"el","flag":"🇬🇷","name":"Ελληνικά"},{"code":"hu","flag":"🇭🇺","name":"Magyar"},{"code":"is","flag":"🇮🇸","name":"Íslenska"},{"code":"ga","flag":"🇮🇪","name":"Gaeilge"},{"code":"it","flag":"🇮🇹","name":"Italiano"},{"code":"ja","flag":"🇯🇵","name":"日本語"},{"code":"kk","flag":"🇰🇿","name":"Қазақша"},{"code":"lv","flag":"🇱🇻","name":"Latviešu"},{"code":"lt","flag":"🇱🇹","name":"Lietuvių"},{"code":"lb","flag":"🇱🇺","name":"Lëtzebuergesch"},{"code":"mk","flag":"🇲🇰","name":"Македонски"},{"code":"mt","flag":"🇲🇹","name":"Malti"},{"code":"cnr","flag":"🇲🇪","name":"Crnogorski"},{"code":"mo","flag":"🇲🇩","name":"Moldovenească"},{"code":"no","flag":"🇳🇴","name":"Norsk"},{"code":"pt","flag":"🇵🇹","name":"Português"},{"code":"ro","flag":"🇷🇴","name":"Română"},{"code":"sr","flag":"🇷🇸","name":"Српски"},{"code":"sk","flag":"🇸🇰","name":"Slovenčina"},{"code":"sl","flag":"🇸🇮","name":"Slovenščina"},{"code":"es","flag":"🇪🇸","name":"Español"},{"code":"sw","flag":"🇰🇪","name":"Kiswahili"},{"code":"sv","flag":"🇸🇪","name":"Svenska"},{"code":"tr","flag":"🇹🇷","name":"Türkçe"},{"code":"uk","flag":"🇺🇦","name":"Українська"},{"code":"hi","flag":"🇮🇳","name":"हिन्दी"},{"code":"tg","flag":"🇹🇯","name":"Тоҷикӣ"},{"code":"uz","flag":"🇺🇿","name":"O‘zbekcha"},{"code":"isv","flag":"🌍","name":"Medžuslovjansky"}];

    const APPS = [{"id":"up","name":"AyoUP","version":"1.7.0","languages":43,"logo":"assets/logo/Up.png","href":"https://github.com/Klucznik26/Ayo-UP","tags":["NCNN / Vulkan","Batch","ZIP models","6 themes"],"status":"public"},{"id":"convert","name":"AyoCONVERT","version":"1.7.0","languages":43,"logo":"assets/logo/Convert.png","href":"https://github.com/Klucznik26/AyoCONVERT","tags":["Pillow","Batch","AVIF / WEBP / ICO","6 themes"],"status":"public"},{"id":"archi","name":"AyoARCHI","version":"1.5.5","languages":24,"logo":"assets/logo/AyoARCH.png","href":"https://github.com/Klucznik26/AyoARCHI","tags":["ZIP / 7Z","RAR / CBR","Zero-Temp","ZIP creator"],"status":"public"},{"id":"sort","name":"AyoSORT","version":"1.8.1","languages":49,"logo":"assets/logo/AyoSORT.png","href":"https://github.com/Klucznik26/AyoSORT","tags":["Session recovery","Safe copy","EXIF","Image compare"],"status":"public"},{"id":"monitor","name":"AyoMONITOR","version":"1.1.0","languages":42,"logo":null,"href":null,"tags":["CPU / RAM","Disk","GPU","AppImage"],"status":"private"},{"id":"hub","name":"AyoHUB","version":null,"languages":null,"logo":null,"href":null,"tags":["Unified launcher","Ayo Ecosystem"],"status":"coming"}];

    const DELIVERY = {
        pl:{sending:'Wysyłanie…',success:'Dziękujemy. Wiadomość została wysłana.',error:'Nie udało się wysłać wiadomości. Spróbuj ponownie.'},
        en:{sending:'Sending…',success:'Thank you. Your message has been sent.',error:'The message could not be sent. Please try again.'},
        sq:{sending:'Duke dërguar…',success:'Faleminderit. Mesazhi u dërgua.',error:'Mesazhi nuk mund të dërgohej. Provo përsëri.'},
        hy:{sending:'Ուղարկվում է…',success:'Շնորհակալություն։ Հաղորդագրությունն ուղարկվեց։',error:'Հաղորդագրությունը չհաջողվեց ուղարկել։ Փորձեք կրկին։'},
        az:{sending:'Göndərilir…',success:'Təşəkkür edirik. Mesaj göndərildi.',error:'Mesaj göndərilə bilmədi. Yenidən cəhd edin.'},
        eu:{sending:'Bidaltzen…',success:'Eskerrik asko. Mezua bidali da.',error:'Ezin izan da mezua bidali. Saiatu berriro.'},
        bs:{sending:'Slanje…',success:'Hvala. Poruka je poslana.',error:'Poruka nije mogla biti poslana. Pokušajte ponovo.'},
        bg:{sending:'Изпращане…',success:'Благодарим. Съобщението е изпратено.',error:'Съобщението не можа да бъде изпратено. Опитайте отново.'},
        ca:{sending:'Enviant…',success:"Gràcies. El missatge s'ha enviat.",error:"No s'ha pogut enviar el missatge. Torna-ho a provar."},
        co:{sending:'Invio…',success:'Grazie. U missaghju hè statu mandatu.',error:'U missaghju ùn hè statu mandatu. Pruvate torna.'},
        hr:{sending:'Slanje…',success:'Hvala. Poruka je poslana.',error:'Poruku nije bilo moguće poslati. Pokušajte ponovno.'},
        cs:{sending:'Odesílání…',success:'Děkujeme. Zpráva byla odeslána.',error:'Zprávu se nepodařilo odeslat. Zkuste to znovu.'},
        da:{sending:'Sender…',success:'Tak. Beskeden er sendt.',error:'Beskeden kunne ikke sendes. Prøv igen.'},
        nl:{sending:'Verzenden…',success:'Bedankt. Je bericht is verzonden.',error:'Het bericht kon niet worden verzonden. Probeer het opnieuw.'},
        et:{sending:'Saatmine…',success:'Aitäh. Sõnum on saadetud.',error:'Sõnumit ei õnnestunud saata. Proovi uuesti.'},
        fi:{sending:'Lähetetään…',success:'Kiitos. Viesti on lähetetty.',error:'Viestiä ei voitu lähettää. Yritä uudelleen.'},
        fr:{sending:'Envoi…',success:'Merci. Votre message a été envoyé.',error:"Le message n'a pas pu être envoyé. Réessayez."},
        gl:{sending:'Enviando…',success:'Grazas. A mensaxe foi enviada.',error:'Non se puido enviar a mensaxe. Téntao de novo.'},
        ka:{sending:'იგზავნება…',success:'გმადლობთ. შეტყობინება გაიგზავნა.',error:'შეტყობინების გაგზავნა ვერ მოხერხდა. სცადეთ თავიდან.'},
        de:{sending:'Wird gesendet…',success:'Vielen Dank. Die Nachricht wurde gesendet.',error:'Die Nachricht konnte nicht gesendet werden. Bitte erneut versuchen.'},
        el:{sending:'Αποστολή…',success:'Ευχαριστούμε. Το μήνυμα στάλθηκε.',error:'Δεν ήταν δυνατή η αποστολή. Δοκιμάστε ξανά.'},
        hu:{sending:'Küldés…',success:'Köszönjük. Az üzenet elküldve.',error:'Az üzenetet nem sikerült elküldeni. Próbálja újra.'},
        is:{sending:'Sendi…',success:'Takk. Skilaboðin hafa verið send.',error:'Ekki tókst að senda skilaboðin. Reyndu aftur.'},
        ga:{sending:'Á sheoladh…',success:'Go raibh maith agat. Seoladh an teachtaireacht.',error:'Níorbh fhéidir an teachtaireacht a sheoladh. Bain triail eile as.'},
        it:{sending:'Invio…',success:'Grazie. Il messaggio è stato inviato.',error:'Impossibile inviare il messaggio. Riprova.'},
        ja:{sending:'送信中…',success:'ありがとうございます。メッセージを送信しました。',error:'メッセージを送信できませんでした。もう一度お試しください。'},
        kk:{sending:'Жіберілуде…',success:'Рақмет. Хабарлама жіберілді.',error:'Хабарламаны жіберу мүмкін болмады. Қайталап көріңіз.'},
        lv:{sending:'Sūta…',success:'Paldies. Ziņojums ir nosūtīts.',error:'Ziņojumu neizdevās nosūtīt. Mēģiniet vēlreiz.'},
        lt:{sending:'Siunčiama…',success:'Ačiū. Žinutė išsiųsta.',error:'Žinutės išsiųsti nepavyko. Bandykite dar kartą.'},
        lb:{sending:'Gëtt geschéckt…',success:'Merci. De Message gouf geschéckt.',error:'De Message konnt net geschéckt ginn. Probéiert nach eng Kéier.'},
        mk:{sending:'Се испраќа…',success:'Ви благодариме. Пораката е испратена.',error:'Пораката не можеше да се испрати. Обидете се повторно.'},
        mt:{sending:'Qed jintbagħat…',success:'Grazzi. Il-messaġġ intbagħat.',error:"Il-messaġġ ma setax jintbagħat. Erġa' pprova."},
        cnr:{sending:'Slanje…',success:'Hvala. Poruka je poslata.',error:'Poruka nije mogla biti poslata. Pokušajte ponovo.'},
        mo:{sending:'Se trimite…',success:'Mulțumim. Mesajul a fost trimis.',error:'Mesajul nu a putut fi trimis. Încercați din nou.'},
        no:{sending:'Sender…',success:'Takk. Meldingen er sendt.',error:'Meldingen kunne ikke sendes. Prøv igjen.'},
        pt:{sending:'A enviar…',success:'Obrigado. A mensagem foi enviada.',error:'Não foi possível enviar a mensagem. Tente novamente.'},
        ro:{sending:'Se trimite…',success:'Mulțumim. Mesajul a fost trimis.',error:'Mesajul nu a putut fi trimis. Încercați din nou.'},
        sr:{sending:'Слање…',success:'Хвала. Порука је послата.',error:'Порука није могла бити послата. Покушајте поново.'},
        sk:{sending:'Odosielanie…',success:'Ďakujeme. Správa bola odoslaná.',error:'Správu sa nepodarilo odoslať. Skúste to znova.'},
        sl:{sending:'Pošiljanje…',success:'Hvala. Sporočilo je bilo poslano.',error:'Sporočila ni bilo mogoče poslati. Poskusite znova.'},
        es:{sending:'Enviando…',success:'Gracias. El mensaje ha sido enviado.',error:'No se pudo enviar el mensaje. Inténtalo de nuevo.'},
        sw:{sending:'Inatuma…',success:'Asante. Ujumbe umetumwa.',error:'Ujumbe haukuweza kutumwa. Jaribu tena.'},
        sv:{sending:'Skickar…',success:'Tack. Meddelandet har skickats.',error:'Meddelandet kunde inte skickas. Försök igen.'},
        tr:{sending:'Gönderiliyor…',success:'Teşekkürler. Mesaj gönderildi.',error:'Mesaj gönderilemedi. Tekrar deneyin.'},
        uk:{sending:'Надсилання…',success:'Дякуємо. Повідомлення надіслано.',error:'Не вдалося надіслати повідомлення. Спробуйте ще раз.'},
        hi:{sending:'भेजा जा रहा है…',success:'धन्यवाद। संदेश भेज दिया गया है।',error:'संदेश नहीं भेजा जा सका। कृपया फिर प्रयास करें।'},
        tg:{sending:'Фиристода мешавад…',success:'Ташаккур. Паём фиристода шуд.',error:'Паём фиристода нашуд. Боз кӯшиш кунед.'},
        uz:{sending:'Yuborilmoqda…',success:'Rahmat. Xabar yuborildi.',error:'Xabarni yuborib bo‘lmadi. Qayta urinib ko‘ring.'},
        isv:{sending:'Posylanje…',success:'Hvala. Poruka byla poslana.',error:'Poruku ne bylo možno poslati. Probujte ponovno.'}
    };

    let currentLanguage = DEFAULT_LANG;
    let feedbackReturnFocus = null;

    const siteTranslations = () => window.AYO_I18N || {};
    const feedbackTranslations = () => window.AYO_FEEDBACK_UI || {};

    function siteText(code) {
        const all = siteTranslations();
        return all[code] || all.en || all.pl || {};
    }

    function feedbackText(code = currentLanguage) {
        const all = feedbackTranslations();
        return all[code] || all.en || {
            button:'Send feedback', title:'Send feedback', intro:'Describe your feedback here.', program:'Application', type:'Feedback type', message:'Message', bug:'Bug', suggestion:'Suggestion', question:'Question', other:'Other', required:'Write a message before submitting.'
        };
    }

    function deliveryText(code = currentLanguage) {
        return DELIVERY[code] || DELIVERY.en;
    }

    function renderProjectCard(app, t, ui) {
        const status = app.status === 'private'
            ? `<span class="status-badge private">${t.private || 'private repository'}</span>`
            : app.status === 'coming'
                ? `<span class="status-badge coming">${t.coming || 'coming soon'}</span>`
                : '';
        const version = app.version ? `<span class="version-badge">v${app.version}</span>` : '';
        const description = t[app.id] || '';
        const tags = app.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        const languageCount = app.languages ? `<span class="language-count">${app.languages} ${t.languages || 'languages'}</span>` : '';
        const action = app.href
            ? `<a class="repo-link" href="${app.href}" target="_blank" rel="noopener noreferrer">${t.github || 'GitHub'}</a>`
            : `<span class="disabled-link">${app.status === 'coming' ? (t.coming || 'coming soon') : (t.private || 'private repository')}</span>`;
        const feedback = `<button class="feedback-card-button feedback-button" type="button" data-feedback-app="${app.name}">${ui.button}</button>`;
        const logo = app.logo
            ? `<div class="card-logo"><img src="${app.logo}" alt="${app.name}"></div>`
            : `<div class="card-logo"><div class="placeholder-logo" aria-hidden="true">${app.id === 'monitor' ? 'M' : 'H'}</div></div>`;

        return `<article class="project-card"><div class="card-main"><div class="card-topline"><h3>${app.name}</h3>${version}${status}</div><p class="project-description">${description}</p><div class="tags">${tags}</div><div class="card-bottom">${action}${feedback}${languageCount}</div></div>${logo}</article>`;
    }

    function updateFeedbackUI(ui) {
        const byId = (id) => document.getElementById(id);
        const header = byId('header-feedback-label');
        const footer = document.querySelector('.footer-feedback');
        if (header) header.textContent = ui.button;
        if (footer) footer.textContent = ui.button;
        if (byId('feedback-title')) byId('feedback-title').textContent = ui.title;
        if (byId('feedback-intro')) byId('feedback-intro').textContent = ui.intro;
        if (byId('feedback-program-label')) byId('feedback-program-label').textContent = ui.program;
        if (byId('feedback-type-label')) byId('feedback-type-label').textContent = ui.type;
        if (byId('feedback-message-label')) byId('feedback-message-label').textContent = ui.message;
        if (byId('feedback-submit')) byId('feedback-submit').textContent = ui.button;
        const note = byId('feedback-note');
        if (note) note.hidden = true;
        const type = byId('feedback-type');
        if (type && type.options.length >= 4) {
            type.options[0].textContent = ui.bug;
            type.options[1].textContent = ui.suggestion;
            type.options[2].textContent = ui.question;
            type.options[3].textContent = ui.other;
        }
    }

    function applyLanguage(code) {
        const lang = LANGUAGES.find(item => item.code === code) || LANGUAGES[0];
        const t = siteText(lang.code);
        const ui = feedbackText(lang.code);
        currentLanguage = lang.code;

        const flag = document.getElementById('current-flag');
        if (flag) flag.textContent = lang.flag;
        document.documentElement.lang = lang.code;
        try { localStorage.setItem('ayo-lang', lang.code); } catch (_) {}

        const toggle = document.getElementById('language-toggle');
        if (toggle) {
            const label = t.languageMenu || lang.name;
            toggle.title = `${label}: ${lang.name}`;
            toggle.setAttribute('aria-label', `${label}: ${lang.name}`);
        }

        const setText = (id, value) => {
            const el = document.getElementById(id);
            if (el && value != null) el.textContent = value;
        };
        setText('intro-text', t.intro || '');
        setText('projects-title', t.projects || '');
        setText('icons-title', t.icons || '');
        setText('updated-text', t.updated || '');

        const grid = document.getElementById('project-grid');
        if (grid) grid.innerHTML = APPS.map(app => renderProjectCard(app, t, ui)).join('');

        document.querySelectorAll('.flag-button').forEach(button => {
            const active = button.dataset.lang === lang.code;
            button.classList.toggle('active', active);
            button.setAttribute('aria-current', active ? 'true' : 'false');
        });

        updateFeedbackUI(ui);
        document.title = `Ayo Ecosystem — ${t.projects || lang.name}`;
    }

    function renderLanguagePicker() {
        const panel = document.getElementById('language-panel');
        if (!panel) return;
        panel.innerHTML = '';
        LANGUAGES.forEach(lang => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'flag-button';
            button.dataset.lang = lang.code;
            button.textContent = lang.flag;
            button.title = lang.name;
            button.setAttribute('aria-label', lang.name);
            button.setAttribute('role', 'menuitem');
            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                applyLanguage(lang.code);
                closeLanguagePanel();
            });
            panel.appendChild(button);
        });
    }

    function openLanguagePanel() {
        const panel = document.getElementById('language-panel');
        const toggle = document.getElementById('language-toggle');
        if (!panel || !toggle) return;
        panel.hidden = false;
        toggle.setAttribute('aria-expanded', 'true');
    }

    function closeLanguagePanel() {
        const panel = document.getElementById('language-panel');
        const toggle = document.getElementById('language-toggle');
        if (!panel || !toggle) return;
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
    }

    function populatePrograms() {
        const select = document.getElementById('feedback-program');
        if (!select) return;
        const names = ['AyoWWW', ...APPS.map(app => app.name)];
        select.innerHTML = names.map(name => `<option value="${name}">${name}</option>`).join('');
    }

    function openFeedback(appName = 'AyoWWW') {
        const modal = document.getElementById('feedback-modal');
        const select = document.getElementById('feedback-program');
        if (!modal || !select) return;
        feedbackReturnFocus = document.activeElement;
        select.value = [...select.options].some(option => option.value === appName) ? appName : 'AyoWWW';
        const status = document.getElementById('feedback-status');
        if (status) {
            status.textContent = '';
            status.classList.remove('success', 'error');
        }
        modal.hidden = false;
        document.body.classList.add('feedback-open');
        requestAnimationFrame(() => document.getElementById('feedback-message')?.focus());
    }

    function closeFeedback() {
        const modal = document.getElementById('feedback-modal');
        if (!modal) return;
        modal.hidden = true;
        document.body.classList.remove('feedback-open');
        if (feedbackReturnFocus && typeof feedbackReturnFocus.focus === 'function') feedbackReturnFocus.focus();
    }

    async function sendFeedback(event) {
        event.preventDefault();
        const ui = feedbackText();
        const delivery = deliveryText();
        const honeypot = document.getElementById('feedback-website');
        const program = document.getElementById('feedback-program')?.value || 'AyoWWW';
        const typeSelect = document.getElementById('feedback-type');
        const typeLabel = typeSelect?.options[typeSelect.selectedIndex]?.textContent || '';
        const messageField = document.getElementById('feedback-message');
        const message = messageField?.value.trim() || '';
        const status = document.getElementById('feedback-status');
        const submit = document.getElementById('feedback-submit');

        if (honeypot?.value) { closeFeedback(); return; }
        if (!message) {
            if (status) status.textContent = ui.required;
            messageField?.focus();
            return;
        }

        if (status) {
            status.textContent = delivery.sending;
            status.classList.remove('success', 'error');
        }
        if (submit) {
            submit.disabled = true;
            submit.textContent = delivery.sending;
        }

        const langName = LANGUAGES.find(item => item.code === currentLanguage)?.name || currentLanguage;
        const data = new FormData();
        data.append('program', program);
        data.append('type', typeLabel);
        data.append('message', message);
        data.append('language', langName);
        data.append('source', window.location.href);
        data.append('_subject', `[Ayo Feedback] ${program} — ${typeLabel}`);
        data.append('_gotcha', '');

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, { method:'POST', body:data, headers:{Accept:'application/json'} });
            if (!response.ok) throw new Error(`Formspree HTTP ${response.status}`);
            if (status) {
                status.textContent = delivery.success;
                status.classList.add('success');
            }
            if (messageField) messageField.value = '';
            if (typeSelect) typeSelect.selectedIndex = 0;
        } catch (error) {
            console.error('Ayo feedback send failed:', error);
            if (status) {
                status.textContent = delivery.error;
                status.classList.add('error');
            }
        } finally {
            if (submit) {
                submit.disabled = false;
                submit.textContent = feedbackText().button;
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderLanguagePicker();
        populatePrograms();

        const toggle = document.getElementById('language-toggle');
        toggle?.addEventListener('click', (event) => {
            event.stopPropagation();
            const panel = document.getElementById('language-panel');
            if (panel?.hidden) openLanguagePanel(); else closeLanguagePanel();
        });

        document.addEventListener('click', (event) => {
            const feedbackButton = event.target.closest?.('.feedback-button');
            if (feedbackButton) {
                openFeedback(feedbackButton.dataset.feedbackApp || 'AyoWWW');
                return;
            }
            if (event.target.closest?.('[data-feedback-close]')) {
                closeFeedback();
                return;
            }
            if (!event.target.closest?.('.language-picker')) closeLanguagePanel();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') return;
            closeLanguagePanel();
            const modal = document.getElementById('feedback-modal');
            if (modal && !modal.hidden) closeFeedback();
        });

        document.getElementById('feedback-form')?.addEventListener('submit', sendFeedback);

        let saved = null;
        try { saved = localStorage.getItem('ayo-lang'); } catch (_) {}
        const browser = (navigator.language || '').toLowerCase();
        const exact = LANGUAGES.find(item => browser === item.code.toLowerCase());
        const prefix = LANGUAGES.find(item => browser.startsWith(item.code.toLowerCase() + '-'));
        applyLanguage(saved || exact?.code || prefix?.code || DEFAULT_LANG);
    });
})();
