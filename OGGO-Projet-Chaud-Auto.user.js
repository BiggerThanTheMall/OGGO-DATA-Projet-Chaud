// ==UserScript==
// @name         OGGO Data – Projet Chaud Auto
// @namespace    https://github.com/BiggerThanTheMall/tampermonkey-ltoa
// @version      1.1.0
// @description  Coche automatiquement le switch pour passer un projet en statut « Projet chaud » sur la page des offres
// @author       LTOA
// @match        https://avenirprevoyanceetpatrimoine.oggo-data.net/admin/insurance/projects/*/offers*
// @run-at       document-idle
// @grant        none

// @updateURL    https://raw.githubusercontent.com/BiggerThanTheMall/tampermonkey-ltoa/main/OGGO-Projet-Chaud-Auto.user.js
// @downloadURL  https://raw.githubusercontent.com/BiggerThanTheMall/tampermonkey-ltoa/main/OGGO-Projet-Chaud-Auto.user.js
// ==/UserScript==

(function() {
    'use strict';

    function cocherProjetChaud() {
        // Trouver le lien avec data-original-title contenant "Projet froid"
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

    // Essayer plusieurs fois car la page charge en AJAX
    let attempts = 0;
    const interval = setInterval(() => {
        if (cocherProjetChaud() || attempts > 20) {
            clearInterval(interval);
        }
        attempts++;
    }, 300);

})();
