/* Reverse String – lógica JS
   Buenas prácticas:
   - No se contamina el global (IIFE).
   - Accesibilidad: aria-live para el resultado, deshabilitar/rehabilitar botón Copy.
   - Manejo de teclado (Enter).
   - Portapapeles con Clipboard API + pequeño fallback.
*/
(() => {
  "use strict";

  // --- Utilidades ---
  /** Invierte una cadena respetando pares sustitutos (emoji/letras compuestas).
   *  Nota: [...str] itera por code points (mejor que split(''))
   */
  function reverseString(str) {
    return [...str].reverse().join("");
  }

  async function copyToClipboard(text) {
    if (!text) return false;

    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback (puede no funcionar en contextos sin permisos)
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch { ok = false; }
      document.body.removeChild(ta);
      return ok;
    }
  }

  // --- DOM ---
  const $input = document.getElementById("inputText");
  const $result = document.getElementById("result");
  const $reverse = document.getElementById("reverseBtn");
  const $copy = document.getElementById("copyBtn");

  function updateButtons() {
    const hasText = $result.textContent.trim().length > 0;
    $copy.disabled = !hasText;
  }

  function doReverse() {
    const text = $input.value ?? "";
    const reversed = reverseString(text);
    $result.textContent = reversed;
    updateButtons();
  }

  async function doCopy() {
    const text = $result.textContent;
    const original = $copy.innerHTML;
    const ok = await copyToClipboard(text);
    // feedback visual corto
    $copy.innerHTML = ok ? "✅ Copied!" : "⚠️ Failed";
    setTimeout(() => { $copy.innerHTML = original; }, 1200);
  }

  // Eventos
  $reverse.addEventListener("click", doReverse);
  $input.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      doReverse();
    }
  });
  $copy.addEventListener("click", doCopy);

  // Estado inicial (como en el screenshot)
  doReverse();
})();