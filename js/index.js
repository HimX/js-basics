/**
 * Determina si una palabra es palíndromo o no
 * @param {string} word 
 * @returns boolean
 */
function isPalindrome(word) {
    const wordWithoutSpaces = word
        .replace(/[\s\,\:\.\;\?\¿\!\¡\"\'\“\”]/g, "")
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");
    const wordWithoutSpacesReversed = wordWithoutSpaces
        .split('')
        .reverse()
        .join('');

    return wordWithoutSpaces.toUpperCase() === wordWithoutSpacesReversed.toUpperCase();
};

/**
 * Muestran en pantalla el resultado de la función isPalindrome
 * @returns 
 */
function printIsPalindrome() {
    const palindrome = document.querySelector('#palindrome'),
        result = document.querySelector('#is-palindrome-result');

    if (palindrome.value === "") {
        result.textContent = "❌ La cadena está vacía.";
        return;
    }

    if (isPalindrome(palindrome.value)) {
        result.textContent = "✅ Sí es un palíndromo.";
        return;
    }

    result.textContent = "❌ No es un palíndromo.";
}

/**
 * Retorna el mayor de dos números
 * @param {Number} num1 
 * @param {Number} num2 
 * @returns The greater number
 */
function greater(num1, num2) {
    if (num1 > num2) {
        return num1;
    }

    return num2;
}

/**
 * Valida y muestran en pantalla la evaluación de la función `greater`
 * @returns 
 */
function printWhichOneIsGreater() {
    const firstNumber = document.querySelector('#first-number'),
        secondNumber = document.querySelector('#second-number'),
        result = document.querySelector('#greater-number-result');

    if (isNaN(firstNumber.value) || isNaN(secondNumber.value)) {
        result.textContent = "❌ Alguno de los números no es válido.";
        return;
    }

    if (firstNumber.value === "" || secondNumber.value === "") {
        result.textContent = "❌ Alguno de los números no es válido.";
        return;
    }

    if (firstNumber.value === secondNumber.value) {
        result.textContent = "✅ Los números son iguales.";
        return;
    }

    const greaterNumber = greater(+firstNumber.value, +secondNumber.value);

    result.textContent = `✅ ${greaterNumber} es mayor.`;
}

/**
 * Retorna un array con las vocales que hay en una frase
 * @param {string} phrase 
 * @returns array of vowels in phrase
 */
function getVowelsIn(phrase) {
    return phrase
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .match(/[aeiou]/gi);
}

/**
 * Muestra en pantalla las vocales que aparecen en una frase
 */
function printVowelsInPhrase() {
    const phrase = document.querySelector('#phrase1'),
        result = document.querySelector('#vowels-in-phrase-result');
    const vowels = getVowelsIn(phrase.value);

    result.textContent = "✅ Aparecen las vocales: " + vowels.join(", ");
}

/**
 * Cuenta las vocales en una frase
 * @param {string} phrase 
 * @returns {[{vowel: string, times: number}]}
 */
function countVowels(phrase) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const normalizedPhrase = phrase
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");

    return vowels.map(vowel => {
        const times = normalizedPhrase
            .match(new RegExp(vowel, 'gi')) ? normalizedPhrase
                .match(new RegExp(vowel, 'gi')).length : 0;
        return { vowel, times };
    });
}

/**
 * Mostrar en pantalla las veces que cada vocal aparece en una frase
 */
function printVowelCounter() {
    const phrase = document.querySelector('#phrase2'),
        result = document.querySelector('#voewls-count-result');

    const vowels = countVowels(phrase.value);
    const res = vowels.map(vowel => `${vowel.vowel} ${vowel.times} veces`);

    result.textContent = "✅ " + JSON.stringify(res);
}

document.addEventListener("DOMContentLoaded", function () {
    const isPalindromeButton = document.querySelector('#is-palindrome-button'),
        greaterNumberButton = document.querySelector('#greater-number-button'),
        vowelsInPhraseButton = document.querySelector('#vowels-in-phrase-button'),
        vowelCounterButton = document.querySelector('#voewls-count-button');

    isPalindromeButton.addEventListener('click', printIsPalindrome);
    greaterNumberButton.addEventListener('click', printWhichOneIsGreater);
    vowelsInPhraseButton.addEventListener('click', printVowelsInPhrase);
    vowelCounterButton.addEventListener('click', printVowelCounter);
});