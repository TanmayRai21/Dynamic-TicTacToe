let filledBox, filledValue, winCondition;
let squaresFilled = 0;
let turn = 0;
let numOfSqare = 9;
let gameSize = 3;
let gameWin = false;

window.onload = () => {
  filledBox = new Array();
  filledValue = new Array();
  let size = document.getElementById("gameSize");
  for (let s = 3; s <= 8; s++) {
    size.options[size.options.length] = new Option(s, s); //textContent:value
  }
  gameSize = size.options[size.selectedIndex].value;
  numOfSqare = parseInt(gameSize) * parseInt(gameSize);
  // console.log(gameSize, numOfSqare, size);

  createCanvas(numOfSqare);
  onSizeChange(size);
};

// Create HTML cells
function createCanvas(numOfSqare) {
  for (let cellIndex = 1; cellIndex <= numOfSqare; cellIndex++) {
    let canvas = document.createElement("canvas");
    canvas.id = "canvas" + cellIndex;
    canvas.width = 50;
    canvas.height = 50;
    canvas.style.border = "2px solid black";
    grid[0].appendChild(canvas);

    if (cellIndex % gameSize == 0) {
      let br = document.createElement("br");
      grid[0].appendChild(br);
    }

    document.getElementById(canvas.id).addEventListener("click", function() {
      if (gameWin == false) {
        canvasClicked(this.id);
      }
    });
  }
}

// Change HTML page on size change
function onSizeChange(evt) {
  removeExisting();
  let size = document.getElementById("gameSize");
  gameSize = size.options[size.selectedIndex].value;
  numOfSqare = parseInt(gameSize) * parseInt(gameSize);
  createCanvas(numOfSqare);

  for (let cellIndex = 0; cellIndex < numOfSqare; cellIndex++) {
    filledBox[cellIndex] = false;
    filledValue[cellIndex] = "";
  }
  genwinCondition();
}

// remove existing HTML page
function removeExisting() {
  for (let a = 1; a <= numOfSqare; a++) {
    childName = "canvas" + a;
    let child = document.getElementById(childName);
    grid[0].removeChild(child);
  }
  let cell = document.getElementsByTagName("br");
  let length = cell.length;
  for (let i = 0; i < length; i++) {
    cell[0].parentNode.removeChild(cell[0]);
  }
}

//Restart by reloading the page
function playAgain() {
  location.reload(true);
}

let grid = document.getElementsByClassName("grid");
let header = document.getElementById("header");
let reset = document.getElementById("btn");
reset.addEventListener("click", playAgain);
let inputSize = document.getElementById("gameSize");
inputSize.addEventListener("change", onSizeChange);
