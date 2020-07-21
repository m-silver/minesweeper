document.addEventListener('DOMContentLoaded', startGame)

var board = { }
  /*cells: [
    {row: 0, col: 0, isMine: (Math.random() < 0.5), isMarked: true, hidden: true}, 
    {row: 0, col: 1, isMine: (Math.random() < 0.5), isMarked: true, hidden: true}, 
    {row: 0, col: 2, isMine: (Math.random() < 0.5), isMarked: true, hidden: true}, 
    {row: 1, col: 0, isMine: (Math.random() < 0.5), isMarked: true, hidden: true},
    {row: 1, col: 1, isMine: (Math.random() < 0.5), isMarked: true, hidden: true}, 
    {row: 1, col: 2, isMine: (Math.random() < 0.5), isMarked: true, hidden: true}, 
    {row: 2, col: 0, isMine: (Math.random() < 0.5), isMarked: true, hidden: true}, 
    {row: 2, col: 1, isMine: (Math.random() < 0.5), isMarked: true, hidden: true},
    {row: 2, col: 2, isMine: (Math.random() < 0.5), isMarked: true, hidden: true}
  ]
}*/

// AUDIO STUFF
/*var gamestart = document.getElementById("gamestart");
  gamestart.play();*/




function createBoard () {
  // assign property cells which has a value of an array to board object
  // add an object to the cells array, with properties of row, col, ismine, isMarked and hidden
  // do this x (4,9,16) times
  board.cells = []

  for (var i = 0; i < 3; i++) {
    board.cells.push({row: 0, col: (i), isMine: (Math.random() < 0.5), isMarked: false, hidden: true})
    } 
  for (var i = 0; i < 3; i++) {
    board.cells.push({row: 1, col: (i), isMine: (Math.random() < 0.5), isMarked: false, hidden: true})
    } 
  for (var i = 0; i < 3; i++) {
    board.cells.push({row: 2, col: (i), isMine: (Math.random() < 0.5), isMarked: false, hidden: true})
    } 

}

function startGame () {
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);



  createBoard()

  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  var win = document.getElementById("win");
  win.loop = false;
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

