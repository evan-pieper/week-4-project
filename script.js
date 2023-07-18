let choicesContainer = document.getElementById("choicesContainer");
let currentScore = document.getElementById("currentScore");
let questionNumber = document.getElementById("questionNumber");
let timerDisplay = document.getElementById("timerDisplay");
let questionText = document.getElementById("questionText");
let gameRunning = true;

let startButton = document.getElementById("startButton");
const BB = {scorer: "BB", score: -1};
let highScoreArray = [BB]; //array of highscorer objects with there scores attached
let highScoreList = document.getElementById("highScoreList");
if (localStorage.getItem("highScoreArray") === null) {
  localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray));
  renderHighScores();
}
else {
  renderHighScores();
}
let timeLeft = 90;

function renderHighScores(){
  highScoreList.innerHTML = ""; //clears the highscore list
  let highScoreArray = JSON.parse(localStorage.getItem("highScoreArray"));
  highScoreArray.sort(function(a, b){return b.score - a.score});
  highScoreArray = highScoreArray.slice(0, 5);
  for (let i = 0; i < highScoreArray.length; i++) {
    let highScore = document.createElement("li");
    highScore.textContent = highScoreArray[i].scorer + ": " + highScoreArray[i].score + "s";
    highScoreList.appendChild(highScore);
  }
}

// ____________________________________________________________________________
// let choicesContainer = document.getElementById("choicesContainer");
//let currentScore = document.getElementById("currentScore");
//let questionNumber = document.getElementById("questionNumber");
//let timerDisplay = document.getElementById("timerDisplay");
//let questionText = document.getElementById("questionText");

//let startButton = document.getElementById("startButton");
startButton.addEventListener("click", function () {
  gameRunning = true;
  questionText.textContent = questionArray[0];
  startButton.style.display = "none";
  questionNumber.style.display = "block";
  timeLeft = 90;
  timerDisplay.style.display = "block";
  questionText.style.display = "block";
  choicesContainer.style.display = "grid";
  for(var choice in choicesContainer){
    if(choice === "null" || choice === "undefined"){
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
    if (gameRunning === true) {
      timerDisplay.textContent = "Time Remaining: " + timeLeft + "s";
      timeLeft--;
      currentScore.textContent = "Current Score: " + timeLeft;
    }
    else {
      clearInterval(timer);
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      gameOver();
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
    choice3.style.display = "none";
    choice4.style.display = "none";
    choice1.textContent = q4Choices[0];
    choice2.textContent = q4Choices[1];
    choice3.textContent = q4Choices[2];
    choice4.textContent = q4Choices[3];
  }
  if(questionNumber.textContent === "Question 5"){
    questionText.textContent = questionArray[4];
    choice3.style.display = "none";
    choice4.style.display = "none";
    choice1.textContent = q5Choices[0];
    choice2.textContent = q5Choices[1];
    choice3.textContent = q5Choices[2];
    choice4.textContent = q5Choices[3];
  }
}

let choicesButtons = document.querySelectorAll(".choices");
choicesButtons.forEach((item, index, array) =>  
{
  //console.log(item.textContent + " event listener added");
  item.addEventListener("click", function () 
  {
    console.log(item.textContent + " clicked");
    //console.log(this);
    let questionIndex = questionArray.indexOf(questionText.textContent);
    if (this.textContent !== correctAnswerArray[questionIndex]) { //if the button clicked is not the correct answer for the current question
      if(timeLeft - 5 <= 0){ //if the time left is less than or equal to 5 seconds set it to zero and game over
        timeLeft = 0;
      }
      else{ //otherwise subtract 5 seconds from the time left
        timeLeft = timeLeft-5;
      }
    }
    else { //if the button clicked is the correct answer for the current question
      if(questionIndex === 4){ //if the current question is the last question
        gameOver();
      }
      else { //otherwise move on to the next question
        questionNumber.textContent = "Question " + (questionIndex + 2);
      }
    }
    console.log(questionNumber.textContent);
    buttonClick();
  });
});

gameOver = function(){
  gameRunning = false;
  startButton.style.display = "block";
  //console.log(timeLeft);
  //console.log(localStorage.getItem("highScore"));
  currentScore.textContent = "Current Score: " + timeLeft;
  questionNumber.textContent = "Game Over!";
  timerDisplay.textContent = "Time Remaining:" + timeLeft + "s";
  questionText.textContent = "Your score is: " + timeLeft + "s";
  highScoreArray = JSON.parse(localStorage.getItem("highScoreArray"));

  if(highScoreArray.length < 5){
    console.log("New high score!");
    let highScoreNameIn = prompt("Enter your name");
    let highScoreObject = {scorer: highScoreNameIn, score: timeLeft};
    highScoreArray.push(highScoreObject);
    localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray));
    renderHighScores();
  }
  else{
    if(timeLeft >= highScoreArray[4].score){
      console.log("New high score!");
      let highScoreNameIn = prompt("Enter your name");
      let highScoreObject = {scorer: highScoreNameIn, score: timeLeft};
      highScoreArray.push(highScoreObject);
      localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray));
      renderHighScores();

    }
    else{
      console.log("No new high score");
      localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray));
      renderHighScores();
    }
    buttonClick();
  }
}