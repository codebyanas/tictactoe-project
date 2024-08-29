// Step 1: Initial Variables

let currentPlayer = 'X';   // 'X' starts the game
let gameBoard = ['', '', '', '', '', '', '', '', ''];  // Represents the Tic Tac Toe board
let gameActive = true;     // Indicates whether the game is still active
document.getElementById('turn').innerText = `Turn of ${currentPlayer}`

/*
Explanation:

    currentPlayer: Represents the current player ('X' or 'O').
    gameBoard: An array representing the Tic Tac Toe board. It keeps track of the symbols in each cell.
    gameActive: A boolean indicating whether the game is still active.
*/

// Step 2: makeMove Function

const makeMove = (index) => {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        document.getElementsByClassName('cell')[index].innerText = currentPlayer;

        const cellElement = document.getElementsByClassName('cell')[index];
        // Apply styles based on the current player
        cellElement.innerText = currentPlayer;
        if (currentPlayer === 'X') {
            cellElement.style.color = 'rgba(249, 5, 29, 0.97)';
        } else {
            cellElement.style.color = '#0dcaf0';
        }

        if (checkWinner()) {
            document.getElementById('result').innerText = `Player ${currentPlayer} wins!`;
            gameActive = false;  // Set gameActive to false to stop further moves
        }
        else if (gameBoard.every(Boolean)) {
            document.getElementById('result').innerText = 'It\'s a draw!';
            document.getElementById('turn').innerText = '' // Empty the turn para when someone win
            gameActive = false;  // Set gameActive to false to stop further moves
        }
        else {
            if (currentPlayer === 'X') {
                currentPlayer = 'O';
                document.getElementById('turn').innerText = `Turn of ${currentPlayer}`
            } else {
                currentPlayer = 'X';
                document.getElementById('turn').innerText = `Turn of ${currentPlayer}`
            }
            // Switch to the other player for the next move
        }
    }
};

/*
Explanation:

    makeMove is an arrow function that takes an index parameter representing the index of the clicked cell.
    It checks if the selected cell is empty (gameBoard[index] === '') and if the game is still active (gameActive).
    If the conditions are met, it updates the board, displays the current player's symbol in the selected cell, and checks for a winner or a draw.
    If there is a winner, it displays the result and sets gameActive to false. If it's a draw, it does the same. Otherwise, it switches to the other player for the next move.

*/


// Step 3: checkWinner Function

const checkWinner = () => {
    const winningMatch = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ]

    return winningMatch.some((match) => {
        return match.every((cell) => {
            return gameBoard[cell] !== '' && gameBoard[cell] === gameBoard[match[0]];
        });
    });
}

/*
    Winning Combinations (winningMatch):
        It's an array that contains arrays of indices representing winning combinations in Tic Tac Toe.
        Each sub-array (match) represents a way to win, either in a row, column, or diagonal.

    Checking for a Winner (`winningMatch.some()):
        The some function is used to check if at least one of the winning combinations (match) results in a win.
        It goes through each winning combination and checks if the condition inside the every function is true for any of them.

    Checking Each Index in a Winning Combination (`match.every()):
        The every function is used to check if a specific winning combination (match) satisfies a condition for every index in that combination.
        The condition involves two checks:
            gameBoard[cell] !== '': Ensures the cell at the current index is not empty.
            gameBoard[cell] === gameBoard[match[0]]: Ensures that the value at the current index is the same as the value at the first index of the winning combination (match).
        This means that all indices in a winning combination must have the same non-empty value.

    Return Value:
        The every function returns true if the condition is satisfied for every index in the winning combination (match).
        The some function returns true if at least one winning combination results in a win.

So, in simpler terms, the checkWinner function looks at each possible way to win the game (rows, columns, and diagonals). It checks if all cells in any of these winning combinations have the same non-empty value. If at least one winning combination meets this condition, the function returns true, indicating that there is a winner. Otherwise, it returns false.
*/

// Reset Button
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