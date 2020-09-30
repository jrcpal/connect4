/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// Set pre-determined number of columns and rows for game board matrix
const WIDTH = 7;
const HEIGHT = 6;
const turnDisplay = document.querySelector(".turn");
const reset = document.getElementById("reset");

// create variable for current game player 
let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
// Loop through Y axis (height/rows) to add X axis (width/columns) to generate board matrix
function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
};


/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  // get "htmlBoard" variable from the item in HTML w/ID of "board" to connect board table to DOM
  const board = document.querySelector("#board")
  // create "top" variable to generate the row above the board
  // set the "top" variable Attributes to connect CSS properties and add event listener 
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
// loop through width variable to create WIDTH number of columns
// for each column, set attributes and append it to the row
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  };
  //append the top row to the entire game board
  board.append(top);


  // create a loop of the y axis to generate a row
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    // nested for loop of the x axis to generate the columns where the pieces will go
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      cell.setAttribute("class", "cell")
      row.append(cell);
    }
    board.append(row);
  }
};

/** findSpotForCol: given column x, return top empty y (null if filled) */
// Decrement, or start at the bottom of the column, by looping through the height of the column and checking if the board coordinates of that space are empty
  // if the coordinates of that board are empty, return index y, otherwise return null to acknowledge that the column is full
  function findSpotForCol(x) {
    for (let y = HEIGHT - 1; y > -1; y--) {
      if (!board[y][x]) {
        return y;
      }
    }
    return null;
  }


/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div')
//piece color = current players color 
  piece.classList.add("piece", `p${currPlayer}`);

  let cell = document.getElementById(`${y}-${x}`);  
  cell.append(piece)

};

/** endGame: announce game end */
function endGame(msg) {
  // pop up alert message
  alert(msg)
};



/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
 
  // get x from ID of clicked cell
  // adding the "+" sign makes converts the value from a string to a number
  let x = +evt.target.id;
  // get next available spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  };

  // set current coordinates as the current player's spot 
  board[y][x] = currPlayer;
  // place piece in board and add to HTML table
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  };

  // check for tie
  if (board.every(row => row.every(cell => cell))) {
    alert("It's a tie!")
  };

  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
  if (currPlayer === 1) {
    turnDisplay.innerHTML = "Player One's Turn"
  }
  if (currPlayer === 2) {
    turnDisplay.innerHTML = "Player Two's Turn"
  }
};


/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  };

  // iterate through board matrix, define horizontal, vertical, diagonal right and diagonal left winning combinations

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // check if current player has achieved any winning combination
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
};

makeBoard();
makeHtmlBoard();

// reset.addEventListener("click", function(){
 
// })


