function checkGuess() {
    // Get the player's guess from the input field
    const guess = document.getElementById("guess").value;
  
    // Display the guess in the Wordle grid
    document.getElementById("letter1").textContent = guess.charAt(0);
    document.getElementById("letter2").textContent = guess.charAt(1);
    document.getElementById("letter3").textContent = guess.charAt(2);
    document.getElementById("letter4").textContent = guess.charAt(3);
    document.getElementById("letter5").textContent = guess.charAt(4);
  }