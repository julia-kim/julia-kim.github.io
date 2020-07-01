/*----- event listeners -----*/

document.addEventListener("DOMContentLoaded", () => {
  generateCumArray()
  generateRandomBoard()
  document.querySelector("#start-game").onclick = () => {
    document.querySelector(".overlay").style.display = "none"
    document.querySelector("#start-game").style.display = "none"
    countDown()
  }
  document.querySelectorAll(".tile").forEach((tile) => {
    tile.onclick = () => {
      const isNeighbour = checkNeighbour(tile, neighbourhood)
      if (tile.classList.contains("chosen")) {
        undo(tile)
      } else if (document.querySelectorAll(".chosen").length === 0 || (isNeighbour === true && charArray.length < 8)) {
        tile.classList.add("chosen")
        makeString(tile)
        getNeighbours(tile)
      }
      checkWord()
    }
  })
  // submit on press enter (13) or space (32) key
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault()
      document.querySelector("#submit").click()
    }
  })
  document.querySelector("#submit").onclick = submitWord
  document.querySelector("#play-again").onclick = newGame
})

/*----- global variables -----*/

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const frequencies = [8.12, 1.49, 2.71, 4.32, 12.02, 2.30, 2.03, 5.92, 7.31, 0.10, 0.69, 3.98, 2.61, 6.95, 7.68, 1.82, 0.11, 6.02, 6.28, 9.10, 2.88, 1.11, 2.09, 0.17, 2.11, 0.07]
const cumFrequencies = []
var timeLeft = 120000 // in milliseconds
var neighbourhood = [] 
var charArray = [] 
var playerScore = 0
var letterString = ""

/*----- functions -----*/

function generateCumArray() {
  let sum = 0
  for (let i = 0; i < frequencies.length; i++) {
    sum += frequencies[i]
    cumFrequencies.push(sum)
  }
}

function generateRandomLetter() {
  const random = Math.random() * 100
  for (let i = 0; i < alphabet.length; i++) {
    if  (cumFrequencies[i] > random) {
      return alphabet[i]
    }
  }
}

function generateRandomBoard() {
  document.querySelectorAll("td").forEach((cell) => {
    cell.innerHTML = generateRandomLetter()
  })
}

function countDown() {
  let timer = setInterval(() => {
    timeLeft -= 1000
    let minutes = Math.floor(timeLeft / 60000)
    let seconds = Math.floor((timeLeft % 60000) / 1000)
    if (seconds < 10) {
      seconds = "0" + seconds
    }
    if (timeLeft === 0) {
      clearInterval(timer)
      endGame()
    }
    document.querySelector("#timer").innerHTML = minutes + ":" + seconds
  }, 1000)
}

function makeString(tile) { 
  letterString += tile.innerHTML 
  document.querySelector("#word").innerHTML = letterString
  charArray.push(tile.id)
}

function undo(tile) {
  let index
  for (let i = 0; i < charArray.length; i++) {
    if (charArray[i] === tile.id) {
      index = i
      break
    }
  }
  for (let j = index; j < charArray.length; j++) {
    document.querySelectorAll(".tile").forEach((cell) => {
      if (cell.id === charArray[j]) {
        cell.classList.remove("chosen")
      }
    })
  }
  letterString = letterString.substring(0, index)
  charArray.splice(index, charArray.length)
  const target = document.getElementById(charArray[index - 1])
  if (target) getNeighbours(target)
  document.querySelector("#word").innerHTML = letterString
}

function getNeighbours(tile) {
  neighbourhood = []
  const row = parseInt(tile.dataset.row)
  const col = parseInt(tile.dataset.col)
  const tiles = document.querySelectorAll(".tile")
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] === tile) {
      if (row === 0 && col === 0) {
        neighbourhood.push(i + 1, i + 6, i + 7)
      } else if (row === 0 && col === 5) {
        neighbourhood.push(i - 1, i + 5, i + 6)
      } else if (row === 5 && col === 0) {
        neighbourhood.push(i - 6, i - 5, i + 1)
      } else if (row === 5 && col === 5) {
        neighbourhood.push(i - 7, i - 6, i - 1)
      } else if (col === 0 && row > 0 && row < 5) {
        neighbourhood.push(i - 6, i - 5, i + 1, i + 6, i + 7)
      } else if (row === 0 && col > 0 && col < 5) {
        neighbourhood.push(i - 1, i + 1, i + 5, i + 6, i + 7)
      } else if (col === 5 && row > 0 && row < 5) {
        neighbourhood.push(i - 7, i - 6, i - 1, i + 5, i + 6)
      } else if (row === 5 && col > 0 && col < 5) {
        neighbourhood.push(i - 7, i - 6, i - 5, i - 1, i + 1)
      } else {
        neighbourhood.push(i - 7, i - 6, i - 5, i - 1, i + 1, i + 5, i + 6, i + 7)
      }
    }
  }
}

