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
                cell.addEventListener('click', function(){
                    SquareClicked(row, col);
                });
            }
            board.appendChild(cell);
        }
    }

    document.body.appendChild(board);
}

function NewGame() {
    boardArray = Array.from(Array(boardHeight), () => new Array(boardWidth));
    UpdateBoard();
}

let currColor = 1;
function SquareClicked(row, col) {
    boardArray[row][col] = currColor;
    currColor = -currColor;
    UpdateBoard();
}
