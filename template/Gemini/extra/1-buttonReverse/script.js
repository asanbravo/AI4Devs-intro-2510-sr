document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleccionamos los elementos del DOM
    const textInput = document.getElementById('text-input');
    const reverseButton = document.getElementById('reverse-button');
    const copyButton = document.getElementById('copy-button');
    const outputText = document.getElementById('output-text');

    /**
     * Función que se ejecuta al hacer CLIC en el botón Reverse.
     * (Esta es la lógica original)
     */
    function handleReverse() {
        const originalString = textInput.value;
        const reversedString = originalString.split('').reverse().join('');
        outputText.textContent = reversedString;
    }

    /**
     * Función que se ejecuta al ESCRIBIR en el input.
     * (Esta es la nueva lógica para la especificación 1)
     */
    function handleTextInputChange() {
        const currentLength = textInput.value.length;

        // Comprobamos la longitud para mostrar u ocultar el botón
        if (currentLength > 3) {
            reverseButton.style.display = 'inline-block'; // 'inline-block' respeta padding/margin
        } else {
            reverseButton.style.display = 'none';
        }
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

    // Listener para el botón de invertir (lógica original)
    reverseButton.addEventListener('click', handleReverse);

    // Listener para el botón de copiar (lógica original)
    copyButton.addEventListener('click', handleCopy);

    // NUEVO listener: se activa cada vez que el usuario teclea
    textInput.addEventListener('input', handleTextInputChange);

});