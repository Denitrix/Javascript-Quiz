var startCard = document.querySelector("#startCard");
var startButton = startCard.children[2];
var timerEl = document.querySelector("#time");
var questionCard = document.querySelector("#questionCard");
var question = document.querySelector("#question");
var answers = document.querySelector("#answers");
var endCard = document.querySelector("#endCard");
var failCard = document.querySelector("#failCard");
var retry = document.querySelector("#retry");
var correctDisplay = document.querySelector("#correct");
var submit = document.querySelector("#submit");
var score = 0;
var scoreTimer = null;

var questions = [
  {
    question: "Commonly used data types do NOT include: ",
    ans1: "strings",
    ans2: "booleans",
    ans3: "alerts",
    ans4: "numbers",
    correct: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed with _______.",
    ans1: "quotes",
    ans2: "curly brackets",
    ans3: "parenthesis",
    ans4: "square brackets",
    correct: "parenthesis",
  },
  {
    question: "Arrays in JavaScript can be used to store _______.",
    ans1: "numbers and strings",
    ans2: "other arrays",
    ans3: "booleans",
    ans4: "all of the above",
    correct: "all of the above",
  },
  {
    question:
      "String values must be enclosed within ______ when being assigned to variables.",
    ans1: "commas",
    ans2: "curly brackets",
    ans3: "quotes",
    ans4: "parenthesis",
    correct: "quotes",
  },
  {
    question:
      "A verry useful tool used during development and debugging for printing content to the debugger is:",
    ans1: "JavaScript",
    ans2: "terminal/bash",
    ans3: "for loops",
    ans4: "console.log",
    correct: "console.log",
  },
];

function init() {
  //initilization function that resets display and resets global variables
  startCard.setAttribute("style", "display:block");
  questionCard.setAttribute("style", "display:none");
  endCard.setAttribute("style", "display:none");
  failCard.setAttribute("style", "display:none");
  correctDisplay.setAttribute("style", "display:none");
  score = 75;
  questions = [
    {
      question: "Commonly used data types do NOT include: ",
      ans1: "strings",
      ans2: "booleans",
      ans3: "alerts",
      ans4: "numbers",
      correct: "alerts",
    },
    {
      question:
        "The condition in an if / else statement is enclosed with _______.",
      ans1: "quotes",
      ans2: "curly brackets",
      ans3: "parenthesis",
      ans4: "square brackets",
      correct: "parenthesis",
    },
    {
      question: "Arrays in JavaScript can be used to store _______.",
      ans1: "numbers and strings",
      ans2: "other arrays",
      ans3: "booleans",
      ans4: "all of the above",
      correct: "all of the above",
    },
    {
      question:
        "String values must be enclosed within ______ when being assigned to variables.",
      ans1: "commas",
      ans2: "curly brackets",
      ans3: "quotes",
      ans4: "parenthesis",
      correct: "quotes",
    },
    {
      question:
        "A verry useful tool used during development and debugging for printing content to the debugger is:",
      ans1: "JavaScript",
      ans2: "terminal/bash",
      ans3: "for loops",
      ans4: "console.log",
      correct: "console.log",
    },
  ];
  timerEl.textContent = "Time: " + score;
}

function startQuiz() {
  //hides start screen, starts timer, displays the questionCard, and runs randomQuestion
  startCard.setAttribute("style", "display:none");
  questionCard.setAttribute("style", "display:block");
  scoreTimer = setInterval(timer, 1000);
  randomQuestion();
}

function timer() {
  //decreases and updates timer and if timer is below 0 runs quizFailed
  score -= 1;
  timerEl.textContent = "Time: " + score;
  if (score <= 0) {
    timerEl.textContent = "Time: " + 0;
    quizFailed();
  }
}

function randomQuestion() {
  //selects and displays a random question from the questions array, and removes it from the array, if questions array is empty runs endQuiz
  if (questions.length == 0) {
    endQuiz();
  } else {
    var index = Math.floor(Math.random() * questions.length);
    var quest = questions[index];
    questions.splice(index, 1);
    var ans = [quest.ans1, quest.ans2, quest.ans3, quest.ans4];
    question.textContent = quest.question;
    for (i = 0; i < answers.children.length; i++) {
      index = Math.floor(Math.random() * ans.length);
      answers.children[i].textContent = ans[index];
      ans.splice(index, 1);
      if (answers.children[i].textContent == quest.correct) {
        answers.children[i].dataset.correct = true;
      } else {
        answers.children[i].dataset.correct = false;
      }
    }
  }
}

function quizFailed() {
  //shows quiz failed screen and stops timer
  failCard.setAttribute("style", "display:block");
  questionCard.setAttribute("style", "display:none");
  timerEl.textContent = "Time: " + 0;
  clearInterval(scoreTimer);
}

function endQuiz() {
  //shows quiz complete screen and final score
  endCard.setAttribute("style", "display:block");
  questionCard.setAttribute("style", "display:none");
  timerEl.textContent = "Time: " + score;
  clearInterval(scoreTimer);
  endCard.children[1].textContent = "Your final score is: " + score;
}

function submitScore(event) {
  //gets input from initials text input, stores it with the score to an array, sorts the array, if array is longer than 10 scores removes lowest scores, and updates the local storage item
  event.preventDefault();
  var input = document.querySelector("#initials");
  var name = input.value;
  var oldScores = JSON.parse(localStorage.getItem("scores")) || [];
  oldScores.push({ name: name, score: score });
  oldScores.sort((a, b) => b.score - a.score);
  console.log("oldScores lowest: " + oldScores);
  while (oldScores.length > 10) {
    oldScores.pop();
    console.log("oldScores too long: " + oldScores);
  }
  localStorage.setItem("scores", JSON.stringify(oldScores));
  window.location.href = "scores.html";
}

function checkAnswer(event) {
  //checks if the selected answer is correct using data-correct, if correct displays correct indicator, if incorrect displays incorrect indicator and reduces score by 10, then runs randomQuestion
  var answer = event.target;
  // console.log("Selected answer: " + answer.textContent)
  if (answer.dataset.correct === "true") {
    correctDisplay.setAttribute("style", "display:block");
    correctDisplay.textContent = "Correct";
    // console.log("Correct")
  } else {
    correctDisplay.setAttribute("style", "display:block");
    correctDisplay.textContent = "Incorrect";
    score -= 10;
    timerEl.textContent = "Time: " + score;
    if (score <= 0) {
      timerEl.textContent = "Time: " + 0;
      quizFailed();
    }
    // console.log("Incorrect")
  }
  setTimeout(() => {
    correctDisplay.setAttribute("style", "display:none");
  }, 3000);
  randomQuestion();
}

init();
startButton.addEventListener("click", startQuiz);
answers.addEventListener("click", checkAnswer);
submit.addEventListener("click", submitScore);
retry.addEventListener("click", init);
