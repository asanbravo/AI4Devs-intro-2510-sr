// Usamos DOMContentLoaded para asegurarnos de que el script se ejecuta
// solo después de que el HTML esté completamente cargado y parseado.
// (Aunque 'defer' en la etiqueta <script> ya ayuda mucho con esto,
// es una doble garantía y una práctica robusta).

document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleccionamos los elementos del DOM con los que vamos a interactuar
    const textInput = document.getElementById('text-input');
    const reverseButton = document.getElementById('reverse-button');
    const copyButton = document.getElementById('copy-button');
    const outputText = document.getElementById('output-text');

    /**
     * Función principal que invierte la cadena.
     */
    function handleReverse() {
        // Obtenemos el valor actual del campo de entrada
        const originalString = textInput.value;

        // La magia de invertir la cadena en JavaScript:
        // 1. .split('') -> Convierte el string en un array de caracteres: ["H", "o", "l", "a"]
        // 2. .reverse() -> Invierte el orden del array: ["a", "l", "o", "H"]
        // 3. .join('')  -> Une el array de nuevo en un string: "aloH"
        const reversedString = originalString.split('').reverse().join('');

        // Mostramos el resultado en el párrafo de salida
        outputText.textContent = reversedString;
    }

    /**
     * Función para copiar el texto invertido al portapapeles.
     */
    function handleCopy() {
        const textToCopy = outputText.textContent;

        // Verificamos que haya algo que copiar
        if (textToCopy) {
            // Usamos la API moderna del portapapeles (es asíncrona y segura)
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // Damos feedback visual al usuario cambiando el texto del botón
                    const originalText = copyButton.textContent;
                    copyButton.textContent = 'Copied! ✅';

                    // Restauramos el texto original del botón después de 2 segundos
                    setTimeout(() => {
                        copyButton.textContent = originalText;
                    }, 2000);
                })
                .catch(err => {
                    // Manejo de errores por si no se pudo copiar
                    console.error('Error al copiar el texto: ', err);
                    alert('No se pudo copiar el texto. Revisa los permisos de la página.');
                });
        }
    }

    // 2. Asignamos los "oyentes de eventos" a los botones
    // Cuando se haga clic en el botón 'reverse-button', se ejecutará la función 'handleReverse'
    reverseButton.addEventListener('click', handleReverse);

    // Cuando se haga clic en el botón 'copy-button', se ejecutará la función 'handleCopy'
    copyButton.addEventListener('click', handleCopy);

});