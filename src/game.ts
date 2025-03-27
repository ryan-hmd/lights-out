type Board = number[][];

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
            board[x][y] = (board[x][y] + 1) % 2;
        }
    }

    return board;
}
