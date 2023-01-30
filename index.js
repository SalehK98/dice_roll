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
const msg1 = document.getElementById("msg1")
const msg2 = document.getElementById("msg2")

// game buttons 
const newGameButton = document.getElementById("newGame") // new game button in main game
const rollDiceButton = document.getElementById("rollDice") // roll dice button in amin game
const holdButton = document.getElementById("hold") // hold button in main game

// sounds and music
const winSound = document.getElementById("winSound")
const loseSound = document.getElementById("loseSound")
const holdSound = document.getElementById("holdSound")
const rollSound = document.getElementById("rollSound")
const doubleSixSound = document.getElementById("double_six_sound")
const bg_music = document.getElementById("bg_music")
const preSound = document.getElementById("preSound")

// additional 
let activePlayer = 1
let current1 = parseInt(playerOneCurrent.innerText)
let current2 = parseInt(playerTwoCurrent.innerText)
let total1 = parseInt(playerOneTotal.innerText)
let total2 = parseInt(playerTwoTotal.innerText)
let target;
let winner;
let loser;
let numOfPLayer;
let isAI = false;
let isAITurn = false;

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

document.getElementById("form1").addEventListener("submit", (event) => {
    event.preventDefault()
    submit.disabled = true
    submit.style.opacity = 0.5
    preSound.loop = "false"
    preSound.pause()
    target = parseInt(targetScore.value)

    const RadioValue = () => {
        const ele = document.getElementsByName('numOfPLayers');
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked)
                numOfPLayer = ele[i].value;
        }
    }
    RadioValue()
    if (numOfPLayer == 2) {
        console.log("enterd my player 2 zone");
        preGame.classList.add("clicked")
        left.classList.add("active")
        left.classList.remove("loser")
        isAI = false
        init(name1.value, name2.value, targetScore.value) // call the game function to initialize the game
    } else {
        console.log("enterd my player 1 zpne");
        isAI = true;
        setUpAI()
    }

})
// function myCode(event) {
//     // event.preventDefault()
//     return false
// }

// submit.addEventListener("click", (event) => {
//     submit.disabled = true
//     submit.style.opacity = 0.5
//     preSound.loop = "false"
//     preSound.pause()
//     target = parseInt(targetScore.value)
//     // if (50 <= target && target <= 200) {
//     //     console.log(target)
//     //     console.log("correct");
//     // } else (
//     //     console.log("wrong")
//     // )
//     const RadioValue = () => {
//         const ele = document.getElementsByName('numOfPLayers');
//         for (i = 0; i < ele.length; i++) {
//             if (ele[i].checked)
//                 numOfPLayer = ele[i].value;
//         }
//     }
//     RadioValue()
//     console.log(numOfPLayer);
//     // if (numOfPLayer == 2) {
//     //     console.log("enterd my player 2 zone");
//     //     preGame.classList.add("clicked")
//     //     left.classList.add("active")
//     //     left.classList.remove("loser")
//     //     isAI = false
//     //     init(name1.value, name2.value, targetScore.value) // call the game function to initialize the game
//     // } else {
//     //     console.log("enterd my player 1 zpne");
//     //     isAI = true;
//     // }

//     init(name1.value, name2.value, target)

// })
function setUpAI() {
    fetch("https://api.fungenerators.com/name/categories.json?start=0&limit=5")
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong')
        })

        .then((data) => {
            let gen = data.contents[1].name
            init(name1.value, gen, targetScore.value)
        })
        .catch((error) => {
            console.log("my error is here as well");
            preGame.classList.add("clicked")
            left.classList.add("active")
            left.classList.remove("loser")
            if (name1.value.split(" ") === undefined) {
                let gen1 = [...name1.value.split(" ")[0]].reverse().sort((a, b) => a - b).join("")
                let gen2 = [...name1.value.split(" ")[1]].reverse().sort((a, b) => b - a).join("")
                let gen = gen1 + " " + gen2
                init(name1.value, gen, targetScore.value)
            } else {
                let gen = name1.value.split("").reverse().sort((a, b) => b - a).join("")
                init(name1.value, gen, targetScore.value)

            }
        });

}



