document.addEventListener('DOMContentLoaded', () => {
  
    const grid = document.querySelector('.grid'),
        doodler = document.createElement('div');

  let doodlerLeftSpace = 50,
    startPoint = 150,
    doodlerBottomSpace = startPoint,
    isGameOver = false,
    platformCount = 5,
    platforms = [],
    upTimerID,
    downTimerID,
    leftTimerID,
    rightTimerID,
    isJumping = true,
    isGoingLeft = false,
    isGoingRight = false,
    score = 0;
    


  function createDoodler () {
    grid.appendChild(doodler)
    doodler.classList.add('doodler')
    doodlerLeftSpace = platforms[0].left
    doodler.style.left = doodlerLeftSpace + 'px'
    doodler.style.bottom = doodlerBottomSpace + 'px'
    
  }


  class Platform {
      constructor(newPlatBottom) {
          this.bottom = newPlatBottom
          this.left = Math.random() * 315
          this.visual = document.createElement('div')

          const visual = this.visual
          visual.classList.add('platform')
          visual.style.left = this.left + 'px'
          visual.style.bottom = this.bottom + 'px'
          grid.appendChild(visual)
      }
  }
  

  function createPlatforms () {
      for (let i = 0; i < platformCount; i++) {
          let platGap = 600 / platformCount,
            newPlatBottom = 100 + i * platGap,
            newPlatform = new Platform(newPlatBottom);
            platforms.push(newPlatform)
            console.log(platforms)
      }
  }

  function movePlatforms () {
      if (doodlerBottomSpace > 200) {
          platforms.forEach(platform => {
              platform.bottom -= 4
              let visual = platform.visual
              visual.style.bottom = platform.bottom + 'px'

              if (platform.bottom < 10) {
                  let firstPlatform = platforms[0].visual
                  firstPlatform.classList.remove('platform')
                  platforms.shift()
                  score++
                  let newPlatform = new Platform(600)
                  platforms.push(newPlatform)
              }
          })
      }
    }

    function jump () {
        clearInterval(downTimerID)
        isJumping = true
        upTimerID = setInterval(function() {
            doodlerBottomSpace += 20
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace > startPoint + 200) {
                fall()
            }
        }, 30)
    }

    function fall() {
        clearInterval(upTimerID)
        isJumping = false
        downTimerID = setInterval(function () {
            doodlerBottomSpace -= 5
            doodler.style.bottom = doodlerBottomSpace + 'px'

            if (doodlerBottomSpace <= 0) {
               gameOver() 
            }
            platforms.forEach(platform => {
                if ( (doodlerBottomSpace >= platform.bottom) &&
                     (doodlerBottomSpace <= platform.bottom + 15) &&
                     (doodlerLeftSpace + 60 >= platform.left) &&
                     (doodlerLeftSpace <= (platform.left + 85)) &&
                     !isJumping
                    ) {
                        startPoint = doodlerBottomSpace
                        jump()
                    }
            })
        }, 30)
    }


    function gameOver () {
        console.log('Game Over')
        isGameOver = true
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(upTimerID)
        clearInterval(downTimerID)
        clearInterval(leftTimerID)
        clearInterval(rightTimerID)
    }

    function control(e) {
        if (e.key === "ArrowLeft") {
            moveLeft ()
        } 
        else if (e.key === "ArrowRight"){
            moveRight ()
        }
        else if (e.key === "ArrowUp") {
            moveUp()
        }
    }

    function moveLeft () {
        if (isGoingRight) {
            clearInterval(rightTimerID)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerID = setInterval(function () {
            if (doodlerLeftSpace >= 0) {
                doodlerLeftSpace -= 5
                doodler.style.left = doodlerLeftSpace + 'px'
            }
            else {
                moveRight()
            }
        }, 30)
    }

    function moveRight () {
        if (isGoingLeft) {
            clearInterval(leftTimerID)
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimerID = setInterval(function () {
            if (doodlerLeftSpace <=  340) {
                doodlerLeftSpace += 5
                doodler.style.left = doodlerLeftSpace + 'px'
            }
            else {
                moveLeft()
            }
           
        }, 30)
    }

    function moveUp () {
        isGoingLeft = false
        isGoingRight = false
        clearInterval(rightTimerID)
        clearInterval(leftTimerID)
    }

    function start() {
      if (!isGameOver) {
          createPlatforms ()
          createDoodler()
          setInterval(movePlatforms, 30)
          jump()
          document.addEventListener('keyup', control)
      }
    }
    start()
});