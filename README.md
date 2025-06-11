# R2-D2 Morse Code Translator

## 🛰️ Mission Briefing

This web-based Morse Code Translator helps **R2-D2** encode and decode secret Rebel Alliance messages. It converts text to Morse code and vice versa — with droid-like beeps for an immersive experience.

## 🚀 Features

- 🔤 **Encode**: Converts text (letters, numbers, punctuation) to Morse code.  
- 🔁 **Decode**: Converts Morse code back to plain text.  
- 🔊 **Play Morse**: Plays Morse code as beeps, mimicking R2-D2's communication.  
- ⚠️ Handles empty or invalid inputs gracefully.  
- 🪐 Cyberpunk-inspired UI with a galactic aesthetic.

## 📁 Project Structure

```plain
r2d2-morse-translator/
├── index.html       # Main HTML file
├── styles.css       # CSS for styling
├── script.js        # JavaScript for functionality
└── README.md        # Project documentation
```

## 💻 How to Run Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/<Onele-Nongindzi>/r2d2-morse-translator.git
   ```

2. **Navigate to the project folder:**

   ```bash
   cd r2d2-morse-translator
   ```

3. **Open `index.html`** in a modern web browser.

4. Enter text or Morse code in the textarea and start translating!


Click "Encode" to convert to Morse code, "Decode" to convert to text, or "Play Morse" to hear beeps.

## Hosting on GitHub Pages

Push the project to GitHub:git remote add origin https://github.com/<your-username>/r2d2-morse-translator.git
git push -u origin main


Enable GitHub Pages:
Go to your repository on GitHub.
Navigate to Settings > Pages.
Under Source, select Deploy from a branch.
Choose the main branch and / (root) folder, then click Save.
Wait a few minutes for deployment. Access the app at https://<your-username>.github.io/r2d2-morse-translator/.



## Git Workflow

Create a feature branch:git checkout -b feature/r2d2-translator


Commit changes:git commit -m "Add feature or fix"


Push to the branch:git push origin feature/r2d2-translator


Open a Pull Request on GitHub and request a review.

## Sample Messages

Text to Morse: I LIKE YOU → .. / .-.. .. -.- . / -.-- --- ..-
Morse to Text: .... .- ...- . / -.-- --- ..- / ... . . -. / .-. --- -... --- -.. ..- .-.. → HAVE YOU SEEN ROBODU
Spoiler Alert: DARTH VADER IS LUKES FATHER → -.. .- .-. - .... / ...- .- -.. . .-. / .. ... / .-.. ..- -.- . ... / ..-. .- - .... . .-

## Notes

Requires a modern browser with Web Audio API support for beeps.
Supports standard Morse code characters (A-Z, 0-9, .,!?, space).
Morse code uses / for word separation.

This is the way! May the Force be with you.
