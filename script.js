let choicesContainer = document.getElementById("choicesContainer");
let currentScore = document.getElementById("currentScore");
let questionNumber = document.getElementById("questionNumber");
let timerDisplay = document.getElementById("timerDisplay");
let questionText = document.getElementById("questionText");

let startButton = document.getElementById("startButton");

let highScoreContainer = document.getElementById("highScoreContainer");
if (localStorage.getItem("highScore") === null) {
  highScoreContainer.textContent = "High Score: BB: -1";
  localStorage.setItem("highScore", "High Score: BB: -1")
}
else{
  highScoreContainer.textContent = localStorage.getItem("highScore");
}

let timeLeft = 90;


// ____________________________________________________________________________
// let choicesContainer = document.getElementById("choicesContainer");
//let currentScore = document.getElementById("currentScore");
//let questionNumber = document.getElementById("questionNumber");
//let timerDisplay = document.getElementById("timerDisplay");
//let questionText = document.getElementById("questionText");

//let startButton = document.getElementById("startButton");
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
      //choice.style.display = "block"; <--- doesn't work for some reason (probably because we need to create the style class for the element first and then we can modify its display property)
      choice.style = "display: block";
    }
  };
  questionNumber.textContent = "Question 1";
  startTimer();
  buttonClick();
});
// ____________________________________________________________________________

function startTimer() {
  timeLeft = 89;
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




let questionArray = ["Question 1: X = 2 + 2. What is X?", "Question 2: X = '2 + 2'. What is X?", "Question 3: X is '2' + '2'. What is X?", "Question 4: True or False?", "Question 5: True and False?"];
let q1Choices = ["2", "4", "22", "2 2"];
let q2Choices = ["2 + 2", "22", "'2 + 2'", "'22'"];
let q3Choices = ["'22'", "'2 + 2'", "22", "[2, 2]"];
let q4Choices = ["True", "False", "", ""];
let q5Choices = ["True", "False", "", ""];
let correctAnswerArray = ["4", "'2 + 2'", "'22'", "True", "False"];
let choice1 = document.getElementById("choice1");
let choice2 = document.getElementById("choice2");
let choice3 = document.getElementById("choice3");
let choice4 = document.getElementById("choice4");
console.log(choice1.name);
console.log(questionNumber.textContent);

function buttonClick() {
  if(questionNumber.textContent === "Question 1"){  // horrific code, but it works
    questionText.textContent = questionArray[0];
    choice1.textContent = q1Choices[0];
    choice2.textContent = q1Choices[1];
    choice3.textContent = q1Choices[2];
    choice4.textContent = q1Choices[3];
  }
  if(questionNumber.textContent === "Question 2"){
    questionText.textContent = questionArray[1];
    choice1.textContent = q2Choices[0];
    choice2.textContent = q2Choices[1];
    choice3.textContent = q2Choices[2];
    choice4.textContent = q2Choices[3];
  }
  if(questionNumber.textContent === "Question 3"){
    questionText.textContent = questionArray[2];
    choice1.textContent = q3Choices[0];
    choice2.textContent = q3Choices[1];
    choice3.textContent = q3Choices[2];
    choice4.textContent = q3Choices[3];
  }
  if(questionNumber.textContent === "Question 4"){
    questionText.textContent = questionArray[3];
    choice1.textContent = q4Choices[0];
    choice2.textContent = q4Choices[1];
    choice3.textContent = q4Choices[2];
    choice4.textContent = q4Choices[3];
  }
  if(questionNumber.textContent === "Question 5"){
    questionText.textContent = questionArray[4];
    choice1.textContent = q5Choices[0];
    choice2.textContent = q5Choices[1];
    choice3.textContent = q5Choices[2];
    choice4.textContent = q5Choices[3];
  }
}

let choicesButtons = document.querySelectorAll(".choices");
choicesButtons.forEach((item, index, array) =>  
{
  console.log(item);
  item.addEventListener("click", function () 
  {
    console.log(item.textContent);
    console.log(this);
    let questionIndex = questionArray.indexOf(questionText.textContent);
    if (this.textContent !== correctAnswerArray[questionIndex]) {
      if(timeLeft - 5 <= 0){
        timeLeft = 0;
        gameOver();
      }
      else{
        timeLeft = timeLeft-5;
      }
      questionText.textContent = questionArray[questionIndex + 1];
      questionNumber.textContent = "Question " + (questionIndex + 1);
    }
    else {
      currentScore.textContent = "Current Score: " + 0;
      questionText.textContent = questionArray[questionIndex + 1];
    }
    buttonClick();
  });
});

gameOver = function(){
  questionNumber.textContent = "Game Over!";
  timerDisplay.textContent = "Time Remaining: 0s";
  questionText.textContent = "Your score is: " + currentScore.textContent;
  if(currentScore.textContent > localStorage.getItem("highScore")){
    localStorage.setItem("highScore", currentScore.textContent);
    highScoreContainer.textContent = localStorage.getItem("highScore");
  }
}