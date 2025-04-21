let playerScore = 0;
let computerScore = 0;

function play(playerChoice) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  let result = "";
  let winner = "";

  if (playerChoice === computerChoice) {
    result = "It's a draw!";
    winner = "draw";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "You win!";
    winner = "player";
    playerScore++;
  } else {
    result = "You lose!";
    winner = "computer";
    computerScore++;
  }

  // Switch to battle mode
  document.getElementById("game").style.display = "none";
  document.getElementById("battle-arena").style.display = "flex";
  document.getElementById("result").style.display = "none";
  document.getElementById("ok-btn").style.display = "none";

  // Set battle icons
  const playerDiv = document.getElementById("player-choice");
  const compDiv = document.getElementById("computer-choice");

  playerDiv.style.backgroundImage = `url(${playerChoice}.png)`;
  compDiv.style.backgroundImage = `url(${computerChoice}.png)`;

  // Reset styles
  playerDiv.classList.remove("flashy", "winner-glow");
  compDiv.classList.remove("flashy", "winner-glow");
  playerDiv.style.transform = "scale(1)";
  compDiv.style.transform = "scale(1)";
  playerDiv.style.opacity = "1";
  compDiv.style.opacity = "1";

  // Trigger clash animations
  playerDiv.style.animation = "none";
  compDiv.style.animation = "none";
  void playerDiv.offsetWidth;
  void compDiv.offsetWidth;
  playerDiv.style.animation = "punchLeft 0.6s ease";
  compDiv.style.animation = "punchRight 0.6s ease";

  // Delay to show result after animation
  setTimeout(() => {
    playerDiv.style.animation = "";
    compDiv.style.animation = "";

    if (winner === "draw") {
        playerDiv.classList.add("flashy");
        compDiv.classList.add("flashy");
      } else if (winner === "player") {
        compDiv.style.opacity = "0.3";
        compDiv.style.transform = "scale(0.8)";
        playerDiv.classList.add("winner-glow");
      } else {
        playerDiv.style.opacity = "0.3";
        playerDiv.style.transform = "scale(0.8)";
        compDiv.classList.add("winner-glow");
      }
      

    // Show result and score
    document.getElementById("result").innerText = `You chose ${playerChoice}. Computer chose ${computerChoice}. ${result}`;
    document.getElementById("result").style.display = "block";
    document.getElementById("score").innerText = `Player: ${playerScore} | Computer: ${computerScore}`;

    // Show OK button to continue
    document.getElementById("ok-btn").style.display = "inline-block";
  }, 1200);
}

function resetGame(full = false) {
  // Go back to selection screen
  document.getElementById("game").style.display = "flex";
  document.getElementById("battle-arena").style.display = "none";
  document.getElementById("result").style.display = "none";
  document.getElementById("ok-btn").style.display = "none";

  // Clear effects
  document.getElementById("player-choice").classList.remove("flashy", "winner-glow");
  document.getElementById("computer-choice").classList.remove("flashy", "winner-glow");  
  document.getElementById("player-choice").style.opacity = "1";
  document.getElementById("computer-choice").style.opacity = "1";
  document.getElementById("player-choice").style.transform = "scale(1)";
  document.getElementById("computer-choice").style.transform = "scale(1)";

  // Reset scores if full reset
  if (full) {
    playerScore = 0;
    computerScore = 0;
    document.getElementById("score").innerText = `Player: 0 | Computer: 0`;
  }
}
