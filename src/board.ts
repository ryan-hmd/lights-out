class Board {
    board: (1 | 0)[][];
    dimX: number;
    dimY: number;

    constructor(x: number, y: number) {
        this.dimX = Math.max(+x, +y) || 7;
        this.dimY = Math.min(+x, +y) || 5;
        this.board = this.generateBoard(this.dimX, this.dimY);
    }

    /**
     * Return a shuffled board with the given dimensions.
     * The board is shuffled with an odd number of random moves to ensure it is solvable, and not null.
     */
    generateBoard(x: number, y: number) {
        this.board = Array.from({ length: y }, () =>
            Array.from({ length: x }, () => 0)
        );
        return this.shuffle();
    }

    /**
     * Shuffle a given board a given number of times.
     */
    shuffle(shuffles: number = 2 * (this.dimX + this.dimY) + 1) {
        for (let k = 1; k <= shuffles; k++) {
            const i = Math.floor(Math.random() * this.board.length);
            const j = Math.floor(Math.random() * this.board[0].length);
            this.changeState(i, j);
        }
        return this.board;
    }

    /**
     * Change the state of a case and its adjacent in a given board.
     */
    changeState(i: number, j: number) {
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
            if (this.board[x] && this.board[x][y] !== undefined) {
                this.board[x][y] = (1 - this.board[x][y]) as 1 | 0;
            }
        }
        return this.board;
    }

    /**
     * Determine if the board is solved.
     */
    isWin(): boolean {
        return this.board.every((line) => !line.includes(1));
    }

    /**
     * Set vertical dimension of the board.
     */
    setY(y: number) {
        this.dimY = y;
        return this;
    }

    /**
     * Set horizontal dimension of the board.
     */
    setX(x: number) {
        this.dimX = x;
        return this;
    }
}
