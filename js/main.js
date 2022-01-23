const boardWidth = 15;
const boardHeight = 15;

const numPlayers = 3;
const playerColors = [ 'black', 'white', 'deeppink' ];
const playerColorsHighlight = [ '#404040', '#d0d0d0', 'pink' ];
const playerNames = [ 'Black', 'White', 'Pink' ];

const touchDevice = matchMedia('(hover: none)').matches;

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

            if (boardArray[row][col] < 0) {
                cell.style.setProperty('--background-color', playerColorsHighlight[currColor]);
                cell.addEventListener('click', function(){
                    SquareClicked(row, col);
                });
            }
            else {
                cell.style.backgroundColor = playerColors[boardArray[row][col]];
                cell.style.pointerEvents = 'none';
            }
            board.appendChild(cell);
        }
    }

    document.body.appendChild(board);
}

let gameOver = false;
let currColor = 0;
let numEmptyCells = boardWidth * boardHeight;
function NewGame() {
    gameOver = false;
    currColor = 0;
    numEmptyCells = boardWidth * boardHeight;
    boardArray = Array.from(Array(boardHeight), () => new Array(boardWidth).fill(-1));
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
        if (++currColor >= numPlayers)
            currColor -= numPlayers;
        UpdateBoard();
        CheckVictory(row, col);
    }

    if (touchDevice && !gameOver)
        document.body.style.backgroundColor = playerColors[currColor];
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
        setTimeout(function() { alert(playerNames[boardArray[row][col]] + ' won!'); NewGame(); }, 100);
    }
    else if (numEmptyCells < 1) {
        gameOver = true;
        setTimeout(function() { alert('Draw!'); NewGame(); }, 100);
    }
}
