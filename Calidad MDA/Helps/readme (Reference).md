# Funcionalidades del Proyecto

## 1. Funcionalidad del campo **"[Seleccione una Fecha]"**

El campo **Fecha** deberá establecer automáticamente la fecha correspondiente al día en que se abra el formulario.

Adicionalmente, deberá contar con un ícono de calendario que permita al usuario seleccionar manualmente una fecha diferente cuando sea necesario.

---

## 2. Funcionalidad del campo **"[Seleccione un Analista]"**

Este campo será una lista desplegable (Select) que permitirá seleccionar el analista responsable del caso.

En el apartado **"Mesa de Ayuda de Tecnología - Basado en Requerimiento R-000000"**, específicamente en el campo **"Analista del Caso"**, únicamente deberán mostrarse los siguientes nombres:

1. Juan Diego Mazo Lezcano
2. Juan José Santana Garzón
3. Juan Pablo Gaviria Correa
4. Julián García Araque
5. Kevin Daniel Mosquera
6. William David Jarava Solano
7. Yin Carlos Martínez Pérez

No se deberá mostrar información adicional, únicamente el nombre del analista seleccionado.

---

## 3. Funcionalidad del campo **"[Seleccione un Estado]"**

Este campo será una lista desplegable (Select) que permitirá seleccionar el estado actual del caso.

En el apartado **"Mesa de Ayuda de Tecnología - Basado en Requerimiento R-000000"**, específicamente en el campo **"Estado del Caso"**, deberán existir las siguientes opciones:

| Estado    | Color      |
| --------- | ---------- |
| Abierto   | 🔴 Rojo    |
| Pendiente | 🟠 Naranja |
| Cerrado   | 🟢 Verde   |

Al seleccionar un estado, el texto deberá mostrarse utilizando el color correspondiente para facilitar su identificación visual.

---

## 4. Sincronización automática del ID del caso

En el apartado **"Mesa de Ayuda de Tecnología - Basado en Requerimiento R-000000"** existe el campo **"ID Caso Evaluado"**.

La funcionalidad deberá sincronizar automáticamente el identificador del requerimiento mostrado en el encabezado.

Por ejemplo:

Si inicialmente se muestra:

> Basado en Requerimiento **R-000000**

y el usuario escribe:

> **R-166015**

en el campo **ID Caso Evaluado**, el encabezado deberá actualizarse automáticamente para mostrar:

> Basado en Requerimiento **R-166015**

La actualización deberá realizarse en tiempo real mientras el usuario modifica el identificador.

---

## 5. Funcionalidad del apartado **"Peso (%)"**

La columna **Peso (%)** deberá contener valores fijos, definidos previamente según cada criterio de evaluación.

Estos valores no podrán ser modificados por el usuario.

Además, deberán utilizarse para calcular automáticamente el porcentaje obtenido en el apartado **"Total de Calidad de la Información"**.

---

## 6. Funcionalidad del apartado **"Calificación (0 a 1)"**

Cada criterio de evaluación deberá contar con una lista desplegable (Select) con las siguientes opciones:

* **1**
* **0**

El comportamiento será el siguiente:

* Si el usuario selecciona **1**, el criterio obtendrá el **100 % del peso asignado**.
* Si el usuario selecciona **0**, el criterio obtendrá un **0 %**.

Por ejemplo:

| Peso (%) | Calificación | Puntaje Logrado |
| -------: | :----------: | --------------: |
|     10 % |       1      |            10 % |
|     10 % |       0      |             0 % |

Cada cambio deberá actualizar automáticamente los cálculos generales del formulario.

---

## 7. Funcionalidad del apartado **"Puntaje Logrado"**

La columna **Puntaje Logrado** deberá calcularse automáticamente según el valor seleccionado en la columna **Calificación (0 a 1)**.

El cálculo será el siguiente:

* Si la calificación es **1**, el puntaje logrado será igual al valor del **Peso (%)**.
* Si la calificación es **0**, el puntaje logrado será **0 %**.

Finalmente, todos los valores de la columna **Puntaje Logrado** deberán sumarse automáticamente para obtener el resultado mostrado en el apartado **"Total de Calidad de la Información"**.

Todas las operaciones deberán actualizarse en tiempo real sin necesidad de recargar el formulario.

---

# Diseño

## 1. Logo "24h"

El encabezado deberá incluir el logotipo **24h**, el cual puede implementarse utilizando el siguiente código SVG:

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

Al final del formulario deberá existir un **footer** con una barra de acciones que incluya los botones:

* **Limpiar**
* **Imprimir**

### Botón "Limpiar"

Este botón deberá restablecer completamente el formulario a su estado inicial, eliminando toda la información ingresada por el usuario, incluyendo:

* Fecha seleccionada manualmente.
* Analista.
* Estado.
* ID del caso.
* Todas las calificaciones.
* Todos los cálculos automáticos.
* Cualquier otro dato diligenciado durante la evaluación.

### Botón "Imprimir"

Este botón deberá abrir el cuadro de impresión del navegador e imprimir exactamente el contenido visible del evaluador, respetando el diseño, la distribución de los elementos y los estilos aplicados.

Puede utilizarse como base el siguiente código HTML:

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
---