// initializing the game set-up players names and target score
function init(name1, name2, targetScore) {
    preGame.classList.add("clicked")
    left.classList.add("active")
    left.classList.remove("loser")
    bg_music.play()
    bg_music.volume = 0.05
    submit.disabled = false
    submit.style.opacity = 1
    nameOne.innerText = name1
    nameTwo.innerText = name2
    targetSpan.innerText = `target: ${targetScore}`
    holdButton.disabled = true
    // return false
}

newGameButton.addEventListener("click", newGame)

//new game functionality
function newGame() {
    winSound.pause()
    loseSound.pause()
    rollSound.pause()
    holdSound.pause()
    bg_music.pause()
    doubleSixSound.pause()
    preSound.loop = "true"
    preSound.play()
    current1 = 0
    current2 = 0
    total1 = 0
    total2 = 0
    playerOneTotal.innerText = total1
    playerTwoTotal.innerText = total2
    playerOneCurrent.innerText = current1
    playerTwoCurrent.innerText = current2
    left.classList.remove("winner")
    left.classList.remove("active")
    left.classList.add("loser")
    right.classList.remove("winner")
    right.classList.remove("loser")
    right.classList.remove("active")
    right.classList.add("dimmed")
    name1.value = ""
    name2.value = ""
    name2.disabled = true
    radio1.checked = true
    preGame.classList.remove("clicked")
    rollDiceButton.disabled = false
    holdButton.disabled = true
    isAI = false
    isAITurn = false
    activePlayer = 1
    nameOne.innerText = "play"
    nameTwo.innerText = "play"
    targetSpan.innerText = "target: "
    msg1.innerText = "you"
    msg2.innerText = "you"
    msg1.style.visibility = "hidden"
    msg2.style.visibility = "hidden"
}

rollDiceButton.addEventListener("click", roll)

// roll functionality
function roll() {
    rollSound.volume = 1
    rollSound.play()
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
                endOfTurnSixes()
            }
            rollDiceButton.disabled = false
            setTimeout(() => holdButton.disabled = false, 100)
        }
    }, 100)
    accumulateCurrent(sum)
}

function accumulateCurrent(sum) {
    if (activePlayer === 1) {
        current1 += sum
        playerOneCurrent.innerText = current1
    } else {
        current2 += sum
        playerTwoCurrent.innerText = current2
    }
    // return false
}

function endOfTurnSixes() {
    doubleSixSound.play()
    if (activePlayer === 1) {
        current1 = 0
        playerOneCurrent.innerText = current1
        activePlayer = 2
        isAITurn = true
    } else {
        current2 = 0
        playerTwoCurrent.innerText = current2
        activePlayer = 1
    }
    if (isAI && isAITurn) {
        newTurnAI()
    } else {
        newTurn()
    }
}


