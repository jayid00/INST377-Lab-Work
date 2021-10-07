document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')
    const width = 10  
    
    //The Tetrominoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const theTetrominos = [lTetromino, zTetromino, tTetromino, 
                        oTetromino, iTetromino]
  
  let currentPosition = 4
  let curerntRotation = 0

  //Randomly select a tetromino and it's first rotation
  let random = Math.floor(Math.random()*theTetrominos.length)
  let current = theTetrominos[random][curerntRotation]

  //draw the tetromino
  function draw() {
      current.forEach(index => {
          squares[currentPosition + index].classList.add('tetromino')
      })
  }

  //Undraw the tetromino
  function undraw() {
      current.forEach(index => {
          squares[currentPosition + index].classList.remove('tetromino')
      })
  }

  //make the tetromino move down every second
  timerID = setInterval(moveDown, 250)

  //Assign functions to KeyCodes
  function control(e) {
    if (e.keyCode === 37) { //right arrow
      moveLeft()
    }
    else if (e.keyCode === 38) { //up arrow
      //rotate
    }
    else if (e.keyCode === 39) {
      moveRight()
    }
    else if (e.keyCode === 40) {
      moveDown()
    }
    
  }
  document.addEventListener('keyup', control)

  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }


  //freeze function
  function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      random = Math.floor(Math.random() * theTetrominos.length)
      current = theTetrominos[random][curerntRotation]
      currentPosition = 4
      draw()
    }
  }

  //limit the tetromin moving out of bound on the left

  function moveLeft() {
    undraw()
   
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
   
    if (!isAtLeftEdge) currentPosition -=1

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition +=1 
    }

    draw()
  }


  function moveRight() {
    undraw()
   
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
    
    if (!isAtRightEdge) currentPosition +=1

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -=1 
    }

    draw()
  }
  
})