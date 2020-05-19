function Player(mark, number) {
  this.mark = mark
  this.number = number
}

var player1 = new Player("X", 1)
var player2 = new Player("O", 2)
var currentPlayer = player1
var squares = document.getElementsByTagName("td")
var origText = document.getElementById("status").innerHTML

var winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function changeTurn() {
  if (currentPlayer === player1) {
    currentPlayer = player2
  } else {
    currentPlayer = player1
  }
  document.getElementById("status").innerHTML =
    "It's Player " + currentPlayer.number + "'s turn."
}

var markSquare = function (e) {
  var element = e.target
  if (element.className === "cell") {
    var chosenSquare = document.getElementById(element.id)
    if (chosenSquare.innerHTML === "") {
      chosenSquare.innerHTML = currentPlayer.mark
      checkGameWon()
      if (checkGameWon() === false && checkEmptySquares() !== 9) {
        changeTurn()
      }
    }
  }
}
document.addEventListener("click", markSquare)

function getPlayerMoves() {
  var playerMoves = []
  for (var i = 0; i < squares.length; i++) {
    if (squares[i].innerHTML === currentPlayer.mark) {
      playerMoves.push(+squares[i].id)
    }
  }
  return playerMoves
}

function checkGameWon() {
  var gameWon = false
  var plays = getPlayerMoves()
  for (var i = 0; i < winCombos.length; i++) {
    var targetArray = winCombos[i].every(function (value) {
      return plays.indexOf(value) >= 0
    })
    if (targetArray === true) {
      var winningRow = winCombos[i]
      gameWon = true
      break
    }
  }
  if (gameWon === true) {
    for (var j = 0; j < winningRow.length; j++) {
      document.getElementById(winningRow[j]).style.color = "#fffffe"
      document.getElementById(winningRow[j]).classList.add("animate")
      document.getElementById("status").innerHTML =
        "Player " + currentPlayer.number + " wins!"
    }
    endGame()
  }
  if (checkEmptySquares() === 9 && gameWon === false) {
    document.getElementById("status").innerHTML = "It's a tie!"
    endGame()
  }
  return gameWon
}

function checkEmptySquares() {
  var notEmpties = 0
  for (var i = 0; i < squares.length; i++) {
    if (squares[i].innerHTML !== "") {
      notEmpties += 1
    }
  }
  return notEmpties
}

function endGame() {
  document.removeEventListener("click", markSquare)
  document.getElementById("restart").innerHTML = "Play again?"
}

function restartGame() {
  document.addEventListener("click", markSquare)
  document.getElementById("status").innerHTML = origText
  document.getElementById("restart").innerHTML = "Restart Game"
  for (var i = 0; i < squares.length; i++) {
    squares[i].innerHTML = ""
    document.getElementById(i).style.color = ""
    document.getElementById(i).classList.remove("animate")
  }
  currentPlayer = player1
}
document.querySelector("#restart").addEventListener("click", restartGame)