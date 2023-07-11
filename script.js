let highScoreContainer = document.getElementById("highScoreContainer");
if (localStorage.getItem("highScore") === null) {
  highScoreContainer.textContent = "High Score: NA";
  localStorage.setItem("highScore", "High Score: NA")
}
else{
  highScoreContainer.textContent = localStorage.getItem("highScore");
}


// ____________________________________________________________________________
let choicesContainer = document.getElementById("choicesContainer");
let currentScore = document.getElementById("currentScore");
let questionNumber = document.getElementById("questionNumber");
let timerDisplay = document.getElementById("timerDisplay");
let questionText = document.getElementById("questionText");

let startButton = document.getElementById("startButton");
startButton.addEventListener("click", function () {
  startButton.style.display = "none";
  questionNumber.style.display = "block";
  timerDisplay.style.display = "block";
  questionText.style.display = "block";
  choicesContainer.style.display = "grid";
  for(var choice in choicesContainer){
    if(choice === "null" || choice === "undefined" || choice === ""){
      return;
    }
    if(choice.textContent !== "undefined" && choice !== "null" && choice !== ""){
      //choice.style.display = "block";
      choice.style = "display: block";
    }
  };

  startTimer();
});
// ____________________________________________________________________________

function startTimer() {
  let timeLeft = 2;
  let timer = setInterval(function () {
    if (timeLeft > 0) {
      timerDisplay.textContent = "Time Remaining: " + timeLeft + "s";
      timeLeft--;
    }
    else {
      clearInterval(timer);
      timerDisplay.textContent = "Time Remaining: 0s";
      questionNumber.textContent = "Game Over!";
    }
  }, 1000);
}