class Engine {
    ctx: HTMLDivElement | undefined;
    cells: HTMLDivElement[][] = [];

    constructor(ctx?: HTMLDivElement) {
        this.ctx = ctx;
    }

    /**
     * Set the container to display the game
     */
    to(ctx: HTMLDivElement) {
        if (ctx instanceof HTMLDivElement) {
            ctx.innerHTML = "";
            this.ctx = ctx;
        }
        return this;
    }

    /**
     * Initialize the game grid and render it in the container for the first time.
     */
    init(board: Board) {
        if (!this.ctx) {
            console.error("Context is not set. Use 'to' method to set it.");
            return;
        }

        this.ctx.innerHTML = "";
        this.cells = [];

        const grid = document.createElement("div");
        grid.className = "game-grid";

        board.grid.forEach((row, x) => {
            const rowDiv = document.createElement("div");
            const cellRow: HTMLDivElement[] = [];
            row.forEach((cell, y) => {
                const cellDiv = document.createElement("div");
                cellDiv.className = "light";
                cellDiv.classList.toggle("on", !!cell);
                cellDiv.dataset.x = x.toString();
                cellDiv.dataset.y = y.toString();

                cellDiv.addEventListener("click", () => {
                    board.hit(x, y);
                    this.update(board, x, y);
                });

                rowDiv.appendChild(cellDiv);
                cellRow.push(cellDiv);
            });

            this.cells.push(cellRow);
            grid.appendChild(rowDiv);
        });

        const attemptDiv = document.createElement("p");
        attemptDiv.className = "attempts";
        attemptDiv.innerHTML = `<b>Attempts:</b> ${board.attempt}`;

        this.ctx.appendChild(grid);
        this.ctx.appendChild(attemptDiv);
    }

    /**
     * Update the affected cells and the attempt counter after a click.
     */
    update(board: Board, x: number, y: number) {
        if (!this.ctx) return;

        board.adjacents(x, y).forEach(([i, j]) => {
            const cell = this.cells[i][j];
            cell.classList.toggle("on", !!board.grid[i][j]);
        });

        const attemptDiv = this.ctx.querySelector(".attempts");

        if (board.isWin()) {
            this.defuse();
            if (attemptDiv)
                attemptDiv.innerHTML = `<b>YOU WON!</b> Attempts: ${board.attempt}`;
            return;
        }

        if (attemptDiv) {
            attemptDiv.innerHTML = `<b>Attempts:</b> ${board.attempt}`;
        }
    }

    /**
     * Reset the game grid and remove all event listeners.
     */
    defuse() {
        this.cells = [];
        const gameContainer = this.ctx?.querySelector(".game-grid");
        if (gameContainer) {
            // cloneNode does not copy the event listeners
            const fake = gameContainer.cloneNode(true) as HTMLDivElement;
            gameContainer.replaceWith(fake);
        }
    }
}
