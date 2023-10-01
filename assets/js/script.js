var startCard = document.querySelector("#startCard");
var startButton = startCard.children[2];
var timerEl = document.querySelector("#time");
var questionCard = document.querySelector("#questionCard");
var question = document.querySelector("#question");
var answers =document.querySelector("#answers");
var answer1 = answers.children[0];
var answer2 = answers.children[1];
var answer3 = answers.children[2];
var answer4 = answers.children[3];
var endCard = document.querySelector("#endCard");
var failCard = document.querySelector("#failCard");
var retry = document.querySelector("#retry")
var correctDisplay = document.querySelector("#correct");
var submit = document.querySelector("#submit")
var unusedQuestions = [1,2,3,4,5];
var score = 0;
var scoreTimer = null;

function init() {
    startCard.setAttribute("style", "display:block");
    questionCard.setAttribute("style", "display:none");
    endCard.setAttribute("style", "display:none");
    failCard.setAttribute("style", "display:none");
    correctDisplay.setAttribute("style", "display:none");
    score = 75;
    timerEl.textContent = "Time: " + score;
}

function startQuiz() {
    startCard.setAttribute("style", "display:none");
    questionCard.setAttribute("style", "display:block");
    scoreTimer = setInterval(timer,1000);
    randomQuestion();
}

function timer() {
    score -= 1;
    timerEl.textContent = "Time: " + score;
    if (score <= 0) {
        quizFailed();
    }
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
    endCard.children[1].textContent= "Your final score is: " + score;
}

function submitScore(event) {
    event.preventDefault();
    var input = document.querySelector("#initials");
    var newScore = input.value + " - " + score;
    var oldScores = (JSON.parse(localStorage.getItem("scores")));
    if (oldScores == null) {
        oldScores = [newScore];
        console.log("oldScores new: " + oldScores);
        localStorage.setItem("scores",JSON.stringify(oldScores));
        window.location.href = "scores.html";
        return
    } else if (oldScores.length == 1) {
        oldScores = Array.from(JSON.parse(localStorage.getItem("scores")))
        var thisScore = JSON.stringify(oldScores[0]);
        console.log("thisScore len 1: " + thisScore);
        var digit1Place = thisScore.length - 3;
        var digit1 = thisScore.charAt(digit1Place);
        console.log(digit1);
        var digit2Place = thisScore.length - 2;
        var digit2 = thisScore.charAt(digit2Place);
        console.log(digit2);
        var prevScore = parseInt(digit1 + digit2);
        console.log(prevScore + " " +prevScore.type);
        if (score >= prevScore){
            oldScores.unshift(newScore);
            localStorage.setItem("scores",JSON.stringify(oldScores));
            window.location.href = "scores.html";
            return
        }
        else {
            oldScores.push(newScore);
            localStorage.setItem("scores",JSON.stringify(oldScores));
            window.location.href = "scores.html";
            return
        }
    } else {
        oldScores = Array.from(JSON.parse(localStorage.getItem("scores")))
        var len = oldScores.length
        for (i = 0; i < len; i ++) {
            var thisScore = JSON.stringify(oldScores[i]);
            console.log("thisScore len i: " + thisScore + " i = " + i);
            var digit1Place = thisScore.length - 3;
            var digit1 = thisScore.charAt(digit1Place);
            console.log(digit1);
            var digit2Place = thisScore.length - 2;
            var digit2 = thisScore.charAt(digit2Place);
            console.log(digit2);
            var prevScore = parseInt(digit1 + digit2);
            console.log(prevScore + " " +prevScore.type);
            if (score >= prevScore) {
                if (i == 0) {
                    var allScores = [newScore, ...oldScores.slice(0)];
                    oldScores = allScores;
                    console.log("oldScores len i: " + oldScores + " " + " i = " + i);
                    while (oldScores.length > 10) {
                        oldScores.pop();
                        console.log("oldScores too long: " + oldScores);
                    }
                    localStorage.setItem("scores",JSON.stringify(oldScores));
                    window.location.href = "scores.html";
                    return
                } else {
                    var allScores = [...oldScores.slice(0,i), newScore, ...oldScores.slice(i)];
                    oldScores = allScores;
                    console.log("oldScores len i: " + oldScores + " " + " i = " + i);
                    while (oldScores.length > 10) {
                        oldScores.pop();
                        console.log("oldScores too long: " + oldScores);
                    }
                    localStorage.setItem("scores",JSON.stringify(oldScores));
                    window.location.href = "scores.html";
                    return
                }
            }
        }
        oldScores.push(newScore);
        console.log("oldScores lowest: " + oldScores);
        while (oldScores.length > 10) {
            oldScores.pop();
            console.log("oldScores too long: " + oldScores);
        }
        localStorage.setItem("scores",JSON.stringify(oldScores));
        window.location.href = "scores.html";
        return
    }
}

/* function submitScore(event) {
    event.preventDefault();
    var input = document.querySelector("#initials");
    var newScore = input.value + " - " + score;
    var oldScores = JSON.parse(localStorage.getItem("scores"));
    console.log("oldScores1: " + oldScores + localStorage.getItem("scores"));
    if (oldScores == null) {
        oldScores = [newScore];
        console.log("oldScores2: " + oldScores);
        localStorage.setItem("scores",JSON.stringify(oldScores));
    } else {
        console.log("oldScores3: " + oldScores);
        oldScores.push(newScore);
        console.log("oldScores4: " + oldScores);
        localStorage.setItem("scores",JSON.stringify(oldScores));
    }
} */

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
        score -= 10
        timerEl.textContent = "Time: " + score;
        if (score <= 0) {
            quizFailed();
        }
        // console.log("Incorrect")
    }
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
    // console.log("Question number: " + question.dataset.number)
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
    // console.log("Question number: " + question.dataset.number)
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
    // console.log("Question number: " + question.dataset.number)
    question.textContent = "A verry useful tool used during development and debugging for printing content to the debugger is:";
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
submit.addEventListener("click",submitScore);
retry.addEventListener("click", init);