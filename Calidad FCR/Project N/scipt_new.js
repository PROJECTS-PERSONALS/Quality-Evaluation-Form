/* FORMATO DE EVALUACIÓN DE LA CALIDAD Y FCR script.js — Lógica completa */
// Mapa analistas: nombre → cédula 
const ANALYSTS = {
    "Juan Diego Mazo Lezcano": "1020110871",
    "Juan José Santana Garzón": "1022142959",
    "Juan Pablo Gaviria Correa": "1152464110",
    "Julián García Araque": "1000401771",
    "Kevin Daniel Mosquera Córdoba": "1076819340",
    "William David Jarava Solano": "1104410026",
    "Yin Carlos Martínez Pérez": "72203802",
};

// Criterios: key { pct, bloque } 
const CRITERIA = {
    saludo: { pct: 5, bloque: "protocolo" },
    hold: { pct: 5, bloque: "protocolo" },
    cierre: { pct: 5, bloque: "protocolo" },
    encuesta: { pct: 5, bloque: "protocolo" },
    empatia: { pct: 10, bloque: "habilidades" },
    lenguaje: { pct: 10, bloque: "habilidades" },
    sondeo: { pct: 5, bloque: "diagnostico" },
    herramientas: { pct: 10, bloque: "diagnostico" },
    seguridad: { pct: 5, bloque: "diagnostico" },
    efectividad: { pct: 15, bloque: "fcr" },
    validacion: { pct: 15, bloque: "fcr" },
    reincidencia: { pct: 10, bloque: "fcr" },
};

// Estado actual de cada criterio
const state = {}; Object.keys(CRITERIA).forEach(k => { state[k] = null; }); // null | 'si' | 'no' | 'na'

// Knockout state
const koState = { maltrato: null, info: null, seguridad: null };

/* 1. FECHA AUTOMÁTICA */
(function initFecha() {
    const display = document.getElementById("fechaDisplay");
    const picker = document.getElementById("fechaPicker");
    const btnCal = document.getElementById("btnCalendar");

    function formatDate(dateObj) {
        const d = String(dateObj.getDate()).padStart(2, "0");
        const m = String(dateObj.getMonth() + 1).padStart(2, "0");
        const y = dateObj.getFullYear();
        return `${d}/${m}/${y}`;
    }

    function toInputValue(dateObj) {
        const d = String(dateObj.getDate()).padStart(2, "0");
        const m = String(dateObj.getMonth() + 1).padStart(2, "0");
        const y = dateObj.getFullYear();
        return `${y}-${m}-${d}`;
    }

    const today = new Date();
    display.textContent = formatDate(today);
    picker.value = toInputValue(today);

    btnCal.addEventListener("click", () => {
        picker.style.pointerEvents = "auto";
        picker.showPicker ? picker.showPicker() : picker.click();
        setTimeout(() => { picker.style.pointerEvents = "none"; }, 500);
    });

    picker.addEventListener("change", () => {
        if (!picker.value) return;
        const [y, m, d] = picker.value.split("-");
        display.textContent = `${d}/${m}/${y}`;
    });
})();

/* 2. SELECCIÓN DE ANALISTA → Cédula automática */
(function initAnalista() {
    const select = document.getElementById("selectAnalista");
    const respNombre = document.getElementById("respNombre");
    const respCedula = document.getElementById("respCedula");

    select.addEventListener("change", () => {
        const nombre = select.options[select.selectedIndex].text;
        const cedula = select.value;

        if (cedula) {
            respNombre.textContent = nombre;
            respCedula.textContent = cedula;
        } else {
            respNombre.textContent = "[ Seleccione Un Analista ]";
            respCedula.textContent = "[ Cédula Automática ]";
        }
    });
})();

/* 3. RADIOS DE EVALUACIÓN → Resultado + Puntaje */
function updateResultBadge(key) {
    const badge = document.getElementById(`res-${key}`);
    const val = state[key];
    const pct = CRITERIA[key].pct;

    badge.className = "result-badge";
    if (val === "si") {
        badge.textContent = `${pct}%`;
        badge.classList.add("is-si");
    } else if (val === "no") {
        badge.textContent = "0%";
        badge.classList.add("is-no");
    } else if (val === "na") {
        badge.textContent = "N/A";
        badge.classList.add("is-na");
    } else {
        badge.textContent = "—";
    }
}

