const wordBank = ["berry","space", "house","lemon"];
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
       document.getElementById(`letter${i}-${j}`).style.backgroundColor = "white";
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

  // Maintain a copy of the target word to keep track of correctly guessed letters
  let remainingTargetWord = targetWord;

  // Display the guess in the Wordle grid
  for (let i = 0; i < guess.length; i++) {
    const guessedLetter = guess.charAt(i);
    document.getElementById(`letter${currentRow}-${i + 1}`).textContent = guessedLetter;

    // Check if the guessed letter is in the target word and in the correct location
    if (guessedLetter === targetWord.charAt(i)) {
      document.getElementById(`letter${currentRow}-${i + 1}`).style.backgroundColor = "green";
      // Remove the correctly guessed letter from the remaining target word
      remainingTargetWord = remainingTargetWord.replace(guessedLetter, '');
    }
  }

  // Check each guessed letter against the remaining target word
  for (let i = 0; i < guess.length; i++) {
    const guessedLetter = guess.charAt(i);
    // If the guessed letter is in the remaining target word but not in the correct location, color the cell yellow
    if (remainingTargetWord.includes(guessedLetter)) {
      document.getElementById(`letter${currentRow}-${i + 1}`).style.backgroundColor = "yellow";
      // Remove the guessed letter from the remaining target word
      remainingTargetWord = remainingTargetWord.replace(guessedLetter, '');
    }
    // If the guessed letter is not in the target word, color the cell gray
    else if (!targetWord.includes(guessedLetter)) {
      document.getElementById(`letter${currentRow}-${i + 1}`).style.backgroundColor = "gray";
    }
  }

  // Increment the guess count
  guessCount++;

  // Check if the guess matches the target word
  if (guess === targetWord) {
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
}

const restartButton = document.createElement("button");
restartButton.textContent = "Restart";
restartButton.addEventListener("click", startGame);
document.body.appendChild(restartButton);

// Start the game
startGame();