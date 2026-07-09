# Sistema de Evaluación de Calidad - 24h

Sistema web de evaluación de calidad para la Mesa de Ayuda de Tecnología del **Hospital General de Medellín**. Permite a los evaluadores calificar casos e interacciones bajo distintos formatos de calidad, con cálculos automáticos, monitoreo histórico por analista y una pantalla de inicio que centraliza el acceso a todos los módulos.

Todo el proyecto está construido en **HTML, CSS y JavaScript puros (vanilla)**, sin frameworks ni pasos de compilación: cada módulo es un conjunto autocontenido de archivos que se abre directamente en el navegador.

## Módulos

### 1. Pantalla de inicio (`index.html` + `Project/`)

Punto de entrada único al sistema. Muestra:

- El logotipo institucional **24h**, con animación de entrada (*Zoom In + Fade In*).
- El mensaje **"¡Bienvenido, Evaluador! ¿Qué evaluaremos hoy?"**, animado inmediatamente después del logo.
- Dos tarjetas interactivas — **Calidad y FCR** y **Calidad MDA** — que aparecen con *Fade Up + Fade In* al terminar la animación del mensaje.

Cada tarjeta tiene efectos de *hover* (escala y sombra) y de clic (efecto de "presionado") antes de abrir el módulo correspondiente **en una nueva pestaña**, apuntando a:

| Tarjeta | Abre |
|---|---|
| Calidad y FCR | `Calidad y FCR/Project N/index nuevo.html` |
| Calidad MDA | `Calidad MDA/Project/index.html` |

La secuencia de animaciones está orquestada por eventos (`transitionend`) en `Project/script.js`, no por temporizadores fijos, para que cada etapa arranque exactamente cuando termina la anterior. Respeta además `prefers-reduced-motion`.

### 2. Calidad MDA (`Calidad MDA/Project/`)

Formato de evaluación de la calidad de la información de un caso de Mesa de Ayuda, replicando el formato Excel homónimo del hospital.

Incluye:

- Encabezado con logo 24h y datos del caso (ID de requerimiento, fecha, evaluador, organización, analista, estado del caso).
- El **ID Caso Evaluado** se sincroniza en tiempo real con el encabezado ("Basado en Requerimiento R-...").
- Selector de **Analista** limitado a la lista oficial de analistas.
- Selector de **Estado del Caso** (Abierto/Pendiente/Cerrado) con color según el valor elegido.
- Matriz de 12 criterios de calidad con peso fijo (%) y calificación binaria (0 o 1); el puntaje logrado y el total se recalculan automáticamente al cambiar cualquier calificación.
- Botones **Limpiar** (restablece el formulario) e **Imprimir** (impresión respetando el diseño).

### 3. Calidad y FCR (`Calidad y FCR/Project N/`)

Formato de evaluación de calidad y FCR (First Call Resolution) para llamadas de la Mesa de Ayuda, con matriz de criterios agrupados por bloque (Protocolo, Habilidades, Diagnóstico, FCR), lógica de **errores críticos / knockout** que anula el puntaje final si se marca algún error grave, y textos de observaciones autoajustables.

Esta es la versión **vigente**, que amplía el formato original (conservado intacto en `Project O/`) agregando el módulo de **Monitoreo de Llamadas**:

- Botón **Guardar**: registra el porcentaje de "Puntuación Final" obtenido en la evaluación actual, asociándolo automáticamente al analista seleccionado en "Nombre del Agente". Cada analista acumula hasta **5 monitoreos**, llenados secuencialmente sin sobrescribir registros previos.
- Botón **Monitoreo**: navega (scroll suave) hacia la tabla de seguimiento.
- Tabla **Monitoreo de Llamadas**: un renglón por analista con sus 5 monitoreos, el **Promedio Individual**, el **Estatus/Nota**, y una fila final de **Promedio Grupal** por columna — todo recalculado en tiempo real.
- Los datos de monitoreo persisten en `localStorage` del navegador, por lo que el historial no se pierde al recargar la página (el botón Limpiar solo reinicia el formulario de evaluación actual, no el historial de monitoreo).

`Project O/` es la versión previa a esta ampliación y se conserva **sin modificar**, como referencia y respaldo.

