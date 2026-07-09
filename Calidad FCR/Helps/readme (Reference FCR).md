# Funcionalidades que debe llevar el proyecto

## 1. Funcionalidad del "[Seleccione un Analista]"

Esta será una opción de selección múltiple, la cual tendrá las siguientes opciones. En la parte de **"Información General (Datos de Control)"** solo mostrará los nombres, pero en la parte de **"Responsables"**, al momento de seleccionar el analista, llenará automáticamente el apartado de **"[Cédula Automática]"**, tal como lo indica su nombre.

* Nombre + Cédula Automática

  1. Juan Diego Mazo Lezcano = 1020110871
  2. Juan José Santana Garzón = 1022142959
  3. Juan Pablo Gaviria Correa = 1152464110
  4. Julián García Araque = 1000401771
  5. Kevin Daniel Mosquera Córdoba = 1076819340
  6. William David Jarava Solano = 1104410026
  7. Yin Carlos Martínez Pérez = 72203802

---

## 2. Funcionalidad del "[Seleccione una Fecha]"

La fecha se establecerá automáticamente según el día en que se abra el formulario. Sin embargo, deberá contar con un ícono de calendario al lado que permita seleccionar una fecha diferente.

---

## 3. Funcionalidad del "[Seleccione una Opción]"

Esta mostrará un resultado según la opción escogida en el apartado de **"Resumen de Puntuación (1)"**, el cual está ligado a las descripciones que aparecen al frente del mismo.

Es decir, si en el apartado de **"Protocolo y Conectividad (20%)"**, en la opción **"Saludo y Apertura (5%)"**, selecciono **Sí**, en el apartado **"[Seleccione una Opción]"** se reflejará el **5%**. Si selecciono **No**, aparecerá **0%**, y si selecciono **N/A**, en dicho apartado también se mostrará **N/A**.

Esto también aplica para los demás apartados con las siguientes casillas:

### A) Protocolo y Conectividad (20%)

* Saludo y Apertura (5%)
* Uso del Tiempo en Espera/Hold (5%)
* Cierre y Despedida (5%)
* Transferencia a la Encuesta de Satisfacción (5%)

### B) Habilidades Blandas y Comunicación (20%)

* Empatía y Escucha Activa (10%)
* Lenguaje y Tono de Voz (10%)

### C) Diagnóstico y Procesos (20%)

* Sondeo y Recopilación de Datos (5%)
* Uso de Herramientas y Gestión (10%)
* Seguridad de la Información (5%)

### D) Resolución en Primer Contacto - FCR (40%)

* Efectividad Técnica (15%)
* Validación de la Solución (15%)
* Evitación de Reincidencia / Educación (10%)

---

## 4. Funcionalidad en el apartado de "Resumen de Puntuación (2)"

Específicamente en el apartado de **"Puntaje Obtenido"**.

Este se complementará con la suma de los puntajes obtenidos en **"Resumen de Puntuación (1)"**, luego de seleccionar **Sí**, **No** o **N/A**. Finalmente, dichos porcentajes se sumarán en el apartado **"Puntaje Final (%)"**.

---

## 5. Funcionalidad en el apartado de "Errores Críticos (Ítem Knockout / Zero Tolerance)"

En este apartado estarán disponibles las opciones **Sí** y **No**.

La funcionalidad consistirá en mantener el porcentaje total obtenido en el apartado **"Porcentaje Final (%)"** siempre que todas las opciones estén marcadas con **Sí**. Sin embargo, si en alguna de las opciones se selecciona **No**, el porcentaje final deberá establecerse automáticamente en **0%**.

Las opciones son:

* 1. Maltrato al usuario.
* 2. Información falsa / Inventar procedimientos.
* 3. Incumplimiento de Seguridad.

---

## 6. Funcionalidad en el apartado de "Comentarios y Plan de Acción"

Específicamente en los apartados **"Fortalezas Detectadas"**, **"Oportunidades de Mejora"** y **"Compromisos / Plan de Acción"**.

Quiero que estos sean áreas de texto donde se pueda escribir de forma indefinida. Además, el cuadro deberá aumentar automáticamente su tamaño conforme se escriba o se pegue más texto.

El contenido deberá mantenerse alineado correctamente y, antes de escribir, deberá mostrarse un texto de ejemplo mediante un **placeholder** semitransparente para orientar al usuario sobre la información que debe ingresar.

---

## 7. Funcionalidad de diseño (Overview)

La última funcionalidad corresponde principalmente al diseño, aunque estará ligada a comandos.

Quiero crear un mensaje mediante **Overview** que muestre una explicación sobre qué se evalúa en cada uno de los apartados y sus respectivos criterios.

### Apartados con Overview

### A) Protocolo y Conectividad (20%)

**Mensaje:** Este bloque mide el cumplimiento de los estándares de marca y el respeto al tiempo del usuario.

