type Board = number[][];

/**
 * Shuffle a given board a given number of times.
 */
function shuffle(board: Board, shuffles: number): Board {
    for (let k = 1; k <= shuffles; k++) {
        const i = Math.floor(Math.random() * board.length);
        const j = Math.floor(Math.random() * board[0].length);
        board = changeState(board, i, j);
    }

    return board;
}

/**
 * Change the state of a case and its adjacent in a given board.
 */
function changeState(board: Board, i: number, j: number): Board {
    const directions = [
        [0, 0],
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    for (const [dx, dy] of directions) {
        const x = i + dx;
        const y = j + dy;
        if (board[x] && board[x][y] !== undefined) {
            board[x][y] = 1 - board[x][y];
        }
    }

    return board;
}
