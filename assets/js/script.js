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
  startCard.setAttribute("style", "display:none");
  questionCard.setAttribute("style", "display:block");
  scoreTimer = setInterval(timer, 1000);
  randomQuestion();
}

function timer() {
  score -= 1;
  timerEl.textContent = "Time: " + score;
  if (score <= 0) {
    timerEl.textContent = "Time: " + 0;
    quizFailed();
  }
}

function randomQuestion() {
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
  failCard.setAttribute("style", "display:block");
  questionCard.setAttribute("style", "display:none");
  timerEl.textContent = "Time: " + score;
  clearInterval(scoreTimer);
}

function endQuiz() {
  endCard.setAttribute("style", "display:block");
  questionCard.setAttribute("style", "display:none");
  timerEl.textContent = "Time: " + score;
  clearInterval(scoreTimer);
  endCard.children[1].textContent = "Your final score is: " + score;
}

function submitScore(event) {
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

function question1() {
  question.dataset.number = 1;
  // console.log("Question number: " + question.dataset.number)
  question.textContent = "Commonly used data types do NOT include: ";
  answer1.textContent = "strings";
  answer2.textContent = "booleans";
  answer3.textContent = "alerts";
  answer4.textContent = "numbers";
  answer1.dataset.correct = false;
  answer2.dataset.correct = false;
  answer3.dataset.correct = true;
  answer4.dataset.correct = false;
}

function question2() {
  question.dataset.number = 2;
  // console.log("Question number: " + question.dataset.number)
  question.textContent =
    "The condition in an if / else statement is enclosed with _______.";
  answer1.textContent = "quotes";
  answer2.textContent = "curly brackets";
  answer3.textContent = "parenthesis";
  answer4.textContent = "square brackets";
  answer1.dataset.correct = false;
  answer2.dataset.correct = false;
  answer3.dataset.correct = true;
  answer4.dataset.correct = false;
}

init();
startButton.addEventListener("click", startQuiz);
answers.addEventListener("click", checkAnswer);
submit.addEventListener("click", submitScore);
retry.addEventListener("click", init);
