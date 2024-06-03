// we just need 50 tests passed
class Agent {

    constructor() {
        // nada
    }

    minimax(board, isMaximizing) {

        // Initialize optimal value
        let optimalValue = isMaximizing ? -Infinity : Infinity;

        // Check if game is over before minimax
        const gameStatus = board.gameOver();
        if (gameStatus !== 0) return gameStatus === 1 ? 1 : gameStatus === 2 ? -1 : 0;

        // Loop through all cells
        for (let p = 0; p < 9; p++) {

            const newPosition = p + 1;

            // if cell is free
            if (board.cellFree(newPosition)) {

                // Clone the board
                const clonedBoard = board.clone();

                // Test it on a theoretical board
                clonedBoard.move(newPosition);

                // recursive call
                const evaluatedValue = this.minimax(clonedBoard, !isMaximizing);

                // min/max
                optimalValue = isMaximizing ?
                    Math.max(optimalValue, evaluatedValue) :
                    Math.min(optimalValue, evaluatedValue);

            }
        }

        // Got what we needed
        return optimalValue;
    }


    selectMove(board) {

        // the moves we wanna make
        const moves = [];

        for (let c = 0; c < 9; c++) {

            // New cell num
            const newCell = c + 1;

            // When cell is free/
            if (board.cellFree(newCell)) {

                // use the minimax on test board
                const cloneBoard = board.clone();
                cloneBoard.move(newCell);
                const optimalValue = this.minimax(cloneBoard, !board.playerOne);

                // add the move to do
                moves.push({ cell: newCell, newValue: optimalValue });

            }
        }
    
        // reducing the movies list and getting the best move
        const bestMove = moves.reduce((best, move) => {

            // if player one, we want the max value
            if (board.playerOne) return move.newValue > best.newValue ? move : best;
            else return move.newValue < best.newValue ? move : best;
            
        }, {
            cell: null,
            newValue: board.playerOne ? -Infinity : Infinity
        });
    
        // REtuirn it
        return bestMove.cell;
    }
    
}
