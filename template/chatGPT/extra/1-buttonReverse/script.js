/* Implementación 1: el botón Reverse aparece solo si hay >3 caracteres.
   El resultado NO es en tiempo real; se calcula con botón o Enter. */
(() => {
  "use strict";

  // --- Utilidades ---
  function reverseString(str) {
    return [...str].reverse().join(""); // maneja emojis/code points
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

  // --- DOM ---
  const $input   = document.getElementById("inputText");
  const $reverse = document.getElementById("reverseBtn");
  const $result  = document.getElementById("result");
  const $copy    = document.getElementById("copyBtn");

  function toggleReverseVisibility() {
    const show = ($input.value || "").length > 3;
    $reverse.classList.toggle("hidden", !show);
    $reverse.setAttribute("aria-hidden", show ? "false" : "true");
  }

  function updateCopyState() {
    $copy.disabled = !$result.textContent.trim();
  }

  function compute() {
    const reversed = reverseString($input.value || "");
    $result.textContent = reversed;
    updateCopyState();
  }

  async function onCopy() {
    const original = $copy.innerHTML;
    const ok = await copyToClipboard($result.textContent);
    $copy.innerHTML = ok ? "✅ Copied!" : "⚠️ Failed";
    setTimeout(() => ($copy.innerHTML = original), 1200);
  }

  // Eventos
  $input.addEventListener("input", toggleReverseVisibility); // solo muestra/oculta botón
  $input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !$reverse.classList.contains("hidden")) {
      e.preventDefault();
      compute();
    }
  });
  $reverse.addEventListener("click", compute);
  $copy.addEventListener("click", onCopy);

  // Estado inicial: ajustar visibilidad de botón; aún no calcula
  toggleReverseVisibility();
})();