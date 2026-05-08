# Diseño: Eduardo 3D Portfolio - Dark Cinematic Redesign

## 1. Visión General
Transformación del portafolio actual de Eduardo (Generalista 3D) hacia una estética **Dark Cinematic**. El objetivo es utilizar heurísticas modernas de diseño para maximizar el impacto visual de los modelos 3D y turntables 360, manteniendo la paleta de colores original (Negro/Rojo).

## 2. Dirección Estética
- **Estilo:** Dark Cinematic / AAA Gaming.
- **Atmósfera:** Fondos profundos, sombras dramáticas y enfoque total en el sujeto.
- **Tipografía:**
  - Títulos: `Bebas Neue` (impacto cinematográfico).
  - Cuerpo/Navegación: `Oswald` (estilo técnico moderno).
- **Paleta de Colores:**
  - Fondo: `#020202` (Negro profundo).
  - Acento: `#6d0f0f` (Rojo Eduardo).
  - Texto: `#ffffff` (Blanco) y `#cccccc` (Gris secundario).

## 3. Componentes Clave

### 3.1 Navegación (Floating Glassmorphism)
- **Estructura:** Barra flotante centrada en la parte superior.
- **Efectos:** `backdrop-filter: blur(20px)`, transparencia del 80%.
- **Bordes:** Bordes finos (1px) con un sutil resplandor rojo al interactuar.
- **Comportamiento:** Se encoge suavemente al hacer scroll para maximizar la inmersión.

### 3.2 Galería de Proyectos (Immersive Dark Grid)
- **Layout:** Cuadrícula de tarjetas con espaciado optimizado.
- **Filtrado:** Barra de filtros interactiva `[All] [Modeling] [VFX / Animation] [Texturing]`.
- **Interacción (Hover):**
  - La imagen estática hace un fundido cruzado (cross-fade) hacia el turntable 360 (video).
  - La tarjeta escala ligeramente (`scale(1.03)`).
  - Aparece un gradiente radial sutil de color rojo detrás del personaje para simular "rim lighting".
- **Visuales:** Eliminación de bordes duros; uso de sombras suaves para profundidad.

### 3.3 Dev Hub (Bento Grid UI-UX)
- **Estilo:** Limpio, técnico, inspirado en el diseño de Apple/SaaS.
- **Layout:** Cuadrícula asimétrica (Bento Style) con tarjetas de diferentes tamaños.
- **Contenido:** Capturas de pantalla de UI, prototipos interactivos, flujos de UX.
- **Transición:** Cambio de tema visual (de acentos rojos a azules/grises) al activar el modo Dev.

### 3.4 Portal de Entrada (Split Portal)
- **Concepto:** Pantalla inicial de pantalla completa para elegir el portafolio.
- **Diseño:** División vertical (50/50) con animaciones coordinadas.
- **Visuales:** 
  - Lado Izquierdo (3D Art): Fondo oscuro, acentos rojos, imagen de render con efecto glitch.
  - Lado Derecho (Dev Lab): Fondo técnico, acentos azules, rejilla de datos o código.
- **Interacción:** Al hacer clic, el lado seleccionado se expande y el overlay desaparece con un fundido premium.

## 4. Heurísticas Aplicadas
- **Enfoque en el Sujeto:** Eliminación de ruido visual para que el arte 3D sea el protagonista.
- **Consistencia Estética:** Alineación de todos los elementos (botones, inputs, iconos) con el estilo cinematográfico.
- **Reducción de Carga Cognitiva:** Navegación minimalista y agrupamiento lógico de software y habilidades.

## 5. Próximos Pasos
1. Implementar la nueva estructura CSS para el grid inmersivo.
2. Refactorizar la Navbar al estilo Glassmorphism.
3. Aplicar las transiciones refinadas para los turntables.
