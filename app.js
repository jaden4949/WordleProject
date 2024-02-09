const wordBank = ["berry", "space", "house", "lemon"];
let targetWord;
let currentRow = 1;
let guessCount = 0;
const maxGuesses = 6;
let virtualGuessInput = ""; // Create a virtual input field

function startGame() { //Select a random word from word bank
    targetWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    // Clear the Wordle grid
    for (let i = 1; i <= maxGuesses; i++) {
        for (let j = 1; j <= 5; j++) {
            document.getElementById(`letter${i}-${j}`).textContent = "";
            document.getElementById(`letter${i}-${j}`).style.backgroundColor = "white";
        }
    }
    // Reset the current row and guess count
    currentRow = 1;
    guessCount = 0;
    virtualGuessInput = ""; // Reset the virtual input field
}

function displayGuess(guess) {
    for (let i = 0; i < guess.length; i++) {
        const guessedLetter = guess.charAt(i);
        document.getElementById(`letter${currentRow}-${i + 1}`).textContent = guessedLetter;
    }
}

function checkGuess(event) {
    // Check if the Enter key was pressed or it's the submit button click
    if (event.type === "click" || (event.type === "keydown" && event.key === "Enter")) {
        // Display the virtual input field characters on the grid
        displayGuess(virtualGuessInput);

        // Maintain a copy of the target word to keep track of correctly guessed letters
        let remainingTargetWord = targetWord;

        // Display the guess in the Wordle grid and color cells accordingly
        for (let i = 0; i < virtualGuessInput.length; i++) {
            const guessedLetter = virtualGuessInput.charAt(i);
            const correctLetter = targetWord.charAt(i);

            if (guessedLetter === correctLetter) {
                // Guessed letter in correct position
                document.getElementById(`letter${currentRow}-${i + 1}`).style.backgroundColor = "green";
                remainingTargetWord = remainingTargetWord.replace(guessedLetter, ''); // Remove correctly guessed letter
            } else if (remainingTargetWord.includes(guessedLetter)) {
                // Guessed letter in wrong position
                document.getElementById(`letter${currentRow}-${i + 1}`).style.backgroundColor = "yellow";
                remainingTargetWord = remainingTargetWord.replace(guessedLetter, ''); // Remove guessed letter
            } else {
                // Guessed letter not in target word
                document.getElementById(`letter${currentRow}-${i + 1}`).style.backgroundColor = "gray";
            }
        }

        // Increment the guess count
        guessCount++;

        // Check if the guess matches the target word
        if (virtualGuessInput === targetWord) {
            // Stop the game
            currentRow = maxGuesses + 1; // Set currentRow to a value beyond maxGuesses to prevent further guesses
            alert("Congratulations! You guessed the word!");
            return;
        }

        // Check if the player has used up all the guesses
        if (guessCount >= maxGuesses) {
            alert(`Sorry, you've used up all your guesses. The correct word was ${targetWord}`);
            return;
        }

        // Move to the next row
        currentRow++;

        // Clear the virtual input field after submitting the guess
        virtualGuessInput = "";
    } else if (event.key === "Backspace") {
        // Remove the last character from the virtual input field
        virtualGuessInput = virtualGuessInput.slice(0, -1);

        // Update the grid to remove the last character
        const lastCharIndex = virtualGuessInput.length;
        document.getElementById(`letter${currentRow}-${lastCharIndex + 1}`).textContent = "";
    }
}

const restartButton = document.createElement("button");
restartButton.textContent = "Restart";
restartButton.addEventListener("click", startGame);
document.body.appendChild(restartButton);

// Add event listener to the document for keydown event
document.addEventListener("keydown", checkGuess);

// Update the virtual input field with the typed character
document.addEventListener("keydown", function (event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) { // Check if the key pressed is a letter
        virtualGuessInput += String.fromCharCode(event.keyCode).toLowerCase();
        displayGuess(virtualGuessInput); // Display the guess as you type
    }
});

// Start the game
startGame();
