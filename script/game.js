// Generate win condition array with size
function genwinCondition() {
  let size = parseInt(gameSize);
  let numOfCells = size * size;
  let numOfArr = size * 2;
  let winArray = new Array(numOfArr);

  let diagonal_1 = "";
  let diagonal_2 = "";

  for (let j = 0; j < size; j++) {
    strH = "";
    strV = "";
    for (let i = 0; i < numOfCells; i++) {
      if (i / size == j) {
        strH += i + ","; // 0 - first element
        for (let k = 1; k < size; k++) {
          strH += i + k + ","; // n-1 consecutive number in the row
        }
      }
      if (i % size == j) {
        strV += i + ",";
      }
    }

    strH = strH.substring(0, strH.length - 1);
    strV = strV.substring(0, strV.length - 1);
    let horizontal = strH.split(",");
    let vertical = strV.split(",");
    // console.log(strH, strV);

    winArray[j] = vertical;
    winArray[j + size] = horizontal;
    diagonal_1 += j * (size + 1) + ",";
    diagonal_2 += (j + 1) * (size - 1) + ",";
    // console.log(diagonal_1, diagonal_2);
  }
  diagonal_1 = diagonal_1.substring(0, diagonal_1.length - 1);
  diagonal_1 = diagonal_1.split(",");
  winArray.push(diagonal_1);

  diagonal_2 = diagonal_2.substring(0, diagonal_2.length - 1);
  diagonal_2 = diagonal_2.split(",");
  winArray.push(diagonal_2);
  // console.log(diagonal_1, diagonal_2);
  winCondition = winArray;
}

// Fill X and O
function canvasClicked(cellId) {
  let c = document.getElementById(cellId);
  cellId = parseInt(cellId.split("s")[1]); // cell number
  let cxt = c.getContext("2d");

  try {
    switch (filledBox[cellId - 1]) {
      case false:
        if (turn % 2 == 0) {
          cxt.beginPath();
          cxt.moveTo(10, 10);
          cxt.lineTo(40, 40);
          cxt.moveTo(40, 10);
          cxt.lineTo(10, 40);
          cxt.strokeStyle = "purple";
          cxt.stroke();
          cxt.closePath();
          filledValue[cellId - 1] = "X";
        } else {
          cxt.beginPath();
          cxt.arc(25, 25, 20, 0, Math.PI * 2); // x, y, radius, full-circle
          cxt.strokeStyle = "red";
          cxt.stroke();
          cxt.closePath();
          filledValue[cellId - 1] = "O";
        }

        turn++;
        moves.textContent = turn;
        filledBox[cellId - 1] = true;
        squaresFilled++;
        checkForWinners(filledValue[cellId - 1]); // last input to check

        if (squaresFilled == numOfSqare && gameWin == false) {
          header.textContent = "Game Tie!";
          setTimeout(function() {
            header.textContent = "Tic Tac Toe";
            playAgain();
          }, 1000);
        }
        break;

      case true:
        header.textContent = "Cell Filled";
        setTimeout(function() {
          header.textContent = "Tic Tac Toe";
        }, 750);
        break;
    }
  } catch (err) {
    console.log(err);
  }
}

function checkForWinners(symbol) {
  try {
    let size = parseInt(gameSize);
    for (let a = 0; a < winCondition.length; a++) {
      let flag = false;
      for (let b = 0; b < size; b++) {
        if (filledValue[winCondition[a][b]] !== symbol) {
          flag = true;
          break;
        }
      }
      if (flag == false) {
        gameWin = true;
        header.textContent = `${symbol} WON!!`;
        setTimeout(function() {
          header.textContent = "Tic Tac Toe";
          playAgain();
        }, 1000);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
