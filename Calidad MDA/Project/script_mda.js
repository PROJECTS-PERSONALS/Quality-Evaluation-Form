(function () {
	"use strict";
	// Datos fijos de la matriz de evaluación (según Formato_Evaluacion_Calidad_Mesa_Ayuda.xlsx) 
	const CRITERIA = [
		{
			seccion: "1. Información General - Organización",
			criterio: "Verifica si el caso está asociado correctamente a la entidad cliente (ej. Hospital General de Medellín).",
			peso: 0.05
		},
		{
			seccion: "1. Información General - Reportado por",
			criterio: "Registra correctamente el rol o nombre de quien reporta (ej. Medicos Hospitalizacion) para trazabilidad.",
			peso: 0.05
		},
		{
			seccion: "1. Información General - Estatus / Origen",
			criterio: "El estado refleja el ciclo de vida real y el canal de entrada (Teléfono) está bien tipificado.",
			peso: 0.05
		},
		{
			seccion: "1. Información General - Asunto / Descripción",
			criterio: "El asunto es claro y la descripción detalla la necesidad exacta (traslado de PC), nombres, roles y activos involucrados.",
			peso: 0.15
		},
		{
			seccion: "2. Clasificación y Asignación - Tipo de Reporte / Servicio",
			criterio: "El caso está bien catalogado (Requerimiento de Servicio) y alineado al catálogo (N1 Estación de Trabajo).",
			peso: 0.10
		},
		{
			seccion: "2. Clasificación y Asignación - Impacto / Urgencia / Prioridad",
			criterio: "La matriz de prioridad guarda coherencia con el impacto declarado (Una Persona / Baja -> Prioridad Baja).",
			peso: 0.10
		},
		{
			seccion: "2. Clasificación y Asignación - Subcategoría / Escalamiento",
			criterio: "Tipificación técnica precisa (REQ_Instalacion) y banderas de escalamiento correctamente diligenciadas.",
			peso: 0.05
		},
		{
			seccion: "2. Clasificación y Asignación - Grupo / Analista",
			criterio: "Asignación correcta al grupo resolutor (Nivel 1 De Ayuda) y especialista responsable.",
			peso: 0.05
		},
		{
			seccion: "3. Gestión de Tiempos y SLA - Fechas del Ciclo de Vida",
			criterio: "Consistencia cronológica estricta entre Inicio, Asignación, Última Actualización y Solución.",
			peso: 0.05
		},
		{
			seccion: "3. Gestión de Tiempos y SLA - Métricas de SLA",
			criterio: "Los campos de cumplimiento y exceso de SLA (Asignación y Solución) están calculados y guardan coherencia.",
			peso: 0.10
		},
		{
			seccion: "4. Solución y Cierre - Código de Solución",
			criterio: "El cierre utiliza la categoría correcta según el catálogo de soluciones (Asistencia).",
			peso: 0.05
		},
		{
			seccion: "4. Solución y Cierre - Detalle de la Solución",
			criterio: "Describe de forma clara, técnica y completa las acciones realizadas, pruebas de funcionamiento y estado de entrega.",
			peso: 0.20
		}
	];

	const DEFAULT_ID = "R-000000";
	// Helpers 
	const $ = (id) => document.getElementById(id);
	const pct = (n) => `${Math.round(n * 1000) / 10}%`;

	function pad2(n) { return String(n).padStart(2, "0"); }

	function isoToday() {
		const d = new Date();
		return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
	}

	function isoToDisplay(iso) {
		if (!iso) return "";
		const [y, m, d] = iso.split("-");
		return `${d}/${m}/${y}`;
	}
	// Render tabla 
	const tbody = $("evalBody");

	function buildRows() {
		tbody.innerHTML = "";
		CRITERIA.forEach((item, idx) => {
			const tr = document.createElement("tr");
			tr.dataset.index = idx;
			tr.innerHTML = 
				`
				<td class="cell-criterio"> ${item.criterio} </td>
				<td class="cell-seccion"> ${item.seccion} </td>
				<td class="cell-peso"> ${pct(item.peso)} </td>
					<td class="cell-calif">
						<select class="calif-select" data-peso=" ${item.peso} ">
							<option value="" data-placeholder="true"> [Seleccione] </option>
							<option value="1"> 1 </option>
							<option value="0"> 0 </option>
						</select>
					</td>
					<td class="cell-puntaje" data-puntaje> ${pct(item.peso)} </td>
					<td class="cell-obs">
						<input type="text" class="obs-input" placeholder="Escriba observaciones o hallazgos...">
					</td>
				`;
			tbody.appendChild(tr);
		});
	}
	// Cálculos 
	function recalcAll() {
		let totalPeso = 0;
		let totalCalif = 0;
		let totalPuntaje = 0;

		tbody.querySelectorAll("tr").forEach((tr) => {
			const select = tr.querySelector(".calif-select");
			const peso = parseFloat(select.dataset.peso);
			const calif = parseInt(select.value, 10);
			const puntaje = calif === 1 ? peso : 0;

			tr.querySelector("[data-puntaje]").textContent = pct(puntaje);

			totalPeso += peso;
			totalCalif += calif;
			totalPuntaje += puntaje;
		});

		$("totalPeso").textContent = pct(totalPeso);
		$("totalCalif").textContent = totalCalif;
		$("totalPuntaje").textContent = pct(totalPuntaje);
	}

	tbody.addEventListener("change", (e) => {
		if (e.target.classList.contains("calif-select")) recalcAll();
	});
	// ID Caso Evaluado -> sincroniza encabezado en tiempo real 
	const idCaso = $("idCaso");
	const headerReqId = $("headerReqId");

	function syncReqId() {
		const val = idCaso.value.trim();
		headerReqId.textContent = val === "" ? DEFAULT_ID : val;
	}

	idCaso.addEventListener("input", syncReqId);
	// Fecha: auto hoy + selector manual 
	const fechaDisplay = $("fechaDisplay");
	const fechaHidden = $("fechaHidden");
	const calendarBtn = $("calendarBtn");

	function setToday() {
		const iso = isoToday();
		fechaHidden.value = iso;
		fechaDisplay.value = isoToDisplay(iso);
	}

	calendarBtn.addEventListener("click", () => {
		if (typeof fechaHidden.showPicker === "function") {
			fechaHidden.showPicker();
		} else {
			fechaHidden.focus();
			fechaHidden.click();
		}
	});

	fechaHidden.addEventListener("change", () => {
		if (fechaHidden.value) fechaDisplay.value = isoToDisplay(fechaHidden.value);
	});
	// Analista: select simple, solo muestra el nombre 
	const analista = $("analista");

	function updateAnalistaStyle() {
		if (analista.value === "") {
			analista.classList.add("select-placeholder");
			analista.classList.remove("select-value");
		} else {
			analista.classList.remove("select-placeholder");
			analista.classList.add("select-value");
		}
	}
	analista.addEventListener("change", updateAnalistaStyle);

	// Estado: select con color según estado 
	const estado = $("estado");
	const ESTADO_CLASS = {
		"Abierto": "estado-abierto",
		"Pendiente": "estado-pendiente",
		"Cerrado": "estado-cerrado"
	};

	function updateEstadoStyle() {
		estado.classList.remove("estado-abierto", "estado-pendiente", "estado-cerrado", "select-value");
		if (estado.value === "") {
			estado.classList.add("select-placeholder");
		} else {
			estado.classList.remove("select-placeholder");
			estado.classList.add("select-value", ESTADO_CLASS[estado.value]);
		}
	}
	estado.addEventListener("change", updateEstadoStyle);
	// Botón Limpiar: restablece todo al estado inicial 
	function resetForm() {
		idCaso.value = DEFAULT_ID;
		syncReqId();

		setToday();

		analista.value = "";
		updateAnalistaStyle();

		estado.value = "";
		updateEstadoStyle();

		buildRows();
		tbody.querySelectorAll(".obs-input").forEach((inp) => (inp.value = ""));
		recalcAll();
	}

	$("btnClear").addEventListener("click", resetForm);

	// Botón Imprimir 
	$("btnPrint").addEventListener("click", () => window.print());

	// Inicialización 
	buildRows();
	syncReqId();
	setToday();
	updateAnalistaStyle();
	updateEstadoStyle();
	recalcAll();
})();