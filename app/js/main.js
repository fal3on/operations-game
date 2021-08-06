const problemElement = document.querySelector('.problem')
const mainForm = document.querySelector('.main-form')
const mainField = document.querySelector('.field')

const totalPoints = document.querySelector('.points')
const strikesLeft = document.querySelector('.strikes')

const modalText = document.querySelector('.modal-text')
const resetBtn = document.querySelector('.reset-btn')

// timer
const barAnimation = document.querySelector('.animate')
const barWidth = document.querySelector('.bar')

let timeState = {
    tickRes: 1000,
    timeLenght: 10,
}

function timerBar(){
    let progressBar = timeState.tickRes * barWidth.style.width / timeState.timeLenght

}

timerBar()

function generateNumber(max){
    return Math.floor(Math.random() * (max + 1))
}

function generateProblem(){
    return{
        numberOne: generateNumber(10),
        numberTwo: generateNumber(10),
        operator: ['+', '-', 'x'][generateNumber(2)]

    }
}

let state = {
    score: 0,
    strikes: 0,
}

function updateProblem(){
    state.currentProblem = generateProblem()
    problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
    mainField.value = ''
    mainField.focus()
}

updateProblem()

mainForm.addEventListener('submit', handleSubmit)
function handleSubmit(event){
    event.preventDefault()

    let correctAnswer
    const problem = state.currentProblem
    if (problem.operator == '+') correctAnswer = problem.numberOne + problem.numberTwo
    if (problem.operator == '-') correctAnswer = problem.numberOne - problem.numberTwo
    if (problem.operator == 'x') correctAnswer = problem.numberOne * problem.numberTwo


    if(parseInt(mainField.value) == correctAnswer){
        state.score++
        totalPoints.textContent = state.score
        updateProblem()

        

        // point animation
        problemElement.classList.add('animate-point')
        setTimeout(() => {
            problemElement.classList.remove('animate-point')
        }, 225);

    } else {
        state.strikes++
        strikesLeft.textContent = 3 - state.strikes
        mainField.select()

        

        // error animation
        problemElement.classList.add('animate-wrong')
        setTimeout(() => {
            problemElement.classList.remove('animate-wrong')
        }, 225);
    }
    checkLogic()
}

function checkLogic(){

    if(state.score === 10){
        modalText.textContent = `You Won, your score was ${state.score}`
        modalScore.textContent = state.score
        document.body.classList.add('active-overlay')
        setTimeout(() => resetBtn.focus(), 500)
        //resetGame()
    }

    if(state.strikes === 3){
        modalText.textContent = `You Lost, your score was ${state.score}`
        document.body.classList.add('active-overlay')
        setTimeout(() => resetBtn.focus(), 500)
        //resetGame()
    }
}

resetBtn.addEventListener('click', resetGame)


function resetGame(){
    document.body.classList.remove('active-overlay')
    updateProblem()
    state.score = 0
    state.strikes = 0
    totalPoints.textContent = 0
    strikesLeft.textContent = 3
}