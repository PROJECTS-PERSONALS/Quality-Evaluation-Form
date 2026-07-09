/* Pantalla de Inicio — Selección de Módulo de Evaluación
   Orquesta la secuencia: Logo -> Mensaje -> Tarjetas -> Interacciones.
   Cada etapa arranca únicamente cuando termina la transición de la anterior,
   evitando depender de temporizadores fijos y mantiene el código desacoplado. */

(function () {
    "use strict";

    const PRESS_ANIMATION_MS = 180;
    /**
     * Revela un elemento agregando la clase "is-visible" y ejecuta un callback
     * cuando termina su transición de opacidad (o de inmediato si no es visible/transicionable).
     */
    function reveal(el, onDone) {
        if (!el) {
            if (onDone) onDone();
            return;
        }

        let done = false;
        const finish = () => {
            if (done) return;
            done = true;
            if (onDone) onDone();
        };

        el.addEventListener(
            "transitionend",
            (e) => {
                if (e.propertyName === "opacity") finish();
            },
            { once: true }
        );
        // Salvaguarda por si el evento no dispara (ej. prefers-reduced-motion)
        const fallbackDelay = 1200;
        setTimeout(finish, fallbackDelay);

        requestAnimationFrame(() => el.classList.add("is-visible"));
    }

    function revealCardsSequentially(cards, stagger, onAllDone) {
        let remaining = cards.length;
        if (remaining === 0) {
            if (onAllDone) onAllDone();
            return;
        }

        cards.forEach((card, index) => {
            setTimeout(() => {
                reveal(card, () => {
                    remaining -= 1;
                    if (remaining === 0 && onAllDone) onAllDone();
                });
            }, index * stagger);
        });
    }

    function initEntranceSequence() {
        const logo = document.getElementById("logoWrap");
        const welcome = document.getElementById("welcomeMsg");
        const cards = Array.from(document.querySelectorAll(".card"));
        const hint = document.getElementById("hintText");

        reveal(logo, () => {
            reveal(welcome, () => {
                revealCardsSequentially(cards, 150, () => {
                    reveal(hint);
                });
            });
        });
    }
    /**
     * Da retroalimentación visual de "click" antes de abrir el módulo
     * correspondiente en una nueva pestaña.
     */
    function initCardNavigation() {
        document.querySelectorAll(".card").forEach((card) => {
            card.addEventListener("click", (event) => {
                // La tarjeta es un <a> con href real: se intercepta para animar
                // antes de navegar, pero degrada de forma segura si algo falla.
                event.preventDefault();

                if (card.classList.contains("is-pressed")) return;

                const destination = card.getAttribute("href");
                card.classList.add("is-pressed");

                setTimeout(() => {
                    card.classList.remove("is-pressed");
                    window.open(destination, "_blank", "noopener");
                }, PRESS_ANIMATION_MS);
            });
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        initEntranceSequence();
        initCardNavigation();
    });
})();