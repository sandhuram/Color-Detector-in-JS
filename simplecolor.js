var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var chosenColor = chooseColor(colors);
var respo = document.getElementById("response");
var resetButton = document.querySelector("#reset");
var colorName = document.getElementById("color-name");
var modeButtons = document.querySelectorAll(".mode");
var buttonEasy = document.getElementById("easy-btn");
var buttonHard = document.getElementById("hard-btn");
var modeButtons = document.querySelectorAll(".mode");
var buttonHelp = document.getElementById("help-btn");
var helpMessage = document.getElementById("help-msg");

init();

/*
 * set up the page
 */
function init() {
    resetButton.addEventListener("click", resetColors);
    colorName.textContent = chosenColor;

    configModeButtons();
    configHelp();
    configSquares();
    resetColors();
}

/*
 * return a random value between 0 and 255, inclusive
 * */
function randomColorValue () {
  return Math.floor(Math.random() * 256);
}

/*
 * return an array of strings, each of which is a random RGB color
 * @param len {number} length of the array to be returned
 * */
function generateRandomColors (len) {
  var c = new Array();
  for (var i = 0; i < len; i++) {
    var r = randomColorValue();
    var g = randomColorValue();
    var b = randomColorValue();
    c.push("rgb(" + r + ", " + g + ", " + b + ")");
  }
  return c;
}

/*
 * return an item from array l, chosen at random
 * @param l {Array}
 * */
function chooseColor (l) {
  var idx = Math.floor(Math.random() * l.length);
  return l[idx];
}

/*
 * reset colors of headings and squares
 * */
function resetColors() {
    resetButton.textContent = "New colors";
    colors = generateRandomColors(numSquares);
    chosenColor = chooseColor(colors);
    colorName.textContent = chosenColor;
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
        colorName.style.background = "steelblue";
        document.querySelector("h1").style.background = "steelblue";
        respo.textContent = "";
    }
}

/*
 * change colors of all squares and main headings to color
 * @param color {string} the chosen color for the current game
 * */
function changeColorsOnWin (color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.background = color;
  }
  document.getElementById("color-name").style.background = color;
  document.querySelector("h1").style.background = color;
};

/*
 * setup help button to display help message when pressed
 * */
function configHelp() {
    buttonHelp.addEventListener("click", function() {
        if (helpMessage.style.display === 'block') {
            helpMessage.style.display = 'none';
        } else {
            helpMessage.style.display = 'block';
        }
    });
}

/*
 * add event listeners to mode buttons
 * */
function configModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            resetColors();
        });
    }
}

/*
 * set up squares with colors and event listeners
 * */
function configSquares() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];
        squares[i].addEventListener("click", function () {
            if (this.style.background === chosenColor) {
                resetButton.textContent = "Play again";
                respo.textContent = "You win!";
                changeColorsOnWin(this.style.background);
            } else {
                this.style.background = "#232323";
                respo.textContent = "Try again";
            }
        });
    }
}