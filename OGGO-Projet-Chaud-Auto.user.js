// ==UserScript==
// @name         OGGO Data – Projet Chaud Auto
// @namespace    https://github.com/BiggerThanTheMall/tampermonkey-ltoa
// @version      1.1.0
// @description  Coche automatiquement le switch pour passer en Projet chaud sur la page des offres et ajoute clients@ltoa-assurances.fr en CC sur l'envoi de devis
// @author       LTOA
// @match        https://avenirprevoyanceetpatrimoine.oggo-data.net/admin/insurance/projects/*/offers*
// @run-at       document-idle
// @grant        none

// @updateURL    https://raw.githubusercontent.com/BiggerThanTheMall/tampermonkey-ltoa/main/OGGO-Projet-Chaud-Auto.user.js
// @downloadURL  https://raw.githubusercontent.com/BiggerThanTheMall/tampermonkey-ltoa/main/OGGO-Projet-Chaud-Auto.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Fonction pour cocher Projet Chaud (page offers)
    function cocherProjetChaud() {
        const link = document.querySelector('a[data-original-title*="Projet froid"]');
        if (link) {
            const switchEl = link.querySelector('input.switch_checkbox');
            if (switchEl && !switchEl.checked) {
                switchEl.click();
                console.log('Switch passé en Projet chaud');
                return true;
            }
        }
        return false;
    }

    // Fonction pour ajouter l'email en CC (page send-quotation)
    function ajouterEmailCC() {
        const ccInput = document.querySelector('input#edit-cc-0');

        if (ccInput) {
            if (!ccInput.value.includes('clients@ltoa-assurances.fr')) {
                ccInput.value = 'clients@ltoa-assurances.fr';
                ccInput.dispatchEvent(new Event('input', { bubbles: true }));
                ccInput.dispatchEvent(new Event('change', { bubbles: true }));
                console.log('Email clients@ltoa-assurances.fr ajouté en CC');
                return true;
            }
            return true;
        }
        return false;
    }

    // Détecter sur quelle page on est
    const currentUrl = window.location.href;

    if (currentUrl.includes('/send-quotation')) {
        let attempts = 0;
        const interval = setInterval(() => {
            if (ajouterEmailCC() || attempts > 20) {
                clearInterval(interval);
            }
            attempts++;
        }, 300);
    } else if (currentUrl.includes('/offers')) {
        let attempts = 0;
        const interval = setInterval(() => {
            if (cocherProjetChaud() || attempts > 20) {
                clearInterval(interval);
            }
            attempts++;
        }, 300);
    }
})();
