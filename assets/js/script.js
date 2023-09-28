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

function initialize() {
    startCard.setAttribute("style", "display:block");
    questionCard.setAttribute("style", "display:none");
    endCard.setAttribute("style", "display:none");
    correctDisplay.setAttribute("style", "display:none");
}

function startQuiz() {
    startCard.setAttribute("style", "display:none");
    questionCard.setAttribute("style", "display:block");
    question1();
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

}

function question1() {
    question.dataset.number = 1;
    console.log(question.dataset.number);
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

initialize();
startButton.addEventListener("click",startQuiz);
answers.addEventListener("click",checkAnswer);