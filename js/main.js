const boardWidth = 15;
const boardHeight = 15;

function NewGame() {
    const board = document.createElement('div');
    board.className = 'square-container';
    board.style.setProperty('--grid-cols', boardWidth);
    for (let c = 0; c < (boardWidth * boardHeight); ++c) {
        const cell = document.createElement('div');
        cell.className = 'square';
        cell.innerText = ' ';
        cell.style.pointerEvents = 'auto';
        board.appendChild(cell);
    }
    document.body.appendChild(board);
}
