# Light's Out

Light's Out is a classic puzzle game where the objective is to turn off all the lights on a grid. The game starts with a grid of lights that can be either on (lit) or off (unlit). All the grid are randomly generated but **always** solvable.

## How to Play

The grid consists of `m * n` cells, each of which can be either on or off. Clicking a cell toggles its state (on to off or off to on) and also toggles the state of its adjacent cells (up, down, left, right). The challenge lies in finding the right sequence of clicks to turn off all the lights.

The game is won when all the cells in the grid are turned off.

## How to Run Locally

1. Clone the project:

    ```bash
    git clone https://github.com/username/lights-out.git
    cd lights-out
    ```

2. Install the dependencies and build the project:

    ```bash
    npm install
    npm run build
    ```

3. Open the game in your browser:

    ```
    open index.html
    ```

You can also [play the game on CodePen](https://codepen.io/ryanh_/pen/YzZaxYx), but keep in mind that this version may not be up to date compared to the repository.

Enjoy solving these grid !
