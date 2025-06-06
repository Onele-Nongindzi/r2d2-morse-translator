// Morse code dictionary
const morseCodeMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
    '!': '-.-.--', ' ': '/'
};

// Reverse map for decoding
const reverseMorseMap = Object.fromEntries(
    Object.entries(morseCodeMap).map(([k, v]) => [v, k])
);

// Converts text to Morse code
function lettersToMorseCode(text) {
    if (!text) return '';
    return text.toUpperCase().split('').map(char => {
        return morseCodeMap[char] || '';
    }).join(' ').trim();
}

// Converts Morse code to text
function morseCodeToLetters(code) {
    if (!code) return '';
    return code.trim().split(' ').map(code => {
        return reverseMorseMap[code] || '';
    }).join('');
}

// Encode button handler
function encode() {
    const input = document.getElementById('inputText').value;
    const result = lettersToMorseCode(input);
    document.getElementById('output').textContent = result || 'No valid characters to encode';
}

// Decode button handler
function decode() {
    const input = document.getElementById('inputText').value;
    const result = morseCodeToLetters(input);
    document.getElementById('output').textContent = result || 'Invalid Morse code';
}