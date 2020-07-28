document.addEventListener('DOMContentLoaded', startGame)
document.addEventListener('DOMContentLoaded', setAudioVar)

function setAudioVar(){
  var gamestart = document.getElementById("gamestart");
  gamestart.loop = false;
  var coin = document.getElementById("coin");
  coin.loop = false;
  var mark = document.getElementById("mark");
  mark.loop = false;
  var win = document.getElementById("win");
  win.loop = false;
  var bomb = document.getElementById("bomb");
  bomb.loop = false;
  var gameover = document.getElementById("gameover");
  gameover.loop = false;
  bomb.addEventListener('ended', function(){
    gameover.play();
  });
}

function stopAudio() {
  gamestart.pause()
  gamestart.currentTime = 0;
  coin.pause()
  coin.currentTime = 0;
  mark.pause()
  mark.currentTime = 0;
  win.pause()
  win.currentTime = 0;
  bomb.pause()
  bomb.currentTime = 0;
  gameover.pause()
  gameover.currentTime = 0;
}

var board = { }

// function createBoard () {
//   board.cells = []

//   for (var i = 0; i < 4; i++) {
//     board.cells.push({row: 0, col: (i), isMine: (Math.random() < 0.3), isMarked: false, hidden: true})
//     } 
//   for (var i = 0; i < 4; i++) {
//     board.cells.push({row: 1, col: (i), isMine: (Math.random() < 0.3), isMarked: false, hidden: true})
//     } 
//   for (var i = 0; i < 4; i++) {
//     board.cells.push({row: 2, col: (i), isMine: (Math.random() < 0.3), isMarked: false, hidden: true})
//     } 
//   for (var i = 0; i < 4; i++) {
//     board.cells.push({row: 3, col: (i), isMine: (Math.random() < 0.3), isMarked: false, hidden: true})
//     } 

//     for (var i = 0; i < board.cells.length; i++) {
//       board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
//     }
// }

function createBoard () {
  board.cells = []

  for (var r = 0; r < 4; r++) {
    for (var c = 0; c < 4; c++) {
      board.cells.push({row: (r), col: (c), isMine: (Math.random() < 0.3), isMarked: false, hidden: true})
      } 
  }

  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
}


function startGame () {
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);
  document.getElementById("reset").addEventListener("click", resetBoard); 

  createBoard()

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  if (board.cells.every((cell) => (cell.isMine == false && cell.hidden == false) || (cell.isMine == true && cell.isMarked == true))) {
    win.play()
    lib.displayMessage('You win!');
    }
  }
// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.

function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;

  for (var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine == true) {
      count++;
    }
  }
  return count
}

function resetBoard() {
  document.getElementsByClassName("board")[0].remove();
  newBoard = document.createElement("div")
  newBoard.className = 'board'
  document.getElementsByTagName('body')[0].insertBefore(newBoard, document.getElementById('reset'))

  board = {}
  
  createBoard()

  lib.initBoard()

  stopAudio()
  gamestart.play()
}
