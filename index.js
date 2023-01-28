// variables ------------------------------------

// sections
const preGame = document.getElementById("preGame") // pre game register form
const left = document.getElementById("left") // left side in main game
const right = document.getElementById("right") // right side in main game
const middle = document.getElementById("middle") // middle side in main game

// register form
const secondName = document.getElementById("playerTwoName") // player two name input
const radios = document.querySelectorAll("input[type=radio]") // radio group radio inputs
const radio1 = document.querySelector("input[type=radio]") // first radio button in form
let name1 = document.getElementById("playerOneName") // player one name input in form
let name2 = document.getElementById("playerTwoName") // player two name input in form 
let targetScore = document.getElementById("targetScore") // target score input in form 
const submit = document.getElementById("game") // submit input in register form

// main game screen
const nameOne = document.getElementById("nameOne") // player one name span in main game
const nameTwo = document.getElementById("nameTwo") // player two name span in main game
const targetSpan = document.getElementById("targetSpan") // target score span in main games
let playerOneTotal = document.getElementById("playerOneTotalScore") // player one total span in main game
let playerTwoTotal = document.getElementById("playerTwoTotalScore") // player two total span in main game
let playerOneCurrent = document.getElementById("playerOneCurrentScore") // player one current span in main game
let playerTwoCurrent = document.getElementById("playerTwoCurrentScore") // player two current span in main game
const imag1 = document.getElementById("img1")
const imag2 = document.getElementById("img2")

// game buttons 
const newGameButton = document.getElementById("newGame") // new game button in main game
const rollDiceButton = document.getElementById("rollDice") // roll dice button in amin game
const holdButton = document.getElementById("hold") // hold button in main game

// additional 
let activePlayer = 2
let current1 = parseInt(playerOneCurrent.innerText)
let current2 = parseInt(playerTwoCurrent.innerText)
let total1 = parseInt(playerOneTotal.innerText)
let total2 = parseInt(playerTwoTotal.innerText)

console.log(current1, current2, total1, total2);

// ---------------------------------------------------


// pre Game set-up
secondName.disabled = true
for (let index = 0; index < radios.length; index++) {
    radios[index].addEventListener("change", (event) => {
        if (event.target.value == 2) {
            secondName.disabled = false
        } else {
            secondName.disabled = true
        }
    })
}

// submit the pre Game Register form
function myCode(event) {
    event.preventDefault()
    preGame.classList.add("clicked")
    left.classList.add("active")
    left.classList.remove("loser")
    return false
}

submit.addEventListener("click", (event) => {
    init(name1.value, name2.value, targetScore.value) // call the game function to initialize the game
})


// initializing the game set-up players names and target score
function init(name1, name2, targetScore) {
    nameOne.innerText = name1
    nameTwo.innerText = name2
    targetSpan.innerText = `target: ${targetScore}`
    holdButton.disabled = true
}

newGameButton.addEventListener("click", newGame)

//new game functionality
function newGame() {
    current1 = 0
    current2 = 0
    total1 = 0
    total2 = 0
    playerOneTotal.innerText = total1
    playerTwoTotal.innerText = total2
    playerOneCurrent.innerText = current1
    playerTwoCurrent.innerText = current2
    left.classList.add("loser")
    left.classList.remove("active")
    name1.value = ""
    name2.value = ""
    name2.disabled = true
    radio1.checked = true
    preGame.classList.remove("clicked")
}

rollDiceButton.addEventListener("click", roll)

// roll functionality
function roll() {
    holdButton.disabled = true
    const dice1 = Math.floor(Math.random() * 6 + 1) // dice one value after roll
    const dice2 = Math.floor(Math.random() * 6 + 1) // dice two value after roll
    // let dice1 = 6
    // let dice2 = 6
    let sum = dice1 + dice2
    let i = 0;
    const rollImage = setInterval(function () {
        rollDiceButton.disabled = true
        imag1.src = "./images/dice-" + Math.floor(Math.random() * 6 + 1) + ".png"
        imag2.src = "./images/dice-" + Math.floor(Math.random() * 6 + 1) + ".png"
        i++
        if (i > 5) {
            clearInterval(rollImage)
            imag1.src = "./images/dice-" + dice1 + ".png"
            imag2.src = "./images/dice-" + dice2 + ".png"
            if (dice1 === 6 && dice2 === 6) {
                return endOfTurnSixes()
            }
            rollDiceButton.disabled = false
            setTimeout(() => holdButton.disabled = false, 100)
            return accumulateCurrent(sum)
        }
    }, 100)
}

function accumulateCurrent(sum) {
    if (activePlayer === 1) {
        current1 += sum
        playerOneCurrent.innerText = current1
    } else {
        current2 += sum
        playerTwoCurrent.innerText = current2
    }
}

function endOfTurnSixes() {
    if (activePlayer === 1) {
        current1 = 0
        playerOneCurrent.innerText = current1
        activePlayer = 2
    } else {
        current2 = 0
        playerTwoCurrent.innerText = current2
        activePlayer = 1
    }
}


holdButton.addEventListener("click", hold)
function hold() {
    if (activePlayer === 1) {
        total1 += current1
        playerOneTotal.innerText = total1
        current1 = 0
        playerOneCurrent.innerText = current1
        activePlayer = 2
    } else {
        total2 += current2
        playerTwoTotal.innerText = total2
        current2 = 0
        playerTwoCurrent.innerText = current2
        activePlayer = 1
    }
}