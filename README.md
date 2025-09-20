# challengeAmigoSecreto

Aplicación web sencilla para organizar un *Amigo Secreto*. Permite agregar nombres, listarlos y realizar el sorteo aleatorio de una persona. Este README es el punto de partida para entender, ejecutar y mantener el proyecto.

> **Nota:** Este repositorio está pensado para fines educativos. El objetivo es practicar JavaScript (DOM, eventos y lógica) con buenas prácticas de accesibilidad y UX.

---

## Tabla de contenido
- [Demo rápida](#demo-rápida)
- [Características](#características)
- [Instalación](#instalación)
- [Dependencias](#dependencias)
- [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
- [Uso](#uso)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Decisiones de diseño](#decisiones-de-diseño)
- [Accesibilidad](#accesibilidad)
- [Pruebas manuales (checklist)](#pruebas-manuales-checklist)
- [Solución de problemas](#solución-de-problemas)
- [Roadmap](#roadmap)

---

## Demo rápida

1. Abre `index.html` en tu navegador o levanta un servidor local (ver [Cómo ejecutar](#cómo-ejecutar-el-proyecto)).  
2. Escribe un nombre y presiona **Añadir** (o Enter).  
3. Repite con varios nombres.  
4. Haz clic en **Sortear amigo** para ver el resultado.

---

## Características

-  **Agregar nombres** con validación:
  - Recorta espacios y colapsa espacios múltiples.
  - Formatea cada nombre en *Title Case* básico (p. ej. `juan pérez` → `Juan Pérez`).
-  **Evita duplicados** sin distinguir mayúsculas **ni acentos** (`José` = `Jose`).
-  **Eliminar** cualquier nombre desde la lista (botón `×` en cada elemento).
-  **Persistencia** automática en `localStorage` (no pierdes la lista al recargar).
-  **Atajos**: `Enter` agrega; `Ctrl + Backspace` limpia el campo.
-  **Sorteo uniforme** con retroalimentación visual (micro-animación).
-  **Accesible**: roles ARIA, mensajes en vivo y foco gestionado.

---

## Instalación

No requiere compilación ni *build*. Descarga o clona el repositorio y listo.

```bash
# Clonar
git clone git@github.com:tu-usuario/amigo-secreto.git
cd amigo-secreto

# (Opcional) Instala un servidor estático si deseas
```

---

## Dependencias

- **Obligatorias**: Un navegador moderno (Chrome/Firefox/Edge/Safari).  
- **Opcionales** (para servir el sitio en localhost):
  - Extensión *Live Server* en VS Code **o**
  - Cualquier servidor HTTP estático.

> No se usan frameworks ni paquetes externos; solo HTML, CSS y JS.

---

## Cómo ejecutar el proyecto

**Opción 1: Navegador**
Abre `index.html` con doble clic en tu navegador.


**Opción 2: VS Code – Live Server**  
Clic derecho sobre `index.html` → *Open with Live Server*.

---

## Uso

1. Escribe un nombre en el campo de texto y presiona **Añadir** (o Enter).  
2. Repite para construir la lista.  
3. Presiona **Sortear amigo** para seleccionar un ganador al azar.  
4. Puedes eliminar cualquier nombre con el botón `×`.  
5. La lista queda guardada en `localStorage` del navegador.

---

## Estructura del proyecto

```
.
├── assets/
│   ├── amigo-secreto.png
│   └── play_circle_outline.png
├── app.js          # Lógica principal (DOM + validaciones + sorteo + persistencia)
├── index.html      # Estructura del documento
├── style.css       # Estilos base + micro estilos para botones/animación
└── README.md
```

---

## Decisiones de diseño

- **Normalización de nombres**: se recortan espacios y se aplica *Title Case* para consistencia visual.  
- **Comparación sin acentos**: al validar duplicados, se eliminan diacríticos (`Á` = `A`) para un flujo más humano.  
- **Persistencia local**: `localStorage` evita perder datos al recargar.  
- **UI reactiva**: re-render con `DocumentFragment` para minimizar reflows.  
- **Exposición mínima**: solo se exponen `agregarAmigo()` y `sortearAmigo()` al `window` porque el HTML original los invoca vía `onclick`.

---

## Accesibilidad

- Se usan roles adecuados y `aria-live` para el resultado.  
- En errores (nombre vacío o duplicado), se devuelve el foco al campo y se selecciona el texto cuando corresponde.  
- Botones con `aria-label` para acciones contextuales (eliminar).

---

## Pruebas manuales (checklist)

- [ ] Agregar un nombre válido lo muestra en la lista.  
- [ ] Un nombre vacío o con solo espacios muestra alerta.  
- [ ] Nombres duplicados (con o sin acentos y mayúsculas) se rechazan.  
- [ ] Eliminar un nombre lo quita de la lista correctamente.  
- [ ] Tras recargar la página, la lista se conserva (localStorage).  
- [ ] El sorteo muestra un ganador cuando hay al menos un nombre.  
- [ ] `Enter` agrega; `Ctrl + Backspace` limpia el input.  
- [ ] Navegación por teclado accesible (foco visible y orden lógico).

---

## Solución de problemas

**No se cargan fuentes o estilos al abrir con doble clic**  
Algunos navegadores tienen políticas estrictas al abrir archivos locales. Usa un servidor local (ver sección *Cómo ejecutar*).

**No se guardan los nombres**  
Revisa si estás en modo incógnito/restricción de cookies; `localStorage` puede estar deshabilitado.

**El sorteo no hace nada**  
Asegúrate de tener al menos un nombre en la lista.

**Aparece el mismo nombre dos veces en la lista**  
La app no inserta duplicados equivalentes; si ocurre, revisa si se editaron archivos y valida con la checklist.

---

## Roadmap

- Exportar/Importar lista en JSON.  
- Estado de “último ganador” y evitar repeticiones consecutivas.  
- Tests automatizados (Playwright/Cypress) para flujo básico.  
- Soporte multi-sorteo (grupos).