* **Saludo y Apertura (5%)** = Utiliza el saludo oficial, dice su nombre de forma clara, menciona el nombre de la empresa y muestra disposición de ayuda.
* **Uso del Tiempo en Espera/Hold (5%)** = Solicita permiso para poner en espera, explica la razón, no supera los 2 minutos sin reportarse y agradece al volver.
* **Cierre y Despedida (5%)** = Confirma que no existan más dudas, agradece la llamada, utiliza la frase de cierre oficial y espera a que el usuario cuelgue.
* **Transferencia a la Encuesta de Satisfacción (5%)** = Solicita al usuario que colabore con el diligenciamiento de la encuesta de satisfacción.

### B) Habilidades Blandas y Comunicación (20%)

**Mensaje:** Este bloque mide la empatía y el manejo de la interacción con el usuario.

* **Empatía y Escucha Activa (10%)** = Muestra interés genuino, no interrumpe al usuario, valida su problema y mantiene una actitud colaborativa.
* **Lenguaje y Tono de Voz (10%)** = Utiliza un vocabulario profesional (evita tecnicismos excesivos o modismos), mantiene un tono calmado, seguro y un ritmo adecuado.

### C) Diagnóstico y Procesos (20%)

**Mensaje:** Este bloque evalúa la capacidad técnica para entender el problema y seguir las reglas del negocio.

* **Sondeo y Recopilación de Datos (5%)** = Realiza las preguntas correctas para entender la falla, valida los datos de contacto y confirma el impacto del problema.
* **Uso de Herramientas y Gestión (10%)** = Registra el ticket correctamente en tiempo real, categoriza adecuadamente el incidente y documenta la bitácora con claridad, incluyendo registro fotográfico y anexos (diligenciar el ECS del equipo en los casos que aplique).
* **Seguridad de la Información (5%)** = Cumple con las políticas de validación de identidad del usuario antes de modificar contraseñas o accesos.

### D) Resolución en Primer Contacto - FCR (40%)

**Mensaje:** Este bloque evalúa la capacidad para resolver de manera efectiva, correcta y definitiva el incidente durante el primer contacto.

* **Efectividad Técnica (15%)** = Aplica correctamente los árboles de decisión o la base de conocimientos para brindar la solución exacta.
* **Validación de la Solución (15%)** = Realiza pruebas junto con el usuario para confirmar que el problema quedó resuelto antes de finalizar la llamada.
* **Evitación de Reincidencia / Educación (10%)** = Explica brevemente al usuario por qué ocurrió la falla o cómo prevenirla, asegurando que no vuelva a llamar por el mismo motivo y disminuyendo las reincidencias.

### E) Errores Críticos (Ítem Knockout / Zero Tolerance)

* **Maltrato al usuario** = Colgar la llamada deliberadamente, alzar la voz o mostrar grosería.
* **Información falsa / Inventar procedimientos** = Dar soluciones que puedan dañar el equipo del usuario o mentir sobre los procesos, procedimientos o tiempos de atención.
* **Incumplimiento de Seguridad** = Modificar accesos o entregar información confidencial sin validar previamente la identidad del usuario.

---

# Diseño

## 1. Logo 24h

En el logo de **24h** se puede utilizar la siguiente línea de código:

```html
<svg viewBox="0 0 160 80" xmlns="http://www.w3.org/2000/svg" width="86" height="48" aria-hidden="true">
    <defs>
        <linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#1a6fc4"></stop>
            <stop offset="100%" stop-color="#0a3a7a"></stop>
        </linearGradient>
        <linearGradient id="lg4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2589e0"></stop>
            <stop offset="100%" stop-color="#0d52a4"></stop>
        </linearGradient>
        <linearGradient id="lgh" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c8cdd6"></stop>
            <stop offset="100%" stop-color="#8a8f9a"></stop>
        </linearGradient>
    </defs>
    <text x="4" y="68" class="logo-glyph" fill="url(#lg2)">2</text>
    <text x="54" y="68" class="logo-glyph" fill="url(#lg4)">4</text>
    <text x="108" y="68" class="logo-glyph" fill="url(#lgh)">h</text>
</svg>
```

---

## 2. Footer

En la parte final quiero que exista un **footer** con las opciones de **Limpiar** e **Imprimir** el resultado generado durante la evaluación y dale la funcionalidad al limpiar de borrar lo escrito por la persona que use el evaluador y la funcionalidad al imprimir para que se imprima todo lo que se ve en el evaluador.

Puede utilizar el siguiente código:

```html
<div class="action-bar" id="actionBar" role="toolbar" aria-label="Acciones del documento">
    <button class="btn-clear" id="btnClear" type="button" title="Reiniciar todo el formulario">
        Limpiar
    </button>

    <button class="btn-print" id="btnPrint" type="button">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="4" y="2" width="12" height="9" rx="1" stroke="currentColor" stroke-width="1.6"></rect>
            <path d="M4 8H2a1 1 0 00-1 1v6a1 1 0 001 1h2" stroke="currentColor" stroke-width="1.6"></path>
            <path d="M16 8h2a1 1 0 011 1v6a1 1 0 01-1 1h-2" stroke="currentColor" stroke-width="1.6"></path>
            <rect x="4" y="12" width="12" height="6" rx="1" stroke="currentColor" stroke-width="1.6"></rect>
            <circle cx="15" cy="10.5" r="1" fill="currentColor"></circle>
        </svg>
        Imprimir
    </button>
</div>
```