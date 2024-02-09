const wordBank = ["berry", "space", "house", "lemon"];
let targetWord;
let currentRow = 1;
let guessCount = 0;
const maxGuesses = 6;
let virtualGuessInput = "";

function startGame() { 
    targetWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    for (let i = 1; i <= maxGuesses; i++) {
        for (let j = 1; j <= 5; j++) {
            document.getElementById(`letter${i}-${j}`).textContent = "";
            document.getElementById(`letter${i}-${j}`).style.backgroundColor = "white";
        }
    }
    currentRow = 1;
    guessCount = 0;
    virtualGuessInput = "";
    updateGameResult("");
}

function displayGuess(guess) {
    for (let i = 0; i < guess.length; i++) {
        const guessedLetter = guess.charAt(i);
        document.getElementById(`letter${currentRow}-${i + 1}`).textContent = guessedLetter;
    }
}

function checkGuess(event) {
    if (event.type === "click" || (event.type === "keydown" && event.key === "Enter")) {
        displayGuess(virtualGuessInput);

        let remainingTargetWord = targetWord;

        for (let i = 0; i < virtualGuessInput.length; i++) {
            const guessedLetter = virtualGuessInput.charAt(i);
            const correctLetter = targetWord.charAt(i);

            if (guessedLetter === correctLetter) {
                document.getElementById(`letter${currentRow}-${i + 1}`).style.backgroundColor = "green";
                remainingTargetWord = remainingTargetWord.replace(guessedLetter, '');
            } else if (remainingTargetWord.includes(guessedLetter)) {
                document.getElementById(`letter${currentRow}-${i + 1}`).style.backgroundColor = "yellow";
                remainingTargetWord = remainingTargetWord.replace(guessedLetter, '');
            } else {
                document.getElementById(`letter${currentRow}-${i + 1}`).style.backgroundColor = "gray";
            }
        }

        guessCount++;
        if (virtualGuessInput === targetWord) {
            currentRow = maxGuesses + 1;
            updateGameResult(`Congratulations! You guessed the word: ${targetWord}`);
            return;
        }

        if (guessCount >= maxGuesses) {
            updateGameResult(`Sorry the correct word was ${targetWord}`);
            return;
        }
        currentRow++;
        virtualGuessInput = "";
    } else if (event.key === "Backspace") {
        virtualGuessInput = virtualGuessInput.slice(0, -1);
        const lastCharIndex = virtualGuessInput.length;
        document.getElementById(`letter${currentRow}-${lastCharIndex + 1}`).textContent = "";
    }
}

function updateGameResult(message) {
    const resultElement = document.getElementById("game-result");
    resultElement.textContent = message;
}

document.body.style.backgroundColor = "lightgray";
const restartButton = document.createElement("button");
restartButton.textContent = "Restart";
restartButton.addEventListener("click", startGame);
document.body.appendChild(restartButton);

document.addEventListener("keydown", checkGuess);

document.addEventListener("keydown", function (event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        virtualGuessInput += String.fromCharCode(event.keyCode).toLowerCase();
        displayGuess(virtualGuessInput);
    }
});

startGame();