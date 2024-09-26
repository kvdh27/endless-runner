const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let gravity = 0.9;
let playerPosition = 0; // Startpositie van de speler
let score = 0;

// Jump functionality
document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        jump();
    }
});

function jump() {
    if (isJumping) return;
    isJumping = true;

    let jumpHeight = 150;
    let jumpCount = 0;
    let upInterval = setInterval(() => {
        // Stijgen
        if (jumpCount >= 15) {
            clearInterval(upInterval);

            // Begin met vallen
            let downInterval = setInterval(() => {
                if (jumpCount <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                playerPosition -= 5; // Vallen
                player.style.bottom = `${playerPosition}px`;
                jumpCount--;
            }, 20);
        } else {
            // Speler omhoog bewegen
            playerPosition += 5; // Hoe snel de speler omhoog gaat
            player.style.bottom = `${playerPosition}px`;
            jumpCount++;
        }
    }, 20);
}

// Move obstacle
function moveObstacle() {
    let obstaclePosition = 800;
    let gameLoop = setInterval(() => {
        obstaclePosition -= 5;
        obstacle.style.right = `${800 - obstaclePosition}px`;

        // Detect collision
        if (obstaclePosition < 50 && obstaclePosition > 0 && playerPosition < 30) {
            clearInterval(gameLoop);
            alert('Game Over! Your score: ' + score);
            location.reload();
        }

        if (obstaclePosition <= 0) {
            obstaclePosition = 800;
            score += 1;
            scoreDisplay.textContent = score;
        }
    }, 20);
}

moveObstacle();