function checkNeighbour(tile, neighbours) {
  const index = parseInt(tile.id)
  let isNeighbour = false
  for (let i = 0; i < neighbours.length; i++) {
    if (neighbours[i] === index) {
      isNeighbour = true
      break
    }
  }
  return isNeighbour
}

// load json file locally
function loadJSON(path, callback) {
  const xhr = new XMLHttpRequest()
  xhr.overrideMimeType("application/json")
  xhr.open("GET", path, true)
  xhr.responseType = 'json';
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == "200") {
      callback(xhr.response)
    }
  }
  xhr.send(null)
}

function checkWord() {
  const charCount = letterString.length
  if (charCount === 1) {
    document.querySelector("#word").style.color = "red"
  } else if (charCount > 1) {
    loadJSON(`dict/${charCount}-letter-words.json`, (response) => {
      const index = response.findIndex(
        (key) => key.word === letterString.toLowerCase()
      )
      if (index !== -1) {
        document.querySelector("#word").style.color = "inherit"
      } else {
        document.querySelector("#word").style.color = "red"
      }
    })
  }
}

function submitWord() {
  const charCount = letterString.length
  const isRepeat = checkForDupes()
  if (charCount > 1) {
    loadJSON(`dict/${charCount}-letter-words.json`, (response) => {
      const index = response.findIndex(
        (key) => key.word === letterString.toLowerCase()
      )
      if (index !== -1) {
        if (isRepeat === false) {
          addWord()
          updateScore()
          clearWord()
        } else {
          clearWord()
        }
      }
    })
  }
}

function checkForDupes() {
  let isRepeat = false
  const list = document.querySelector("#words").querySelectorAll("li")
  for (let item of list) {
    if (item.innerHTML === letterString) {
      isRepeat = true
      break
    }
  }
  return isRepeat
}

function addWord() {
  const li = document.createElement("li")
  li.innerHTML = letterString
  document.querySelector("#words").append(li)
}

function getHighScore() {
  if (!localStorage.getItem("highScore")) localStorage.setItem("highScore", 0)
  let hs = localStorage.getItem("highScore")
  if (playerScore > hs) {
    hs = playerScore
    localStorage.setItem("highScore", hs)
  }
  return hs
}

function updateScore() {
  switch (letterString.length) {
    case 2:
      playerScore += 2
      break
    case 3:
      playerScore += 3
      break
    case 4:
      playerScore += 8
      break
    case 5:
      playerScore += 15
      break
    case 6:
      playerScore += 18
      break
    case 7:
      playerScore += 28
      break
    case 8:
      playerScore += 40
      break
  }
  document.querySelector("#score").innerHTML = playerScore
}

function clearWord() {
  letterString = ""
  document.querySelector("#word").innerHTML = letterString
  // unselect all tiles
  document.querySelectorAll(".tile").forEach((tile) => {
    tile.classList.remove("chosen")
  })
  charArray = []
}

function endGame() {
  document.querySelector(".overlay").style.display = "block"
  document.querySelector("#game-over").style.display = "flex"
  document.querySelector("#high-score").innerHTML = getHighScore()
  document.querySelector("#player-score").innerHTML = playerScore
}

function newGame() {
  document.querySelector(".overlay").style.display = "none"
  document.querySelector("#timer").innerHTML = "2:00"
  document.querySelector("#score").innerHTML = 0 
  document
    .querySelector("#words")
    .querySelectorAll("li")
    .forEach((e) => e.parentNode.removeChild(e))
  clearWord()
  generateRandomBoard()
  playerScore = 0 // reset score
  timeLeft = 120000
  countDown()
}