---

## Cómo usar el proyecto

No requiere instalación, dependencias ni servidor: son archivos estáticos.

1. Abre `index.html` (la pantalla de inicio) directamente en el navegador, o sírvelo con cualquier servidor estático simple (por ejemplo `python3 -m http.server`) para que las rutas relativas entre carpetas funcionen sin restricciones del navegador.
2. Desde ahí, selecciona **Calidad y FCR** o **Calidad MDA** para abrir el módulo correspondiente en una nueva pestaña.
3. También puedes abrir cada módulo directamente desde su propia carpeta (`Calidad MDA/Project/index.html` o `Calidad y FCR/Project N/index nuevo.html`) sin pasar por la pantalla de inicio.

> **Importante:** la pantalla de inicio y los módulos dependen de su posición relativa dentro de esta misma estructura de carpetas. Si se mueve algún módulo a otra ubicación, hay que actualizar las rutas (`href`) en `index.html`.

---

## Tecnología

- HTML5, CSS3 y JavaScript vanilla (ES6+), sin frameworks ni build tools.
- Sin dependencias externas ni llamadas a APIs: todo el cálculo ocurre en el navegador.
- Persistencia local mediante `localStorage` únicamente en el módulo de Monitoreo de Llamadas.
- Diseño responsive (desktop, laptop, tablet y móvil) en los tres módulos.

---

## Notas y decisiones de diseño

- En **Calidad MDA**, el criterio "Impacto / Urgencia / Prioridad" se implementó con un peso de **10 %** (tomado del Excel de referencia) en lugar del 5 % que aparecía en las imágenes de diseño, ya que solo así el total de la matriz suma 100 %.
- En el módulo de **Monitoreo de Llamadas**, tanto "Promedio Individual" como "Estatus/Nota" muestran el **promedio real** de los monitoreos registrados para ese analista (no la suma), y el promedio se calcula únicamente sobre los monitoreos existentes, no siempre sobre 5. "Estatus/Nota" refleja el mismo valor que "Promedio Individual" al no existir en la documentación una escala de calificación cualitativa distinta.

---

## Créditos

Desarrollado para la Mesa de Ayuda de Tecnología del Hospital General de Medellín. Evaluador de referencia: Hector Samir Perez Perez.

---

## Estructura del proyecto

```
Combinación De Calidad/
├── index.html                         → Pantalla de inicio (selector de módulos)
├── Project/                           → Recursos de la pantalla de inicio
│   ├── script.js
│   ├── styles.css
│   └── readme.md                      → Especificación original de la pantalla de inicio
│
├── Calidad MDA/
│   ├── Project/                       → Módulo "Calidad MDA" (versión en uso)
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── script.js
│   └── Helps/                         → Referencias usadas para construir el módulo
│       ├── Design Reference.png
│       ├── Feature Reference.png
│       ├── Formato Evaluacion Calidad Mesa Ayuda.xlsx
│       └── readme (Reference).md
│
└── Calidad y FCR/
    ├── Project N/                      → Módulo "Calidad y FCR" (versión vigente, con Monitoreo de Llamadas)
    │   ├── index nuevo.html
    │   ├── style nuevo.css
    │   └── script nuevo.js
    ├── Project O/                      → Versión original del módulo, sin el módulo de Monitoreo (se conserva intacta)
    │   ├── index (original).html
    │   ├── style (original).css
    │   └── script (original).js
    └── Helps/                          → Referencias usadas para construir el módulo y su ampliación
        ├── Design Reference (FCR).png
        ├── Feature Reference (FCR).png
        ├── Design Reference (Monitoreo).png
        ├── Formato Evaluacion Calidad y FCR.xlsx
        ├── Formato Evaluacion Calida y FCR (Monitoreo).xlsx
        ├── Formato Evaluación Calidad y FCR.docx
        ├── readme (Reference FCR).md
        └── readme (Reference Monitoreo).md
```

Las carpetas **Helps** no forman parte de la aplicación: guardan las imágenes de diseño, los formatos Excel/Word originales y los readme de referencia que se usaron para construir o ampliar cada módulo, a modo de documentación histórica.

---