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
let playerTwoCurrent = document.getElementById("playerOneCurrentScore") // player two current span in main game

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
}





function roll() {
    const dice1 = Math.floor(Math.random() * 6 + 1) // dice one value after roll
    const dice2 = Math.floor(Math.random() * 6 + 1) // dice two value after roll
    let sum = dice1 + dice2
}

const newGameButton = document.getElementById("newGame")
newGameButton.addEventListener("click", newGame)


function newGame() {
    playerOneTotal = 0
    playerTwoTotal = 0
    playerOneCurrent = 0
    playerTwoCurrent = 0
    left.classList.add("loser")
    left.classList.remove("active")
    name1.value = ""
    name2.value = ""
    name2.disabled = true
    radio1.checked = true
    preGame.classList.remove("clicked")
}