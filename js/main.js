const boardWidth = 15;
const boardHeight = 15;

let boardArray;

function UpdateBoard() {
    document.body.innerHTML = '';

    const board = document.createElement('div');
    board.className = 'square-container';
    board.style.setProperty('--grid-cols', boardWidth);

    for (let row = 0; row < boardHeight; ++row) {
        for (let col = 0; col < boardWidth; ++col) {
            const cell = document.createElement('div');
            cell.className = 'square';
            if (boardArray[row][col] === 1) {
                cell.style.backgroundColor = 'black';
                cell.style.pointerEvents = 'none';
            }
            else if (boardArray[row][col] === -1) {
                cell.style.backgroundColor = 'white';
                cell.style.pointerEvents = 'none';
            }
            else {
                cell.style.setProperty('--background-color', currColor === 1 ? '#404040' : '#d0d0d0');
                cell.addEventListener('click', function(){
                    SquareClicked(row, col);
                });
            }
            board.appendChild(cell);
        }
    }

    document.body.appendChild(board);
}

let gameOver = false;
let currColor = 1;
let numEmptyCells = boardWidth * boardHeight;
function NewGame() {
    gameOver = false;
    currColor = 1;
    numEmptyCells = boardWidth * boardHeight;
    boardArray = Array.from(Array(boardHeight), () => new Array(boardWidth));
    UpdateBoard();
}

function SquareClicked(row, col) {
    // precaution from an extremely fast mouse clicker: we use setTimeout
    // in CheckVictory() to give UI a chance to redraw the board before
    // the win alert is thrown, so in theory some click event can be squeezed
    // in between
    if (!gameOver) {
        --numEmptyCells;
        boardArray[row][col] = currColor;
        currColor = -currColor;
        UpdateBoard();
        CheckVictory(row, col);
    }
}

function SpanLength(row, col, horDir, vertDir) {
    const color = boardArray[row][col];
    let len = 1;

    let x = row + horDir;
    let y = col + vertDir;
    while (x >= 0 && x < boardWidth && y >= 0 && y < boardHeight) {
        if (boardArray[x][y] != color)
            break;

        if (++len > 4)
            return 5;

        x += horDir;
        y += vertDir;
    }

    x = row - horDir;
    y = col - vertDir;
    while (x >= 0 && x < boardWidth && y >= 0 && y < boardHeight) {
        if (boardArray[x][y] != color)
            break;

        if (++len > 4)
            return 5;

        x -= horDir;
        y -= vertDir;
    }

    return len;
}

function CheckVictory(row, col) {
    if (SpanLength(row, col, 1, 0) > 4 || SpanLength(row, col, 0, 1) > 4 ||
        SpanLength(row, col, 1, 1) > 4 || SpanLength(row, col, 1, -1) > 4) {
        gameOver = true;
        // throwing alert right away results in the final cell being stuck in highlighted state
        setTimeout(function() { alert((boardArray[row][col] === 1 ? 'Black' : 'White') + ' won!'); NewGame(); }, 100);
    }
    else if (numEmptyCells < 1) {
        gameOver = true;
        setTimeout(function() { alert('Draw!'); NewGame(); }, 100);
    }
}
