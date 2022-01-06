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
            {text: 'ancient Egypt', correct: true},
            {text: 'ancient China', correct: false},
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
            {text: 'They are cute', correct: false},
            {text: 'Companions', correct: false},
            {text: 'Status Symbols', correct: false},
            {text: 'Pest Control', correct: true},
        ]
    }]

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)

function startGame() {
    console.log('started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionsContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    if (currentQuestionIndex < questions.length){
        showQuestion(shuffledQuestions[currentQuestionIndex])
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question
    var answerIndex = 0
    for(answerItem in answerButtonsElement.children)
    {
        answerButtonsElement.children[answerItem].innerText = question.answers[answerIndex].text
        if (question.answers[answerItem].correct){
            answerButtonsElement.children[answerItem].onclick = function(){checkAnswer(true)}
        }
        else{
            answerButtonsElement.children[answerItem].onclick = function(){checkAnswer(false)}
        }
        answerIndex++
    }
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function checkAnswer(isCorrect) 
{   
    if (isCorrect) {
        document.getElementById("answer-status").innerText = "Winner-Winner Chicken Dinner!"
        currentQuestionIndex++
        setNextQuestion()
    } 
    else {
        document.getElementById("answer-status").innerText = "Womp womp, bummer dude."
    }
}
