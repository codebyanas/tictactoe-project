let currentPlayer = 'X'
let gameBoard = ['', '', '', '', '', '', '', '', '']
let gameActive = true

const makeMove = (index) => {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer
        document.getElementsByClassName('cell')[index].innerText = currentPlayer

        const cellElement = document.getElementsByClassName('cell')[index];
        // Apply styles based on the current player
        cellElement.innerText = currentPlayer;
        if (currentPlayer === 'X') {
            cellElement.style.color = 'rgba(249, 5, 29, 0.97)';
        } else {
            cellElement.style.color = '#0dcaf0';
        }

        if (checkWinner()) {
            document.getElementById('result').innerText = `Player ${currentPlayer} wins!`
            document.getElementById('turn').innerText = ''
            gameActive = false
        } else if (gameBoard.every(Boolean)) {
            document.getElementById('result').innerText = 'It\'s a draw.'
            gameActive = false
        } else {
            if (currentPlayer === 'X') {
                currentPlayer = 'O'
                document.getElementById('turn').innerText = `Turn of ${currentPlayer}`
            } else {
                currentPlayer = 'X'
                document.getElementById('turn').innerText = `Turn of ${currentPlayer}`
            }

        }
    }
}

const checkWinner = () => {
    const winningMatch = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ]

    return winningMatch.some((match) => {
        return match.every((cell) => {
            return gameBoard[cell] !== '' && gameBoard[cell] === gameBoard[match[0]]
        })
    })
}

const resetGame = () => {
    // Clear the result and turn elements
    document.getElementById('result').innerText = ''
    document.getElementById('turn').innerText = `Turn of X`

    // Clear the board display
    const cells = document.getElementsByClassName('cell')
    Array.from(cells).forEach((cell) => {
        cell.innerText = ''
    })

    // Reset game-related variables
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
}

const resetButton = document.getElementById('reset')

resetButton.addEventListener('click', (e) => {
    resetGame()
})



