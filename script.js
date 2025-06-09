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

// Audio context for beeps
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const dotDuration = 0.15; // seconds. Base time unit for Morse code.

// Converts text to Morse code
function lettersToMorseCode(text) {
    if (!text) return '';
    return text.toUpperCase().split('')
        .map(char => morseCodeMap[char]) // Get Morse code or undefined for unknown chars
        .filter(code => code) // Filter out undefined (unknown characters)
        .join(' ') // Join valid Morse codes with a single space
        .trim(); // Trim any leading/trailing spaces
}

// Converts Morse code to text
function morseCodeToLetters(code) {
    if (!code) return '';
    return code.trim().split(' ').map(code => {
        return reverseMorseMap[code] || '';
    }).join('');
}

// DOM Elements for easy access
const inputTextElement = document.getElementById('inputText');
const outputTextElement = document.getElementById('output');
const encodeButton = document.querySelector('button[onclick="encode()"]');
const decodeButton = document.querySelector('button[onclick="decode()"]');
const playButton = document.querySelector('button[onclick="playMorse()"]');
const clearButton = document.querySelector('button[onclick="clearFields()"]'); // Assuming it exists

function setControlsDisabled(disabled) {
    encodeButton.disabled = disabled;
    decodeButton.disabled = disabled;
    playButton.disabled = disabled;
    // Clear button can remain enabled or be disabled too, based on preference
    if (clearButton) clearButton.disabled = disabled;
}

// Play Morse code as beeps
async function playMorse() {
    setControlsDisabled(true);
    // Ensure AudioContext is resumed (browsers often require user interaction)
    if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
    }

    const textToPlay = document.getElementById('inputText').value;
    if (!textToPlay.trim()) {
        // Optionally, provide feedback if input is empty
        // document.getElementById('output').textContent = 'Input text to play Morse.';
        return;
    }

    const morseToPlay = lettersToMorseCode(textToPlay);
    if (!morseToPlay) {
        // document.getElementById('output').textContent = 'Cannot convert input to Morse for playback.';
        return;
    }

    let currentTime = audioCtx.currentTime + 0.1; // Start with a small delay

    // Split by space to process each Morse letter or word separator
    const morseParts = morseToPlay.split(' ');

    for (const part of morseParts) {
        if (part === '/') { // Word space ('/' character from morseCodeMap)
            currentTime += (7 * dotDuration); // 7 units of pause for word space
        } else { // Morse letter (e.g., "-..." for B)
            for (let i = 0; i < part.length; i++) {
                const symbol = part[i];
                if (symbol === '.') {
                    playBeep(currentTime, dotDuration); // Dot is 1 unit
                    currentTime += dotDuration;
                } else if (symbol === '-') {
                    playBeep(currentTime, 3 * dotDuration); // Dash is 3 units
                    currentTime += (3 * dotDuration);
                }
                // Pause after each symbol within a letter (except the last one)
                if (i < part.length - 1) {
                    currentTime += dotDuration; // Inter-symbol pause is 1 unit
                }
            }
            // Pause after each letter (3 units, but inter-symbol already added 1 unit if not last symbol)
            // The total pause from end of one letter sound to start of next should be 3 units.
            // If last symbol was X, and it added 1 unit pause, we need 2 more.
            // Simpler: the currentTime is now at the END of the last symbol's sound.
            // So, add 3 units of pause for inter-letter space.
            currentTime += (3 * dotDuration); // Inter-letter pause is 3 units
        }
    }

    // Re-enable buttons after the last sound is scheduled to finish
    // currentTime now holds the scheduled end time of the entire Morse sequence
    const totalDurationMs = (currentTime - audioCtx.currentTime) * 1000;
    setTimeout(() => {
        setControlsDisabled(false);
    }, Math.max(0, totalDurationMs + 50)); // Add a small buffer (50ms)
}

// Generate a beep sound
function playBeep(startTime, duration) {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain(); // For smoother start/stop and volume control

    oscillator.type = 'sine'; // A common waveform for beeps
    oscillator.frequency.setValueAtTime(700, startTime); // Frequency in Hz (e.g., 700Hz is a clear tone)

    // Envelope for the beep to avoid clicks
    gainNode.gain.setValueAtTime(0, startTime); // Start silent
    gainNode.gain.linearRampToValueAtTime(1, startTime + 0.01); // Quick fade-in (10ms)
    gainNode.gain.setValueAtTime(1, startTime + duration - 0.01); // Hold volume
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration); // Quick fade-out (10ms)

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.02); // Stop after fade-out and a tiny bit more buffer
}

// Clear input and output fields
function clearFields() {
    inputTextElement.value = '';
    outputTextElement.textContent = '';
}

// Encode button handler
function encode() {
    const input = inputTextElement.value;
    const result = lettersToMorseCode(input);
    if (input && !result) {
        outputTextElement.textContent = 'Input contains no characters that can be encoded to Morse.';
    } else {
        outputTextElement.textContent = result || 'Enter text to encode.'; // Changed placeholder message
    }
}

// Decode button handler
function decode() {
    const input = inputTextElement.value;
    const result = morseCodeToLetters(input);
    if (input && !result) {
        outputTextElement.textContent = 'Input is not valid Morse code or contains unrecognized symbols.';
    } else {
        outputTextElement.textContent = result || 'Enter Morse code to decode.'; // Changed placeholder message
    }
}