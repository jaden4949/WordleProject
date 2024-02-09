const wordBank = ["berry","space", "house","lemon"];
let targetWord;
let currentRow = 1
let guessCount = 0
const maxGuesses = 6;

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

 function checkGuess(){
  // Check if the game has already ended
  if (currentRow > maxGuesses) {
    alert("The game has ended. You cannot make more guesses.");
    return;
  }

  // Get the player's guess from the input field
  const guess = document.getElementById("guess").value.toLowerCase();

  // Maintain a copy of the target word to keep track of correctly guessed letters
  let remainingTargetWord = targetWord;

  // Display the guess in the Wordle grid and color cells accordingly
  for (let i = 0; i < guess.length; i++) {
    const guessedLetter = guess.charAt(i);
    const correctLetter = targetWord.charAt(i);

    document.getElementById(`letter${currentRow}-${i + 1}`).textContent = guessedLetter;

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