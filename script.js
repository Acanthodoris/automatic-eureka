var startButton = document.getElementById('start-btn')
var questionsContainerElement = document.getElementById('question-conatiner')
var questionElement = document.getElementById('questions')
var answerButtonsElement = document.getElementById('answer-buttons')
var questions = [

    {
        question: 'Where did cats originate from?',
        answers: [
            {text: 'The Desert', correct: true},
            {text: 'The Mountains', correct: false},
            {text: 'The Tundra', correct: false},
            {text: 'Outer-Space', correct: false},
        ]
    },

    {
        question: 'What ancient civilization used to worship cats?',
        answers: [
            {text: 'Ancient Egypt', correct: true},
            {text: 'Ancient China', correct: false},
            {text: 'The Roman Empire', correct: false},
            {text: 'United Kingdom', correct: false},
        ]
    },

    {
        question: 'What kind of diet does a cat eat?',
        answers: [
            {text: 'Vegatarian', correct: false},
            {text: 'Omnivorous', correct: false},
            {text: 'Carnivorous', correct: true},
            {text: 'Pescatarian', correct: false},
        ]
    },

    {
        question: 'Which coat coloration only happens in female cats?',
        answers: [
            {text: 'Tuxedo', correct: false},
            {text: 'Tabby', correct: false},
            {text: 'Orange', correct: false},
            {text: 'Calico', correct: true},
        ]
    },

    {
        question: 'Why were cats originally domesticated?',
        answers: [
            {text: 'Because they are cute', correct: false},
            {text: 'Companionship', correct: false},
            {text: 'Status Symbols', correct: false},
            {text: 'Pest Control', correct: true},
        ]
    }]
const highscoreKey = "highscores"
var highScores = JSON.parse(localStorage.getItem(highscoreKey))


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
var timerPointer = null

function startGame() {
    console.log('started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionsContainerElement.classList.remove('hide')
    setNextQuestion()
    timerPointer = setInterval(updateTimer, 1000)
}

function setNextQuestion() {
    if (currentQuestionIndex < questions.length){
        showQuestion(shuffledQuestions[currentQuestionIndex])
    }
    else {
        endGame()
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question
    var answerIndex = 0
    for(var i = 0; i < 4; i++)
    {
        answerButtonsElement.children[i].innerText = question.answers[i].text
        if (question.answers[i].correct){
            answerButtonsElement.children[i].onclick = function(){checkAnswer(true)}
        }
        else{
            answerButtonsElement.children[i].onclick = function(){checkAnswer(false)}
        }
        answerIndex++
    }
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function checkAnswer(isCorrect) {   
    var answerStatus = document.getElementsByClassName("answer-status")[0]
    showElement(answerStatus)
    if (isCorrect) {
        answerStatus.innerText = "Winner-Winner Chicken Dinner!"
    } 
    else {
        answerStatus.innerText = "Womp womp, bummer dude."
        timeRemaining -= 15
        document.getElementById("timer").innerText = "Time: " + timeRemaining
    }
    currentQuestionIndex++
    setNextQuestion()
    
    setTimeout(() => {
        hideElement(answerStatus)
    }, 2000);
}

var timeRemaining = 100

function updateTimer() {
    if (timeRemaining <= 0) {
        endGame()
        return
    }
    else {
        timeRemaining -= 1
        document.getElementById("timer").innerText = "Time: " + timeRemaining
    }
}

function endGame() {
    //stop timer
    clearInterval(timerPointer)
    //hide container element
    hideElement(document.getElementsByClassName("container")[0])
    //show endgame element
    showElement(document.getElementById("completedQuiz"))
    //set score for game just played
    document.getElementById("recentScore").innerText = "Your final score is " + timeRemaining
    
}

function showElement() {
    if (Object.className.includes(hide)) {
        Object.classList.remove(hide)
    }
    
}

function hideElement() {
    if (Object.className.includes) {
        
    }
}

function addHighScore() {
    var highScore = [document.getElementById("intials").value, timeRemaining]
    if (highScores != null) {
        highScores.push(highScore)
    }
    else {
        highScores = [highScore]
    }
    localStorage.setItem(highscoreKey, JSON.stringify(highScores))
    viewHighscores()
}

function viewHighscores() {
    showElement(document.getElementById("Highscores"))
    hideElement(document.getElementsByClassName("container")[0])
    hideElement(document.getElementById("completedQuiz"))
    document.getElementById("scoreList").innerHTML = ""
    var scoreList = document.getElementById("scoreList")
    if (highScores != null) {
        for(var i = 0; i < highScores.length; i++){
            var newScore = document.createElement("LI")
            newScore.innerText = (i + 1) + '. ' + highScores[i][0] + ' - ' + highScores[i][1]
            scoreList.appendChild(newScore)
        }
    }
}

function clearHighscores() {
    localStorage.removeItem(highscoreKey)
    document.getElementById("scoreList").innerHTML = ""
}

function resetPage() {
    location.reload();
}

/*
Todo list

clean timeout function to clear on new answer click
have complete switches between screens. No two dives visible at once
*/

function hideElement(e) {
   if (!e.classList.contains('hide')) {
      e.classList.add('hide')
   } 
}

function showElement(e) {
    if (e.classList.contains('hide')) {
        e.classList.remove('hide')
    }
}