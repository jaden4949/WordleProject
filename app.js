const wordBank = ["berry","space"];
let targetWord;
let currentRow = 1
let guessCount = 0
const maxGuesses =6;

function startGame() { //Select a random word from word bank
 targetWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  // Clear the Wordle grid
  for (let i = 1; i <= maxGuesses; i++) {
    for (let j = 1; j <= 5; j++) {
      document.getElementById(`letter${i}-${j}`).textContent = "";
    }
  }
  // Reset the current row and guess count
  currentRow = 1;
  guessCount = 0;
}

function checkGuess() {
  // Check if the game has already ended
  if (currentRow > maxGuesses) {
    alert("The game has ended. You cannot make further guesses.");
    return;
  }

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
      // Stop the game
      currentRow = maxGuesses + 1; // Set currentRow to a value beyond maxGuesses to prevent further guesses
      return;
    } else {
      // Display the guess in the Wordle grid
      for (let i = 0; i < guess.length; i++) {
        document.getElementById(`letter${currentRow}-${i + 1}`).textContent = guess.charAt(i);
      }
      alert("Sorry, that's not the word. Try again!");
    }
  } else {
    alert("Sorry, that word is not in the word bank.");
  }
  
  // Check if the player has used up all the guesses
  if (guessCount >= maxGuesses) {
    alert(`Sorry, you've used up all your guesses. The correct word was ${targetWord}`);
    return;
  }
  
  // Move to the next row
  currentRow++;
  guessCount++;
}



const restartButton = document.createElement("button");
restartButton.textContent = "Restart";
restartButton.addEventListener("click", startGame);
document.body.appendChild(restartButton);

// Start the game
startGame();