document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird'),
        gameDisplay = document.querySelector('.game-container'),
        ground = document.querySelector('.ground');


    //starting position of the bird
    let birdLeft = 220,
        birdBottom = 100,
        gravity = 2,
        isGameOver = false,
        spaceBetWeen = 440;

    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }
    
    let gametimerID =  setInterval(startGame, 20);

    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }

    function jump() { //makes the bird jump
        if (birdBottom < 500 && !isGameOver) birdBottom += 50;
       
        bird.style.bottom = birdBottom + 'px';
        console.log(birdBottom)
    }

    document.addEventListener('keyup', jump)

    function generateObstacle () { //generate obstacles or pipes
        let obstacleLeft = 500,
            randomHeight = Math.random() * 60,
            obstacleBottom = randomHeight;
        const obstacle = document.createElement('div'),
            topObstacle = document.createElement('div');

        if (!isGameOver) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
        }

        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);
        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.bottom = obstacleBottom + spaceBetWeen + 'px';

        function moveObstacle() {
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';

            if (obstacleLeft === -60) {
                clearInterval(timerID);
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }

            if (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && 
                (birdBottom < (obstacleBottom + 150) || birdBottom > obstacleBottom + spaceBetWeen - 200) || 
                birdBottom === 0) {
                gameOver();
                clearInterval(timerID);
            }
        }

        let timerID = setInterval(moveObstacle, 20)
        if (!isGameOver) {
            setTimeout(generateObstacle, 3000)
        }
        
    }
    
    generateObstacle()

    function gameOver() {
        clearInterval(gametimerID)
        console.log("Game Over")
        isGameOver = true
        document.removeEventListener('keyup', control)
    }
})