const board = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (gameState[index] !== '' || !isGameActive) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `Player ${currentPlayer} has won!`;
        isGameActive = false;
    } else if (!gameState.includes('')) {
        message.textContent = 'Game ended in a draw!';
        isGameActive = false;
    }
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    message.textContent = '';
    board.forEach(cell => cell.textContent = '');
}

board.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

