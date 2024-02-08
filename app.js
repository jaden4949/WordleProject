const wordBank = ["berry", "space", "house", "grape", "guess", "lemon",];
let targetWord;
let currentRow = 1;

function startGame() {
  // Select a random word from the word bank
  targetWord = wordBank[Math.floor(Math.random() * wordBank.length)];
}

function checkGuess() {
  // Get the player's guess from the input field
  const guess = document.getElementById("guess").value.toLowerCase();

  // Check if the guess is in the word bank
  if (wordBank.includes(guess)) {
    // Check if the guess matches the target word
    if (guess === targetWord) {
      // Display the correct guess in the Wordle grid
      for (let i = 0; i < guess.length; i++) {
        document.getElementById(`letter${currentRow}-${i + 1}`).textContent = guess.charAt(i);
      }
      alert("Congratulations! You guessed the word!");
    } else {
      // Display the guess in the Wordle grid
      for (let i = 0; i < guess.length; i++) {
        document.getElementById(`letter${currentRow}-${i + 1}`).textContent = guess.charAt(i);
      }
      alert("Sorry, that's not the word. Try again!");
    }
    // Move to the next row
    currentRow++;
  } else {
    alert("Sorry, that word is not in the word bank.");
  }
}

// Start the game
startGame();