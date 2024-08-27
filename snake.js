const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gridSize = 20;  // Default grid size
let speed = 4;      // Default speed

let count = 0;
let playing = false;

let snake = {
    x: 160,
    y: 160,
    dx: gridSize,
    dy: 0,
    cells: [],
    maxCells: 4
};

let apple = {
    x: getRandomInt(0, canvas.width / gridSize) * gridSize,
    y: getRandomInt(0, canvas.height / gridSize) * gridSize
};

// Function to get a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Function to reset the game state
function resetGame() {
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = gridSize;
    snake.dy = 0;

    apple.x = getRandomInt(0, canvas.width / gridSize) * gridSize;
    apple.y = getRandomInt(0, canvas.height / gridSize) * gridSize;
}

// Function to handle the main game loop
function gameLoop() {
    if (!playing) return;  // Do not run the game loop if the game is not started

    requestAnimationFrame(gameLoop);

    // Slow down the game loop according to the speed setting
    if (++count < 10 - speed) {  // Adjusted to control speed
        return;
    }
    count = 0;

    // Move the snake's head
    snake.x += snake.dx;
    snake.y += snake.dy;

    // Check for wall collisions
    if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
        resetGame();
        playing = false;  // Stop the game on collision
        return;
    }

    // Add the new head position to the front of the snake body
    snake.cells.unshift({ x: snake.x, y: snake.y });

    // Remove the last segment if the snake is longer than its max length
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the apple
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, gridSize - 1, gridSize - 1);

    // Draw the snake
    ctx.fillStyle = 'green';
    snake.cells.forEach((cell, index) => {
        ctx.fillRect(cell.x, cell.y, gridSize - 1, gridSize - 1);

        // Check if the snake ate the apple
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            apple.x =
