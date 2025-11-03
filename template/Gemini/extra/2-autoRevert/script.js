document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleccionamos los elementos del DOM
    const textInput = document.getElementById('text-input');
    const copyButton = document.getElementById('copy-button');
    const outputText = document.getElementById('output-text');

    // El 'reverseButton' y 'handleReverse' han sido eliminados.

    /**
     * Función que se ejecuta al ESCRIBIR en el input.
     * (Esta es la lógica para la especificación 2)
     */
    function handleRealTimeReverse() {
        const originalString = textInput.value;

        // Invertimos la cadena directamente en tiempo real
        const reversedString = originalString.split('').reverse().join('');

        // Mostramos el resultado
        outputText.textContent = reversedString;
    }

    /**
     * Función para copiar el texto invertido al portapapeles.
     * (Sin cambios)
     */
    function handleCopy() {
        const textToCopy = outputText.textContent;

        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    const originalText = copyButton.textContent;
                    copyButton.textContent = 'Copied! ✅';
                    setTimeout(() => {
                        copyButton.textContent = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Error al copiar el texto: ', err);
                });
        }
    }

    // 2. Asignamos los "oyentes de eventos"

    // Listener para el botón de copiar (lógica original)
    copyButton.addEventListener('click', handleCopy);

    // NUEVO listener: se activa cada vez que el usuario teclea
    // y ejecuta la inversión directamente.
    textInput.addEventListener('input', handleRealTimeReverse);

});