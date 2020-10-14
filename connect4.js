/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 *  */

//Set width(columns) and height(rows) for game board
const WIDTH = 7;
const HEIGHT = 6;

//Assign game board and current player
let board = [];
let currPlayer = 1;


// Loop through HEIGHT length to add WIDTH length to generate board 
function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from( {length: WIDTH }))
  }
};


/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  const board = $('#board');
  board.html('');

  //create the top row of the board where users will drop their pieces
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  };
  board.append(top);

  // create the remaining rows of the actual game board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      cell.setAttribute("class", "cell")
      row.append(cell);
    }
    board.append(row);
  }

};


/** lowestOpenRow: given column x, return top empty y (null if filled) */
function lowestOpenRow(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
};



/** placeInBoard: update DOM to place piece into HTML table of board */
function placeInBoard(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece', `p${currPlayer}`);

  let cell = document.getElementById(`${y}-${x}`);  
  cell.append(piece)
};


/** endGame: announce game end */
function endGame(msg) {
  // pop up alert message
  alert(msg)
};



/** handleClick: handle click of column top to play piece */
// Do not allow play if no more rows in that column are available
function handleClick(evt) {
  // adding the "+" sign makes converts the value from a string to a number
  let x = +evt.target.id;
  let y = lowestOpenRow(x);
  if (y === null) {
    return;
  }

  board[y][x] = currPlayer;
  placeInBoard(y, x);


if (checkForWin()) {
  return endGame(`player ${currPlayer} won!`)
};

 // check for tie
 if (board.every(row => row.every(cell => cell))) {
  alert("It's a tie!")
};

  // If game is ongoing, switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
  const turnDisplay = document.querySelector(".turn");
  if (currPlayer === 1) {
    turnDisplay.innerHTML = "Player One's Turn"
  }
  if (currPlayer === 2) {
    turnDisplay.innerHTML = "Player Two's Turn"
  };

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

  // iterate through board, define horizontal, vertical, diagonal right and diagonal left winning combinations

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
  };
};

makeBoard();
makeHtmlBoard();
