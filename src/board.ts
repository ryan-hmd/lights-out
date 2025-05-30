class Board {
    grid: (1 | 0)[][];
    attempt: number = 0;
    dimX: number;
    dimY: number;

    constructor(x: any, y: any) {
        this.dimX = Math.max(+x, +y) || 7;
        this.dimY = Math.min(+x, +y) || 5;
        this.grid = this.generateBoard(this.dimX, this.dimY);
    }

    /**
     * Return a shuffled board with the given dimensions.
     * The board is shuffled with an odd number of random moves to ensure it is solvable, and not null.
     */
    generateBoard(x: number, y: number) {
        this.grid = Array.from({ length: y }, () =>
            Array.from({ length: x }, () => 0)
        );
        this.shuffle();
        return this.grid;
    }

    /**
     * Shuffle a given board a given number of times.
     */
    shuffle(shuffles: number = 2 * (this.dimX + this.dimY) + 1) {
        for (let k = 1; k <= shuffles; k++) {
            const i = Math.floor(Math.random() * this.grid.length);
            const j = Math.floor(Math.random() * this.grid[0].length);
            this.hit(i, j);
        }
        this.attempt = 0;
        return this;
    }

    /**
     * Get a cell and its adjacent cells.
     */
    adjacents(i: number, j: number) {
        const directions = [
            [0, 0],
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];
        return directions
            .map(([dx, dy]) => [i + dx, j + dy])
            .filter(([x, y]) => this.grid[x] && this.grid[x][y] !== undefined);
    }

    /**
     * Change the state of a cell and its adjacent cells in a given board.
     */
    hit(i: number, j: number) {
        this.adjacents(i, j).forEach(([x, y]) => {
            this.grid[x][y] = (1 - this.grid[x][y]) as 1 | 0;
        });
        this.attempt++;
        return this;
    }

    /**
     * Determine if the board is solved.
     */
    isWin(): boolean {
        return this.grid.every((row) => !row.includes(1));
    }
}
