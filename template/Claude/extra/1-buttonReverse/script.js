// Función para invertir una cadena de texto
function reverseString(str) {
    return str.split('').reverse().join('');
}

// Referencias a los elementos del DOM
const inputText = document.getElementById('inputText');
const reverseBtn = document.getElementById('reverseBtn');
const buttonContainer = document.getElementById('buttonContainer');
const resultText = document.getElementById('resultText');
const copyBtn = document.getElementById('copyBtn');

// Event listener para mostrar/ocultar el botón según la longitud del texto
inputText.addEventListener('input', function() {
    const text = inputText.value;

    // Mostrar el botón solo si hay más de 3 letras
    if (text.length > 3) {
        buttonContainer.classList.remove('hidden');
    } else {
        buttonContainer.classList.add('hidden');
    }
});

// Event listener para el botón de reverse
reverseBtn.addEventListener('click', function() {
    const text = inputText.value;

    if (text.trim() === '') {
        resultText.textContent = '';
        copyBtn.classList.add('hidden');
        return;
    }

    const reversed = reverseString(text);
    resultText.textContent = reversed;
    copyBtn.classList.remove('hidden');
});

// Event listener para detectar Enter en el input
inputText.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && inputText.value.length > 3) {
        reverseBtn.click();
    }
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