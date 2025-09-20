/* 
  Lógica del desafío "Amigo Secreto"
  Autor: Kary :)
  Notas de diseño:
   - Validación robusta (trim, espacios múltiples, duplicados insensibles a mayúsculas y acentos).
   - Render de lista performante y accesible (roles/aria y botones para eliminar).
   - Persistencia en localStorage para no perder los nombres al recargar.
   - Atajos de UX: Enter para agregar, Ctrl+Backspace para limpiar el input.
*/
const normalizarNombre = (txt) => {
  if (typeof txt !== "string") return "";
  // trim + colapsa espacios
  let t = txt.trim().replace(/\s+/g, " ");
  if (!t) return "";
  // Pasar a minúsculas excepto primeras letras (Title Case sencillo)
  t = t
    .toLowerCase()
    .split(" ")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
  return t;
};

/** Elimina acentos para comparar sin tildes */
const quitarAcentos = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/** Compara nombres sin distinguir mayúsculas/acentos */
const igualesSinAcentos = (a, b) =>
  quitarAcentos(a).toLowerCase() === quitarAcentos(b).toLowerCase();

// --- Estado ---
const STORAGE_KEY = "amigo-secreto:nombres";
/** @type {string[]} */
let amigos = [];

const $ = (sel) => document.querySelector(sel);
const input = $("#amigo");
const ulLista = $("#listaAmigos");
const ulResultado = $("#resultado");

// Carga inicial desde localStorage
try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw){
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) amigos = parsed.filter(Boolean);
    }
} catch (_) {}

// Render
function renderLista() {
    //vaciamos primero
    ulLista.innerHTML = "";
    if (amigos.length === 0) {
        ulLista.innerHTML = `<li class="name-item name-item--hint">Aún no hay nombres. ¡Agrega el primero!</li>`;
        return;
    }

// fragmentar para evitar errores
const frag = document.createDocumentFragment();
amigos.forEach((nombre, idx) => {
    const li = document.createElement("li");
    li.className = "name-item";
    li.setAttribute("role", "listem");

    const span = document.createElement("span");
    span.textContent = nombre;
    span.className = "name-item__text";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "name-item__remove";
    btn.ariaLabel = `Eliminar ${nombre}`;
    btn.textContent = "x";
    btn.addEventListener("click", () => {
        amigos.splice(idx, 1);
        persistir();
        renderLista();
        //Si quitamos al ultimo amigo mostrado como resultado limpiamos
        if (ulResultado.firstChild) ulResultado.innerHTML = "";
        input.focus();
    });

})
}
