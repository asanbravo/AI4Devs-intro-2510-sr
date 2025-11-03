/* Implementación 2: inversión en TIEMPO REAL (no depende del botón).
   No contiene ninguna lógica de visibilidad condicional del botón. */
(() => {
  "use strict";

  function reverseString(str) {
    return [...str].reverse().join("");
  }

  async function copyToClipboard(text) {
    if (!text) return false;
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
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

  const $input  = document.getElementById("inputText");
  const $result = document.getElementById("result");
  const $reverse = document.getElementById("reverseBtn");
  const $copy   = document.getElementById("copyBtn");

  function render() {
    const val = $input.value || "";
    $result.textContent = reverseString(val);
    $copy.disabled = !$result.textContent.trim();
  }

  async function onCopy() {
    const original = $copy.innerHTML;
    const ok = await copyToClipboard($result.textContent);
    $copy.innerHTML = ok ? "✅ Copied!" : "⚠️ Failed";
    setTimeout(() => ($copy.innerHTML = original), 1200);
  }

  // Tiempo real
  $input.addEventListener("input", render);

  // El botón existe pero es opcional; por consistencia, también recalcula
  $reverse.addEventListener("click", render);

  $copy.addEventListener("click", onCopy);

  // Estado inicial (con el valor por defecto del input)
  render();
})();