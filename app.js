const start = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')

const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const timeList = document.querySelector('#time-list')


const colors = ['#ffafbd', '#2193b0', '#cc2b5e', '#ee9ca7', '#42275a', '#bdc3c7', '#de6262', '#06beb6', '#a8e063', '#eecda3']
let time = 0;
let point = 0;

start.addEventListener('click', (e)=>{
    e.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (e)=>{
    if (e.target.classList.contains('time-btn')) {
      time = parseInt(e.target.getAttribute('data-time'))
      startGame()
    }
})

function startGame() {
    screens[1].classList.add('up')
    createRandomCircle()
    setInterval(() => {
        decreaseTime()
    }, 1000);
}

function decreaseTime() {
    if (time === 0) {
        endGame()
    }else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
    
    
}
board.addEventListener('click', (e)=>{
    if(e.target.classList.contains('circle')){
        point++
        e.target.remove()
        createRandomCircle()
    }
})
function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function endGame() {
    timeEl.parentElement.classList.add('hide')
    board.innerHTML = `<h2>Твой результат - <span style="color:#800080">${point}</span></h2>`
}

function createRandomCircle() {
    const circle =  document.createElement('div')
    const size = getRandomNumber(5, 40)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width-size)
    const y = getRandomNumber(0, height-size)

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = colors[Math.floor(Math.random() * colors.length)]
    circle.classList.add('circle')
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min)+min)
}