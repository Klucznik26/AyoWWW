(() => {
    'use strict';

    const ENDPOINT = 'https://formspree.io/f/mkjwaqor';
    const APP_NAMES = ['AyoWWW', 'AyoUP', 'AyoCONVERT', 'AyoARCHI', 'AyoSORT', 'AyoMONITOR', 'AyoHUB'];
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

    const currentCode = () => document.documentElement.lang || 'pl';
    const uiFor = (code = currentCode()) => {
        const all = window.AYO_FEEDBACK_UI || {};
        return all[code] || all.en || all.pl || {
            button:'Send feedback', title:'Send feedback', intro:'Describe your feedback here.', program:'Application', type:'Feedback type', message:'Message', bug:'Bug', suggestion:'Suggestion', question:'Question', other:'Other', required:'Write a message before submitting.'
        };
    };
    const deliveryFor = (code = currentCode()) => DELIVERY[code] || DELIVERY.en;

    function populatePrograms() {
        const select = document.getElementById('feedback-program');
        if (!select || select.options.length) return;
        select.innerHTML = APP_NAMES.map(name => `<option value="${name}">${name}</option>`).join('');
    }

    function updateFeedbackUI() {
        const ui = uiFor();
        const set = (id, text) => { const el = document.getElementById(id); if (el && text != null) el.textContent = text; };
        set('header-feedback-label', ui.button);
        const footer = document.querySelector('.footer-feedback');
        if (footer) footer.textContent = ui.button;
        set('feedback-title', ui.title);
        set('feedback-intro', ui.intro);
        set('feedback-program-label', ui.program);
        set('feedback-type-label', ui.type);
        set('feedback-message-label', ui.message);
        set('feedback-submit', ui.button);
        const note = document.getElementById('feedback-note');
        if (note) note.hidden = true;
        const type = document.getElementById('feedback-type');
        if (type?.options?.length >= 4) {
            type.options[0].textContent = ui.bug;
            type.options[1].textContent = ui.suggestion;
            type.options[2].textContent = ui.question;
            type.options[3].textContent = ui.other;
        }
        document.querySelectorAll('.feedback-card-button').forEach(button => button.textContent = ui.button);
    }

    function injectCardButtons() {
        const ui = uiFor();
        document.querySelectorAll('.project-card').forEach(card => {
            if (card.querySelector('.feedback-card-button')) return;
            const bottom = card.querySelector('.card-bottom');
            const name = card.querySelector('.card-topline h3')?.textContent?.trim();
            if (!bottom || !name) return;
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'feedback-card-button feedback-button';
            button.dataset.feedbackApp = name;
            button.textContent = ui.button;
            const langCount = bottom.querySelector('.language-count');
            if (langCount) bottom.insertBefore(button, langCount); else bottom.appendChild(button);
        });
    }

    let returnFocus = null;
    function openFeedback(appName = 'AyoWWW') {
        const modal = document.getElementById('feedback-modal');
        const select = document.getElementById('feedback-program');
        if (!modal || !select) return;
        returnFocus = document.activeElement;
        populatePrograms();
        select.value = APP_NAMES.includes(appName) ? appName : 'AyoWWW';
        const status = document.getElementById('feedback-status');
        if (status) { status.textContent = ''; status.classList.remove('success','error'); }
        modal.hidden = false;
        document.body.classList.add('feedback-open');
        requestAnimationFrame(() => document.getElementById('feedback-message')?.focus());
    }

    function closeFeedback() {
        const modal = document.getElementById('feedback-modal');
        if (!modal) return;
        modal.hidden = true;
        document.body.classList.remove('feedback-open');
        if (returnFocus?.focus) returnFocus.focus();
    }

    async function sendFeedback(event) {
        event.preventDefault();
        const ui = uiFor();
        const delivery = deliveryFor();
        const honeypot = document.getElementById('feedback-website');
        const program = document.getElementById('feedback-program')?.value || 'AyoWWW';
        const typeSelect = document.getElementById('feedback-type');
        const typeLabel = typeSelect?.options[typeSelect.selectedIndex]?.textContent || '';
        const messageField = document.getElementById('feedback-message');
        const message = messageField?.value.trim() || '';
        const status = document.getElementById('feedback-status');
        const submit = document.getElementById('feedback-submit');

        if (honeypot?.value) { closeFeedback(); return; }
        if (!message) { if (status) status.textContent = ui.required; messageField?.focus(); return; }

        if (status) { status.textContent = delivery.sending; status.classList.remove('success','error'); }
        if (submit) { submit.disabled = true; submit.textContent = delivery.sending; }

        const languageName = document.querySelector('.flag-button.active')?.title || currentCode();
        const data = new FormData();
        data.append('program', program);
        data.append('type', typeLabel);
        data.append('message', message);
        data.append('language', languageName);
        data.append('source', window.location.href);
        data.append('_subject', `[Ayo Feedback] ${program} — ${typeLabel}`);
        data.append('_gotcha', '');

        try {
            const response = await fetch(ENDPOINT, {method:'POST', body:data, headers:{Accept:'application/json'}});
            if (!response.ok) throw new Error(`Formspree HTTP ${response.status}`);
            if (status) { status.textContent = delivery.success; status.classList.add('success'); }
            if (messageField) messageField.value = '';
            if (typeSelect) typeSelect.selectedIndex = 0;
        } catch (error) {
            console.error('Ayo feedback send failed:', error);
            if (status) { status.textContent = delivery.error; status.classList.add('error'); }
        } finally {
            if (submit) { submit.disabled = false; submit.textContent = uiFor().button; }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        populatePrograms();
        updateFeedbackUI();
        injectCardButtons();

        const grid = document.getElementById('project-grid');
        if (grid) new MutationObserver(() => { injectCardButtons(); updateFeedbackUI(); }).observe(grid, {childList:true});
        new MutationObserver(() => { updateFeedbackUI(); injectCardButtons(); }).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});

        document.addEventListener('click', event => {
            const button = event.target.closest?.('.feedback-button');
            if (button) { openFeedback(button.dataset.feedbackApp || 'AyoWWW'); return; }
            if (event.target.closest?.('[data-feedback-close]')) closeFeedback();
        });
        document.addEventListener('keydown', event => { if (event.key === 'Escape') closeFeedback(); });
        document.getElementById('feedback-form')?.addEventListener('submit', sendFeedback);
    });
})();
