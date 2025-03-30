class Engine {
    ctx: HTMLDivElement | undefined;

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
     * Actually not the best way to render the game, but it works for now.
     * Will work on this later.
     * Idea : rather than delete and rerender the whole grid, we should only update the changed state.
     */
    render(board: Board) {
        if (!this.ctx) {
            console.error("Context is not set. Use 'to' method to set it.");
            return;
        }

        this.ctx.innerHTML = "";

        if (board.isWin()) {
            this.ctx.innerHTML = `YOU WON! Attempts: ${board.attempt}`;
            return;
        }

        const grid = document.createElement("div");
        grid.className = "game-grid";

        board.grid.forEach((row, x) => {
            const rowDiv = document.createElement("div");
            row.forEach((cell, y) => {
                const cellDiv = document.createElement("div");
                cellDiv.className = "light";
                cellDiv.classList.toggle("on", !!cell);
                cellDiv.addEventListener("click", () => {
                    board.hit(x, y);
                    this.render(board);
                });
                rowDiv.appendChild(cellDiv);
            });
            grid.appendChild(rowDiv);
        });

        const attemptDiv = document.createElement("p");
        attemptDiv.className = "attempts";
        attemptDiv.innerHTML = `<b>Attempts:</b> ${board.attempt}`;

        this.ctx.appendChild(grid);
        this.ctx.appendChild(attemptDiv);
    }
}
