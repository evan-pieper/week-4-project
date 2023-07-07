let highScoreContainer = document.getElementById("highScoreContainer");
if (localStorage.getItem("highScore") === null) {
  highScoreContainer.textContent = "High Score: NA";
  localStorage.setItem("highScore", "High Score: NA")
}
else{
  highScoreContainer.textContent = localStorage.getItem("highScore");
}


let questionNumber = document.getElementById("questionNumber");
let timerDisplay = document.getElementById("timerDisplay");
let questionText = document.getElementById("questionText");

let startButton = document.getElementById("startButton");
startButton.addEventListener("click", function () {
  startButton.style.display = "none";
  questionNumber.style.display = "block";
  timerDisplay.style.display = "block";
  questionText.style.display = "block";
  startTimer();
});

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

let choicesContainer = document.getElementById("choicesContainer");
let currentScore = document.getElementById("currentScore");


// The following function renders items in a todo list as <li> elements
function renderPrompt() {
  // Clear todoList element and update todoCountSpan
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  // Render a new li for each todo
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Complete ✔️";

    li.appendChild(button);
    todoList.appendChild(li);
  }
}