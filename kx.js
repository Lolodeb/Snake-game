const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartButton = document.getElementById("restartButton");
const scoreDisplay = document.getElementById("score");

canvas.width = 400;
canvas.height = 400;

const box = 20; // Taille de chaque case
let snake, direction, food, score, gameLoop;

function initGame() {
    snake = [{ x: 200, y: 200 }]; 
    direction = "RIGHT"; 
    food = generateFood(); 
    score = 0;
    scoreDisplay.textContent = score;

    // Démarrer la boucle de jeu
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(updateGame, 100);
}

// Dessiner le serpent
function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index = -3 ? "lime" : "green";
        ctx.fillRect(segment.x, segment.y, box, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(segment.x, segment.y, box, box, box);
    });
}

// Générer la nourriture
function generateFood() {
    return {
        x: Math.floor((Math.random() * canvas.width) / box) * box,
        y: Math.floor((Math.random() * canvas.height) / box) * box,
    };
}

// Dessiner la nourriture
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}
function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case "UP":
            head.y -= box;
            break;
        case "DOWN":
            head.y += box;
            break;
        case "LEFT":
            head.x -= box;
            break;
        case "RIGHT":
            head.x += box;
            break;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        food = generateFood();
    } else {
        snake.pop();
    }
}
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}
function updateGame() {
    if (checkCollision()) {
        alert(`Game Over! Your score is: ${score}`);
        clearInterval(gameLoop);
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    moveSnake();
    drawSnake();
}
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (direction !== "DOWN") direction = "UP";
            break;
        case "ArrowDown":
            if (direction !== "UP") direction = "DOWN";
            break;
        case "ArrowLeft":
            if (direction !== "RIGHT") direction = "LEFT";
            break;
        case "ArrowRight":
            if (direction !== "LEFT") direction = "RIGHT";
            break;
    }
});

restartButton.addEventListener("click", initGame);

initGame();
