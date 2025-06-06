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

// Audio context for beeps
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Play Morse code as beeps
function playMorse() {
    const input = document.getElementById('inputText').value;
    const morse = lettersToMorseCode(input);
    let time = audioCtx.currentTime;

    morse.split('').forEach(symbol => {
        if (symbol === '.') {
            playBeep(time, 0.1); // Short beep for dot
            time += 0.2;
        } else if (symbol === '-') {
            playBeep(time, 0.3); // Long beep for dash
            time += 0.4;
        } else if (symbol === ' ') {
            time += 0.2; // Space between letters
        } else if (symbol === '/') {
            time += 0.6; // Space between words
        }
    });
}

// Generate a beep sound
function playBeep(startTime, duration) {
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, startTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
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