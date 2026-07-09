# Funcionalidades del Proyecto.
1. Creación de una pantalla de inicio (Login de selección de evaluador)

Se deberá desarrollar una pantalla de bienvenida que actuará como punto de entrada a los diferentes módulos de evaluación del sistema.

Esta pantalla tendrá como objetivo permitir que el evaluador seleccione el tipo de evaluación que desea realizar antes de ingresar al formulario correspondiente.

Mensaje de bienvenida

En la parte central de la pantalla deberá mostrarse el siguiente mensaje:

¡Bienvenido, Evaluador!
¿Qué evaluaremos hoy?

Este mensaje deberá ser el elemento principal de la interfaz y captar la atención del usuario al iniciar la aplicación.

Opciones de evaluación

Debajo del mensaje de bienvenida deberán mostrarse dos tarjetas (Cards) o cuadros interactivos con el siguiente contenido:

Calidad y FCR

Al hacer clic sobre esta opción, el sistema deberá abrir el proyecto correspondiente en una nueva pestaña del navegador.

La navegación deberá apuntar al siguiente proyecto:

HTML: ../Calidad y FCR/Project N/index nuevo.html
JavaScript: ../Calidad y FCR/Project N/script nuevo.js
Calidad MDA

Al hacer clic sobre esta opción, el sistema deberá abrir el proyecto correspondiente en una nueva pestaña del navegador.

La navegación deberá apuntar al siguiente proyecto:

HTML: ../Calidad MDA/Project/index.html
CSS: ../Calidad MDA/Project/styles.css
JavaScript: ../Calidad MDA/Project/script.js
Diseño de las tarjetas

Cada opción deberá presentarse como una tarjeta interactiva con un diseño moderno y profesional.

Las tarjetas deberán incluir:

Título claramente visible.
Bordes suaves.
Sombras sutiles.
Cursor tipo pointer.
Efecto hover.
Animaciones suaves.
Transiciones fluidas.
Retroalimentación visual al pasar el cursor o hacer clic.

El objetivo es ofrecer una experiencia intuitiva y agradable para el evaluador.

2. Animaciones de la pantalla de bienvenida

La pantalla de inicio deberá contar con animaciones que mejoren la experiencia del usuario sin afectar el rendimiento de la aplicación.

Animación del mensaje principal

El mensaje:

¡Bienvenido, Evaluador! ¿Qué evaluaremos hoy?

deberá aparecer mediante una animación de entrada.

El comportamiento esperado es el siguiente:

Iniciar con un tamaño reducido.
Aumentar suavemente de tamaño hasta alcanzar su dimensión final (efecto Zoom In).
Simultáneamente, aparecer con una transición gradual de opacidad (Fade In).
La animación deberá ejecutarse únicamente al cargar la pantalla.

El resultado debe transmitir una sensación elegante y profesional, dando protagonismo al mensaje de bienvenida.

Animación de las tarjetas

Las dos tarjetas (Calidad y FCR y Calidad MDA) deberán aparecer inmediatamente después de la animación del mensaje principal.

Su animación deberá seguir el siguiente comportamiento:

Iniciar completamente transparentes (opacidad 0).
Aparecer progresivamente mediante un efecto Fade In.
Incorporar un ligero desplazamiento vertical hacia arriba (Fade Up) para aportar mayor dinamismo.
Ambas tarjetas pueden aparecer de forma simultánea o con un pequeño retraso entre ellas para crear un efecto de secuencia.
Animaciones al interactuar

Al pasar el cursor sobre cualquiera de las tarjetas se deberán aplicar animaciones adicionales, tales como:

Ligero aumento de tamaño (Scale).
Incremento sutil de la sombra.
Transición fluida de los colores o del fondo (si aplica).
Cambio del cursor a pointer.

Al hacer clic sobre una tarjeta, esta deberá responder visualmente mediante una pequeña animación (por ejemplo, una leve reducción de escala o efecto de presión) antes de redirigir al usuario al módulo correspondiente.

Objetivo

El objetivo de esta pantalla es ofrecer un menú de acceso elegante, moderno e intuitivo, que permita al evaluador seleccionar rápidamente el tipo de evaluación que desea realizar.

La interfaz debe transmitir profesionalismo y mantener una experiencia de usuario fluida, utilizando animaciones sutiles, transiciones suaves y un diseño visual atractivo, sirviendo como punto de entrada a los módulos Calidad y FCR y Calidad MDA.