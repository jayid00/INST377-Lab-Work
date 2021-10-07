document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const width = 10;
  let nextRandom = 0;
  let score = 0;
  let timerID;
  const colors = [
    'orange', 'tomato',
    'purple', 'green', 'blue'
  ]


  //The Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ];

  const theTetrominos = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino
  ];

  let currentPosition = 4;
  let curerntRotation = 0;

  //Randomly select a tetromino and it's first rotation
  let random = Math.floor(Math.random() * theTetrominos.length);
  let current = theTetrominos[random][curerntRotation];

  //draw the tetromino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add('tetromino');
      squares[currentPosition + index].style.backgroundColor = colors[random]
    });
  }

  //Undraw the tetromino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove('tetromino');
      squares[currentPosition + index].style.backgroundColor = ''
    });
  }

  //Assign functions to KeyCodes
  function control(e) {
    if (e.keyCode === 37) {
      //right arrow
      moveLeft();
    } else if (e.keyCode === 38) {
      //up arrow
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener("keyup", control);

  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  //freeze function
  function freeze() {
    if (
      current.some(index =>
        squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index =>
        squares[currentPosition + index].classList.add('taken'));

      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetrominos.length);
      current = theTetrominos[random][curerntRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }

  //limit the tetromin moving out of bound on the left

  function moveLeft() {
    undraw();

    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

    if (!isAtLeftEdge) currentPosition -= 1;

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains('taken')
      )
    ) {
      currentPosition += 1;
    }

    draw();
  }

  function moveRight() {
    undraw();

    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    );

    if (!isAtRightEdge) currentPosition += 1;

    if (current.some((index) =>
        squares[currentPosition + index].classList.contains('taken')))
       {
        currentPosition -= 1;
    }

    draw();
  }

  //rotate the tetromino
  function rotate() {
    undraw();
    curerntRotation++;
    if (curerntRotation === current.length) {
      curerntRotation = 0;
    }
    current = theTetrominos[random][curerntRotation];

    draw();
  }

  //show incoming tetromino in the mini-grid
  const displaySquares = document.querySelectorAll('.mini-grid div');
  const displayWidth = 4;
  let displayIndex = 0;

  const nextTetrominos = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], //L
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //Z
    [1, displayWidth, displayWidth + 1, displayWidth + 2], //T
    [0, 1, displayWidth, displayWidth + 1], //O
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //I
  ];

  //display the tetromino in the mini-grid

  function displayShape() {
    displaySquares.forEach(square => {
      square.classList.remove('tetromino');
      square.style.backgroundColor = '';
    });

    nextTetrominos[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('tetromino');
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    });
  }

  //Add functionality to button
  startBtn.addEventListener("click", () => {
    if (timerID) {
      clearInterval(timerID);
      timerID = null;
    } else {
      draw();
      timerID = setInterval(moveDown, 500);
      nextRandom = Math.floor(Math.random() * theTetrominos.length);
      displayShape();
    }
  });

  //add score
  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9
      ];

      if (row.every((index) => squares[index].classList.contains('taken'))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove('taken');
          squares[index].classList.remove('tetromino');
          squares[index].style.backgroundColor = '';
        });
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }


  //game over

  function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = 'Game Over'
      clearInterval(timerID)
      alert('Game Over')

    }
  }


});
