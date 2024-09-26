const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let gravity = 0.9;
let score = 0;

// Jump functionality
document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        jump();
    }
});

function jump() {
    if (!isJumping) {
        isJumping = true;
        let jumpHeight = 150;
        let jumpCount = 0;

        let jumpInterval = setInterval(() => {
            if (jumpCount > 20) {
                clearInterval(jumpInterval);
                let fallInterval = setInterval(() => {
                    if (jumpCount < 0) {
                        clearInterval(fallInterval);
                        isJumping = false;
                    }
                    player.style.bottom = `${jumpHeight - jumpCount * gravity}px`;
                    jumpCount -= 1;
                }, 20);
            } else {
                player.style.bottom = `${jumpHeight - jumpCount * gravity}px`;
                jumpCount += 1;
            }
        }, 20);
    }
}

// Move obstacle
function moveObstacle() {
    let obstaclePosition = 800;
    let gameLoop = setInterval(() => {
        obstaclePosition -= 5;
        obstacle.style.right = `${800 - obstaclePosition}px`;

        // Detect collision
        if (obstaclePosition < 50 && obstaclePosition > 0 && parseInt(player.style.bottom) < 30) {
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
