document.addEventListener('DOMContentLoaded', startGame)

var board = {
  cells: [
    {row: 0, col: 0, isMine: true, isHidden: true, hidden: true}, 
    {row: 0, col: 1, isMine: false, isHidden: true, hidden: true}, 
    {row: 1, col: 0, isMine: false, isHidden: true, hidden: true}, 
    {row: 1, col: 1, isMine: false, isHidden: true, hidden: true}
  ]
}

function startGame () {
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  // iterate through each object in the array
  // if the property isMine = false, also check if hidden = false
  // if the property isMine = true, also check if isMarked = true
  // return winning message
  
  let result = board.cells.every((cell) => (cell.isMine == false && cell.hidden == false) || (cell.isMine == true && cell.isMarked == true));

  console.log(result)

  if (result == true) {
    lib.displayMessage('You win!')
  }
  







  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
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
}

