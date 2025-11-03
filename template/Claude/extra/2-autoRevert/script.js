// Función para invertir una cadena de texto
function reverseString(str) {
    return str.split('').reverse().join('');
}

// Referencias a los elementos del DOM
const inputText = document.getElementById('inputText');
const resultText = document.getElementById('resultText');
const copyBtn = document.getElementById('copyBtn');

// Event listener para invertir el texto en tiempo real
inputText.addEventListener('input', function() {
    const text = inputText.value;

    // Si el campo está vacío, limpiar el resultado
    if (text.trim() === '') {
        resultText.textContent = '';
        copyBtn.classList.add('hidden');
        return;
    }

    // Invertir el texto automáticamente
    const reversed = reverseString(text);
    resultText.textContent = reversed;
    copyBtn.classList.remove('hidden');
});

// Event listener para el botón de copiar
copyBtn.addEventListener('click', function() {
    const textToCopy = resultText.textContent;

    // Copiar al portapapeles
    navigator.clipboard.writeText(textToCopy).then(function() {
        // Feedback visual
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied! ✓';
        copyBtn.style.backgroundColor = '#10b981';

        setTimeout(function() {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = '#6b7280';
        }, 2000);
    }).catch(function(err) {
        console.error('Error al copiar: ', err);
    });
});