holdButton.addEventListener("click", hold)
function hold() {
    holdSound.play()
    // bg_music.pause()
    console.log(isAI);
    if (isAI) {
        console.log("there is ai");
        if (isAITurn) {
            console.log("its ai turn");
            total2 += current2
            playerTwoTotal.innerText = total2
            console.log("next step", total2, target);
            if (total2 === target) {
                winner = 2
                loser = 1
                msg2.innerText = "You Win!"
                msg1.innerText = name1.value + " reached the target, you lost"

                handleSounds()
            } else if (total2 > target) {
                console.log("did i reach this line");
                winner = 1
                loser = 2
                msg2.innerText = "Passed the target, you lost"
                msg1.innerText = "You win!"
                handleSounds()
            } else {
                current2 = 0
                playerTwoCurrent.innerText = current2
                activePlayer = 1
                isAITurn = false
                console.log("yes i have reached this point 2");
                // holdSound.pause()
                holdButton.disabled = true
                newTurn()
            }

        } else {
            console.log("not ai turn");
            total1 += current1
            playerOneTotal.innerText = total1
            if (total1 === target) {
                winner = 1
                loser = 2
                msg1.innerText = "You Win!"
                msg2.innerText = name1.value + " reached the target, you lost"
                handleSounds()
            } else if (total1 > target) {
                winner = 2
                loser = 1
                msg1.innerText = "Passed the target, you lost"
                msg2.innerText = "You win!"
                handleSounds()
            } else {
                current1 = 0
                playerOneCurrent.innerText = current1
                activePlayer = 2
                isAITurn = true
                console.log("yes i have reached this point 1");
                // holdSound.pause()
                holdButton.disabled = true
                newTurnAI()
            }

        }
    } else {
        if (activePlayer === 1) {
            total1 += current1
            playerOneTotal.innerText = total1
            console.log(total1, typeof target);
            if (total1 === target) {
                winner = 1
                loser = 2
                msg1.innerText = "You Win!"
                msg2.innerText = name1.value + " reached the target, you lost"
                handleSounds()
            } else if (total1 > target) {
                winner = 2
                loser = 1
                msg1.innerText = "Passed the target, you lost"
                msg2.innerText = "You win!"
                handleSounds()
            } else {
                current1 = 0
                playerOneCurrent.innerText = current1
                activePlayer = 2
                // holdSound.pause()
                holdButton.disabled = true
                newTurn()
            }
        } else {
            total2 += current2
            playerTwoTotal.innerText = total2
            if (total2 === target) {
                winner = 2
                loser = 1
                msg2.innerText = "You Win!"
                msg1.innerText = name2.value + " reached the target, you lost"
                handleSounds()
            } else if (total2 > target) {
                winner = 1
                loser = 2
                msg2.innerText = "Passed the target, you lost"
                msg1.innerText = "You win!"
                handleSounds()
            }
            else {
                current2 = 0
                playerTwoCurrent.innerText = current2
                activePlayer = 1
                // holdSound.pause()
                holdButton.disabled = true
                newTurn()
            }
        }
    }
}

function newTurnAI() {
    // doubleSixSound.pause()
    console.log("entered ai turn");
    newTurn()
    rollDiceButton.disabled = true
    if (target - total2 >= 100) {
        let i = 0;
        const rollIAI = setInterval(function () {
            console.log("1");
            roll()
            i++
            if (i > 2) {
                clearInterval(rollIAI)
                console.log("you have reached end of interval");
                setTimeout(hold, 1000)
            }
        }, 1000)
    } else if (50 < target - total2 < 100) {

        let i = 0;
        const rollIAI = setInterval(function () {
            console.log("2");
            roll()
            i++
            if (i > 1) {
                clearInterval(rollIAI)
                console.log("you have reached end of interval");
                setTimeout(hold, 1000)

            }
        }, 500)
    } else {
        console.log("3");
        roll()
        setTimeout(hold, 1000)


    }
}

function newTurn() {
    // doubleSixSound.pause()
    console.log("wow its not good");
    rollDiceButton.disabled = false; console.log("on this line 1");
    holdButton.disabled = true; console.log("on this line 2");
    if (activePlayer === 1) {
        left.classList.add("active")
        left.classList.remove("dimmed")
        right.classList.add("dimmed")
        right.classList.remove("active")
    } else {
        right.classList.add("active")
        right.classList.remove("dimmed")
        left.classList.add("dimmed")
        left.classList.remove("active")
    }
    // return false
}

function handleSounds() {
    bg_music.pause()
    holdSound.pause()
    rollSound.pause()
    if (isAI) {
        if (winner === 1) {
            winSound.play()
            endGame()
        } else {
            loseSound.play()
            endGame()
        }
    } else {
        winSound.play()
        endGame()
    }
}

function endGame() {
    current1 = 0
    current2 = 0
    playerOneCurrent.innerText = current1
    playerTwoCurrent.innerText = current2
    rollDiceButton.disabled = true
    holdButton.disabled = true
    if (winner === 1) {
        left.classList.add("winner")
        left.classList.remove("active")
        left.classList.remove("dimmed")
        right.classList.add("loser")
        right.classList.remove("dimmed")
        right.classList.remove("active")
    } else {
        right.classList.add("winner")
        right.classList.remove("active")
        right.classList.remove("dimmed")
        left.classList.add("loser")
        left.classList.remove("active")
        left.classList.remove("dimmed")
    }
    // return false
}

// signature