function calcBlockScore(bloque) {
    let total = 0;
    Object.entries(CRITERIA).forEach(([k, meta]) => {
        if (meta.bloque === bloque && state[k] === "si") {
            total += meta.pct;
        }
    });
    return total;
}

function updateSummary() {
    const bloques = ["protocolo", "habilidades", "diagnostico", "fcr"];
    const ids = ["score-protocolo", "score-habilidades", "score-diagnostico", "score-fcr"];

    let grand = 0;
    bloques.forEach((b, i) => {
        const s = calcBlockScore(b);
        document.getElementById(ids[i]).textContent = `${s}%`;
        grand += s;
    });
    // Aplicar knockout
    const koTriggered = Object.values(koState).some(v => v === "no");
    const finalEl = document.getElementById("scoreFinal");

    if (koTriggered) {
        finalEl.textContent = "0%";
        finalEl.classList.add("is-zero");
    } else {
        finalEl.textContent = `${grand}%`;
        finalEl.classList.remove("is-zero");
    }
}

// Registrar listeners en todos los radios de criterio
document.querySelectorAll(".criteria-row").forEach(row => {
    const key = row.dataset.key;
    row.querySelectorAll("input[type='radio']").forEach(radio => {
        radio.addEventListener("change", () => {
            state[key] = radio.value;
            updateResultBadge(key);
            updateSummary();
            updateKnockoutAvailability();
        });
    });
});

/* 4.b LÓGICA INTELIGENTE: Matriz De Evaluación → Errores Críticos
   Si todos los criterios de la matriz están calificados con "SI", se interpreta
   que la evaluación fue perfecta y el módulo de Errores Críticos se limpia y
   deshabilita automáticamente. En cuanto una respuesta deje de ser "SI",
   el módulo vuelve a habilitarse. No afecta cálculos, puntajes ni el resto
   de módulos: solo controla la interactividad de los radios ko_*. */
const knockoutSection = document.getElementById("knockoutSection");
const koDisabledNote = document.getElementById("koDisabledNote");
const knockoutRadios = document.querySelectorAll(".ko-item-row input[type='radio']");

function allCriteriaAreSi() {
    return Object.values(state).every(v => v === "si");
}

function setKnockoutEnabled(enabled) {
    knockoutRadios.forEach(r => { r.disabled = !enabled; });
    knockoutSection.classList.toggle("is-disabled", !enabled);
    koDisabledNote.hidden = enabled;
}

function updateKnockoutAvailability() {
    if (allCriteriaAreSi()) {
        // Limpiar cualquier selección previa antes de deshabilitar el módulo
        knockoutRadios.forEach(r => { r.checked = false; });
        Object.keys(koState).forEach(k => { koState[k] = null; });
        setKnockoutEnabled(false);
        updateSummary(); // recalcula la Puntuación Final ya sin knockout pendiente
    } else {
        setKnockoutEnabled(true);
    }
}

/* 4. KNOCKOUT RADIOS */
document.querySelectorAll(".ko-item-row").forEach(row => {
    const radios = row.querySelectorAll("input[type='radio']");
    const name = radios[0]?.name;
    if (!name) return;
    // Mapear nombre de radio → clave en koState
    const map = {
        ko_maltrato: "maltrato",
        ko_info: "info",
        ko_seguridad: "seguridad",
    };

    radios.forEach(r => {
        r.addEventListener("change", () => {
            const k = map[r.name];
            if (k) koState[k] = r.value;
            updateSummary();
        });
    });
});

/* 5. OVERVIEWS (toggle) */
document.querySelectorAll(".btn-overview").forEach(btn => {
    btn.addEventListener("click", () => {
        const key = btn.dataset.overview;
        const target = document.getElementById(`overview-${key}`);
        if (!target) return;

        const isOpen = target.classList.toggle("is-open");
        btn.textContent = isOpen
            ? btn.textContent.replace("▼", "▲")
            : btn.textContent.replace("▲", "▼");
        // Mantener texto original para btns con solo flecha
        if (btn.classList.contains("btn-overview-ko")) {
            btn.textContent = isOpen ? "▲ Errores Críticos" : "▼ Errores Críticos";
        }
    });
});

