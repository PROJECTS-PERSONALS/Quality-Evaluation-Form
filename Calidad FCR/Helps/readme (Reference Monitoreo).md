# Funcionalidades adicionales del proyecto

## 1. Nuevos botones en el footer

Quiero agregar dos nuevos botones al **footer** del proyecto original, complementando los botones existentes (**Limpiar** e **Imprimir**).

### Botón **Guardar**

Este botón será el encargado de almacenar los resultados obtenidos durante una evaluación realizada en el formulario principal **"Formato de Evaluación de la Calidad y FCR - Mesa de Ayuda"**.

Al presionarlo deberá:

* Guardar el porcentaje obtenido en **"Resumen de Puntuación (2)"**, específicamente el valor mostrado en **"Puntuación Final (%)"**.
* Asociar automáticamente dicho resultado con el analista seleccionado en **"Nombre del Agente"**.
* Registrar el porcentaje en el siguiente espacio disponible dentro del apartado **"Monitoreo de Llamadas"**, iniciando desde **Monitoreo 1** y continuando consecutivamente hasta **Monitoreo 5**.
* Evitar sobrescribir monitoreos previamente almacenados. Cada nuevo registro deberá ocupar la siguiente columna disponible.

---

### Botón **Monitoreo**

Este botón permitirá navegar desde el formulario principal hacia el nuevo módulo **"Monitoreo de Llamadas"**.

Su función será mostrar un resumen consolidado de todos los monitoreos registrados para cada analista, permitiendo visualizar el desempeño acumulado de manera rápida y organizada.

---

# 2. Creación del módulo **"Monitoreo de Llamadas"**

Se deberá crear un nuevo apartado denominado **"Monitoreo de Llamadas"**, tomando como referencia:

* La imagen **Design Reference (Monitoreo)** para replicar el diseño visual.
* El archivo **Formato Evaluación Calidad y FCR (Monitoreo).xlsx** para comprender la estructura, cálculos y organización de la información.

El objetivo es obtener una réplica prácticamente idéntica al formato mostrado en las referencias, tanto en apariencia como en comportamiento.

---

# 3. Funcionalidad de los apartados **"Monitoreo 1"** a **"Monitoreo 5"**

Las columnas **Monitoreo 1**, **Monitoreo 2**, **Monitoreo 3**, **Monitoreo 4** y **Monitoreo 5** deberán almacenar los resultados obtenidos durante las evaluaciones realizadas en el formulario principal.

Cada vez que el evaluador presione el botón **Guardar**, deberá registrarse automáticamente el valor correspondiente a **"Puntuación Final (%)"** del apartado **"Resumen de Puntuación (2)"**.

El almacenamiento deberá seguir las siguientes reglas:

* Cada analista contará con un máximo de **cinco monitoreos**.
* Los registros deberán llenarse de forma secuencial.
* El primer monitoreo se almacenará en **Monitoreo 1**.
* El segundo en **Monitoreo 2**.
* Y así sucesivamente hasta **Monitoreo 5**.

Cada porcentaje deberá almacenarse únicamente en la fila correspondiente al analista evaluado.

Ejemplo:

| Analista        | Monitoreo 1 | Monitoreo 2 | Monitoreo 3 |
| --------------- | ----------: | ----------: | ----------: |
| Juan Diego Mazo |         95% |         90% |         88% |

---

# 4. Sincronización entre ambos módulos

Debe existir una sincronización automática entre:

* **Formato de Evaluación de la Calidad y FCR - Mesa de Ayuda**
* **Monitoreo de Llamadas**

Cuando el evaluador seleccione un analista en el apartado **Información General (Datos de Control)**, específicamente en el campo **"Nombre del Agente"**, todas las operaciones realizadas deberán asociarse exclusivamente a dicho analista.

Esto significa que:

* El porcentaje obtenido durante la evaluación se almacenará únicamente en la fila correspondiente a ese analista.
* Ningún monitoreo podrá registrarse en otro analista diferente.
* Cada analista mantendrá su propio historial de evaluaciones.

Esta relación deberá realizarse automáticamente, sin requerir intervención adicional del usuario.

---

# 5. Cálculo del **Promedio Individual**

Cada fila correspondiente a un analista deberá calcular automáticamente el promedio de los cinco monitoreos registrados.

El cálculo deberá realizarse utilizando únicamente los monitoreos existentes.

Por ejemplo:

|  M1 |  M2 |  M3 |   M4 |  M5 | Promedio |
| --: | --: | --: | ---: | --: | -------: |
| 95% | 90% | 85% | 100% | 80% |      90% |

Este valor deberá mostrarse automáticamente en la columna **"Promedio Individual"**.

---

# 6. Cálculo del **Promedio Grupal**

En la última fila de la tabla deberá existir el apartado **"Promedio Grupal"**.

Este valor corresponderá al promedio obtenido por todos los analistas para cada columna de monitoreo.

Por ejemplo:

| Concepto             | Resultado |
| -------------------- | --------: |
| Promedio Monitoreo 1 |       92% |
| Promedio Monitoreo 2 |       90% |
| Promedio Monitoreo 3 |       88% |
| Promedio Monitoreo 4 |       91% |
| Promedio Monitoreo 5 |       89% |

Todos estos cálculos deberán actualizarse automáticamente cada vez que se registre un nuevo monitoreo.

---

# 7. Cálculo del apartado **"Estatus / Nota"**

La columna **"Estatus / Nota"** deberá mostrar la calificación final correspondiente a cada analista.

Este valor deberá calcularse utilizando el promedio de los cinco monitoreos registrados para dicho analista.

De igual forma, la fila **"Promedio Grupal"** deberá mostrar el promedio general obtenido a partir de los cinco monitoreos grupales.

Todos estos cálculos deberán actualizarse automáticamente cada vez que se agregue un nuevo monitoreo.

---

# Reglas generales

Para garantizar la consistencia de la información, deberán cumplirse las siguientes reglas:

* Cada analista podrá almacenar un máximo de **cinco monitoreos**.
* Ningún monitoreo podrá sobrescribir otro existente, salvo que posteriormente se implemente una funcionalidad específica de edición o reemplazo.
* Todos los cálculos deberán ejecutarse automáticamente en tiempo real.
* La información almacenada deberá mantenerse sincronizada entre el formulario principal y el módulo **Monitoreo de Llamadas**.
* El diseño visual del nuevo módulo deberá replicar fielmente la referencia proporcionada, respetando colores, tipografía, bordes, alineación, tamaños y distribución de los elementos.

Con estas funcionalidades, el sistema permitirá no solo evaluar una llamada de forma individual, sino también llevar un historial de desempeño por analista, calcular promedios individuales y grupales, y disponer de un panel de seguimiento que facilite el monitoreo continuo de la calidad del servicio.