const bar = document.querySelector('.progress-bar')

let timeState = {
    totalTime: 10,
    timeLeft: 10,

}

function timerBar(){
    const bar = timeState.timeLeft * bar.width() / timeState.totalTime
}

export default timerBar