/* 6. TEXTAREAS AUTOAJUSTABLES */
document.querySelectorAll(".auto-textarea").forEach(ta => {
    function resize() {
        ta.style.height = "auto";
        ta.style.height = ta.scrollHeight + "px";
    }
    ta.addEventListener("input", resize);
    ta.addEventListener("paste", () => { setTimeout(resize, 0); });
    // Ajuste inicial
    resize();
});

/* 7. BOTÓN LIMPIAR */
document.getElementById("btnClear").addEventListener("click", () => {
    if (!confirm("¿Deseas limpiar todo el formulario? Esta acción no se puede deshacer.")) return;
    // Reset analista
    document.getElementById("selectAnalista").value = "";
    document.getElementById("respNombre").textContent = "[ Seleccione Un Analista ]";
    document.getElementById("respCedula").textContent = "[ Cédula Automática ]";
    // Reset ticket
    document.getElementById("ticketId").value = "R-000000";
    // Reset fecha a hoy
    const today = new Date();
    const d = String(today.getDate()).padStart(2, "0");
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const y = today.getFullYear();
    document.getElementById("fechaDisplay").textContent = `${d}/${m}/${y}`;
    // Reset radios de criterio + estado
    Object.keys(state).forEach(k => { state[k] = null; });
    document.querySelectorAll(".criteria-row input[type='radio']").forEach(r => {
        r.checked = false;
    });
    // Reset badges
    Object.keys(CRITERIA).forEach(k => {
        const badge = document.getElementById(`res-${k}`);
        badge.textContent = "—";
        badge.className = "result-badge";
    });
    // Reset knockout
    Object.keys(koState).forEach(k => { koState[k] = null; });
    document.querySelectorAll(".ko-item-row input[type='radio']").forEach(r => {
        r.checked = false;
    });
    // Reset textareas
    document.querySelectorAll(".auto-textarea").forEach(ta => {
        ta.value = "";
        ta.style.height = "auto";
    });
    // Reset scores
    ["score-protocolo", "score-habilidades", "score-diagnostico", "score-fcr"].forEach(id => {
        document.getElementById(id).textContent = "0%";
    });
    const finalEl = document.getElementById("scoreFinal");
    finalEl.textContent = "0%";
    finalEl.classList.remove("is-zero");
    // Cerrar overviews
    document.querySelectorAll(".overview-row.is-open").forEach(row => {
        row.classList.remove("is-open");
    });
    document.querySelectorAll(".btn-overview").forEach(btn => {
        if (btn.classList.contains("btn-overview-ko")) {
            btn.textContent = "▼ Errores Críticos";
        } else {
            btn.textContent = "▼";
        }
    });
    // Con la matriz en null (ningún criterio en "si"), Errores Críticos vuelve a habilitarse
    updateKnockoutAvailability();
});

/* 8. BOTÓN IMPRIMIR */
document.getElementById("btnPrint").addEventListener("click", () => {
    window.print();
});

