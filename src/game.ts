type Board = number[][];

/**
 * Return a shuffled board with the given dimensions.
 * The board is shuffled with an odd number of random moves to ensure it is solvable, and not null.
 */
function generateBoard(x: number, y: number): Board {
    const dimX = Math.max(+x, +y) || 7;
    const dimY = Math.min(+x, +y) || 5;

    const board = Array.from({ length: dimY }, () =>
        Array.from({ length: dimX }, () => 0)
    );

    return shuffle(board, 2 * (dimX + dimY) + 1);
}

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

/**
 * Return a boolean indicating if the board is solved.
 */
function isWin(board: Board): boolean {
    return board.every((line) => !line.includes(1));
}
