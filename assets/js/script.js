var startCard = document.querySelector("#startCard");
var startButton = startCard.children[2];
var questionCard = document.querySelector("#questionCard");
var question = document.querySelector("#question");
var answers =document.querySelector("#answers");
var answer1 = answers.children[0];
var answer2 = answers.children[1];
var answer3 = answers.children[2];
var answer4 = answers.children[3];
var endCard = document.querySelector("#endCard");
var correctDisplay = document.querySelector("#correct");
var unusedQuestions = [1,2,3,4,5]

function init() {
    startCard.setAttribute("style", "display:block");
    questionCard.setAttribute("style", "display:none");
    endCard.setAttribute("style", "display:none");
    correctDisplay.setAttribute("style", "display:none");
}

function startQuiz() {
    startCard.setAttribute("style", "display:none");
    questionCard.setAttribute("style", "display:block");
    randomQuestion();
}

function randomQuestion() {
    if (unusedQuestions.length !== 0) {
        var temp = Math.floor(Math.random() * unusedQuestions.length);
        var selected = unusedQuestions[temp];
        unusedQuestions.splice(temp,1);
        if (selected == 1) {
            question1();
        } else if (selected == 2) {
            question2();
        } else if (selected == 3) {
            question3();
        } else if (selected == 4) {
            question4();
        } else if (selected == 5) {
            question5();
        }
    } else {
        endQuiz();
    }
}

function endQuiz() {
    endCard.setAttribute("style", "display:block");
    questionCard.setAttribute("style", "display:none");
}

function checkAnswer(event) {
    var answer = event.target;
    console.log(answer)
    if (answer.dataset.correct === "true") {
        correctDisplay.setAttribute("style", "display:block");
        correctDisplay.textContent = "Correct";
    } else {
        correctDisplay.setAttribute("style", "display:block");
        correctDisplay.textContent = "Incorrect";
    }
    randomQuestion();
}

function question1() {
    question.dataset.number = 1;
    console.log("Question number: " + question.dataset.number)
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
    console.log("Question number: " + question.dataset.number)
    question.textContent = "The condition in an if / else statement is enclosed with _______.";
    answer1.textContent = "quotes";
    answer2.textContent = "curly brackets";
    answer3.textContent = "parenthesis";
    answer4.textContent = "square brackets";
    answer1.dataset.correct = false;
    answer2.dataset.correct = false;
    answer3.dataset.correct = true;
    answer4.dataset.correct = false;
}

function question3() {
    question.dataset.number = 3;
    console.log("Question number: " + question.dataset.number)
    question.textContent = "Arrays in JavaScript can be used to store _______.";
    answer1.textContent = "numbers and strings";
    answer2.textContent = "other arrays";
    answer3.textContent = "booleans";
    answer4.textContent = "all of the above";
    answer1.dataset.correct = false;
    answer2.dataset.correct = false;
    answer3.dataset.correct = false;
    answer4.dataset.correct = true;
}

function question4() {
    question.dataset.number = 4;
    console.log("Question number: " + question.dataset.number)
    question.textContent = "String values must be enclosed within ______ when being assigned to variables.";
    answer1.textContent = "commas";
    answer2.textContent = "curly brackets";
    answer3.textContent = "quotes";
    answer4.textContent = "parenthesis";
    answer1.dataset.correct = false;
    answer2.dataset.correct = false;
    answer3.dataset.correct = true;
    answer4.dataset.correct = false;
}

function question5() {
    question.dataset.number = 5;
    console.log("Question number: " + question.dataset.number)
    question.textContent = "A verry useful tool used during development and debugging for printing content to the debugger is: ";
    answer1.textContent = "JavaScript";
    answer2.textContent = "terminal/bash";
    answer3.textContent = "for loops";
    answer4.textContent = "console.log";
    answer1.dataset.correct = false;
    answer2.dataset.correct = false;
    answer3.dataset.correct = true;
    answer4.dataset.correct = false;
}

init();
startButton.addEventListener("click",startQuiz);
answers.addEventListener("click",checkAnswer);