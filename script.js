const screens = document.querySelectorAll('.screen');
const choose_bug_buttons = document.querySelectorAll('.choose-bug-button');
const start_button = document.getElementById('start-button')
const game_container = document.getElementById('game-container')
const timeElem = document.getElementById('time')
const scoreElem = document.getElementById('score')
const message = document.getElementById('message')
let seconds = 0
let score = 0
let selected_bug = {}

start_button.addEventListener('click', () => screens[0].classList.add('up'))

choose_bug_buttons.forEach(button => {
    button.addEventListener('click', () => {
        const img = button.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_bug = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createBug, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeElem.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createBug() {
    const bug = document.createElement('div')
    bug.classList.add('bug')
    const { x, y } = getRandomLocation()
    bug.style.top = `${y}px`
    bug.style.left = `${x}px`
    bug.innerHTML = `<img src="${selected_bug.src}" alt="${selected_bug.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    bug.addEventListener('click', catchBug)

    game_container.appendChild(bug)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchBug() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addBugs()
}

function addBugs() {
    setTimeout(createBug, 1000)
    setTimeout(createBug, 1500)
}

function increaseScore() {
    score++
    if(score > 19) {
        message.classList.add('visible')
    }
    scoreElem.innerHTML = `Score: ${score}`
}