/*
   MÓDULO NUEVO: MONITOREO DE LLAMADAS
   No modifica ninguna función ni variable anterior; se integra escuchando
   los mismos elementos del formulario original (selectAnalista, scoreFinal).
*/
(function initMonitoreo() {
    const STORAGE_KEY = "monitoreoLlamadas_v1";
    const MAX_MONITOREOS = 5;

    const tbody = document.getElementById("monitoringBody");
    const toastEl = document.getElementById("toast");
    let toastTimer = null;
    /* Retroalimentación visual (toast) */
    function showToast(message, type = "info") {
        toastEl.textContent = message;
        toastEl.className = "toast is-visible" + (type !== "info" ? ` is-${type}` : "");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toastEl.classList.remove("is-visible");
        }, 3200);
    }
    /* Persistencia */
    function loadStore() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch {
            return {};
        }
    }

    function saveStore(store) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
        } catch {
            /* almacenamiento no disponible: continúa solo en memoria de esta sesión */
        }
    }

    let store = loadStore(); // { [cedula]: number[] } — cada número es un % ya guardado
    /* Cálculos */
    function average(arr) {
        if (!arr || arr.length === 0) return 0;
        const sum = arr.reduce((a, b) => a + b, 0);
        return Math.round((sum / arr.length) * 10) / 10;
    }
    /* Construcción de la tabla */
    function renderTable() {
        tbody.innerHTML = "";
        const cedulas = Object.values(ANALYSTS);
        const nombres = Object.keys(ANALYSTS);
        const selectedCedula = document.getElementById("selectAnalista").value;
        // Acumuladores para Promedio Grupal
        const colTotals = [0, 0, 0, 0, 0];
        const colCounts = [0, 0, 0, 0, 0];
        let groupAvgSum = 0;
        let groupAvgCount = 0;

        nombres.forEach((nombre, idx) => {
            const cedula = cedulas[idx];
            const scores = store[cedula] || [];

            const tr = document.createElement("tr");
            if (cedula === selectedCedula && selectedCedula !== "") {
                tr.classList.add("is-active-analyst");
            }

            let cellsHtml = `<td class="mon-name">${nombre}</td>`;
            for (let i = 0; i < MAX_MONITOREOS; i++) {
                const val = scores[i];
                if (typeof val === "number") {
                    cellsHtml += `<td>${val}%</td>`;
                    colTotals[i] += val;
                    colCounts[i] += 1;
                } else {
                    cellsHtml += `<td>0%</td>`;
                }
            }

            const promedio = average(scores);
            if (scores.length > 0) {
                groupAvgSum += promedio;
                groupAvgCount += 1;
            }
            cellsHtml += `<td class="mon-avg">${promedio}%</td>`;
            cellsHtml += `<td class="mon-status">${promedio}%</td>`;

            tr.innerHTML = cellsHtml;
            tbody.appendChild(tr);
        });
        // Fila Promedio Grupal
        for (let i = 0; i < MAX_MONITOREOS; i++) {
            const el = document.getElementById(`groupM${i + 1}`);
            const colAvg = colCounts[i] > 0 ? Math.round((colTotals[i] / colCounts[i]) * 10) / 10 : 0;
            el.textContent = `${colAvg}%`;
        }
        const groupAvg = groupAvgCount > 0 ? Math.round((groupAvgSum / groupAvgCount) * 10) / 10 : 0;
        document.getElementById("groupAvg").textContent = `${groupAvg}%`;
        document.getElementById("groupStatus").textContent = `${groupAvg}%`;
    }

    /* Resaltar analista activo al cambiar el select principal */
    document.getElementById("selectAnalista").addEventListener("change", renderTable);
    /* Botón Guardar */
    document.getElementById("btnSave").addEventListener("click", () => {
        const select = document.getElementById("selectAnalista");
        const cedula = select.value;
        const nombre = select.options[select.selectedIndex]?.text?.trim();

        if (!cedula) {
            showToast("Selecciona un analista en \u201cNombre Del Analista\u201d antes de guardar.", "error");
            return;
        }

        const scoreFinalText = document.getElementById("scoreFinal").textContent.trim();
        const scoreValue = parseFloat(scoreFinalText.replace("%", "").replace(",", "."));
        if (Number.isNaN(scoreValue)) {
            showToast("No hay una puntuación final calculada para guardar.", "error");
            return;
        }

        if (!store[cedula]) store[cedula] = [];

        if (store[cedula].length >= MAX_MONITOREOS) {
            showToast(`${nombre} ya tiene los ${MAX_MONITOREOS} monitoreos registrados.`, "warning");
            return;
        }

        store[cedula].push(scoreValue);
        saveStore(store);
        renderTable();

        const slot = store[cedula].length;
        showToast(`Monitoreo ${slot} guardado para ${nombre}: ${scoreValue}%`, "success");
    });
    /* Botón Limpiar Monitoreo: reinicia únicamente este módulo */
    document.getElementById("btnMonitoreo").addEventListener("click", () => {
        const confirmado = confirm("¿Desea limpiar completamente todos los registros del módulo Monitoreo de Llamadas?");
        if (!confirmado) return;

        store = {};
        saveStore(store);
        renderTable(); // recalcula Monitoreos 1–5, Promedio Individual, Estatus/Nota y Promedio Grupal a partir de "store" vacío

        showToast("El módulo Monitoreo de Llamadas fue reiniciado.", "success");
    });
    /* Render inicial */
    renderTable();
})();