const settings = document.querySelector("#settings") as HTMLFormElement;
const gameContainer = document.querySelector("#game") as HTMLDivElement;

const engine = new Engine();

settings.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const [dimX, dimY] = [data.get("dimX"), data.get("dimY")];
    const board = new Board(dimX, dimY);
    engine.to(gameContainer).init(board);
});
