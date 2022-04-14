//Set game constants
const bird = document.querySelector(".bird");
const ground = document.querySelector(".ground");
const gameArea = document.querySelector(".game-area");
const sky = document.querySelector(".sky");
const liveScore = document.querySelector(".live-score");
const finalScore = document.querySelector(".score-number");
const gameOverMenu = document.querySelector(".game-over-menu");
const playerName = document.querySelector("input");
const submitButton = document.querySelector(".submit-button");
const hsList = document.querySelector(".top3");
const playAgainButton = document.querySelector(".play-again");
let listItem1 = document.querySelector(".one");
let listItem2 = document.querySelector(".two");
let listItem3 = document.querySelector(".three");

//Set game variables
let birdBottom = 400;
let birdLeft = 150;
let gravity = 4;
let gameOverStatus = false;
let logScore = true;
let playerScore = 0;
let highScores = [-1, -1, -1];
let falling = 0;

let playAgain = function () {
  playAgainButton.style.visibility = "hidden";
  playAgainButton.removeEventListener("click", playAgain);
  playerScore = 0;
  logScore = true;
  liveScore.innerHTML = playerScore;
  birdBottom = 400;
  birdLeft = 150;
  gravity = 4;
  gameOverStatus = false;
  gameOverMenu.style.visibility = "hidden";
  document.addEventListener("keydown", controls);
  createBarriers();
  birdStart();
  fly();
  falling = setInterval(birdStart, 22);
  bird.style.visibility = "visible";
};

// functions to be called later

//End Game function (stop gravity, remove event listeners & interval/timeout, update HS table)
let gameOver = function () {
  gameOverStatus = true;
  document.removeEventListener("keydown", controls);
  bird.style.visibility = "hidden";
  finalScore.innerHTML = playerScore;
  playerName.style.visibility = "visible";
  submitButton.style.visibility = "visible";
  gameOverMenu.style.visibility = "visible";
  clearInterval(falling);
  clearTimeout(createBarriers);
  submitButton.addEventListener("click", function (evt) {
    if (logScore === true && playerScore > highScores[0]) {
      highScores.pop();
      highScores.unshift(playerScore);
      listItem3.innerHTML = listItem2.innerHTML;
      listItem2.innerHTML = listItem1.innerHTML;
      listItem1.innerHTML = playerName.value + " " + playerScore;
      logScore = false;
    }
    if (
      logScore === true &&
      (playerScore === highScores[0] ||
        (playerScore < highScores[0] && playerScore > highScores[1]))
    ) {
      highScores.pop();
      highScores.splice(1, 0, playerScore);
      listItem3.innerHTML = listItem2.innerHTML;
      listItem2.innerHTML = playerName.value + " " + playerScore;
      logScore = false;
    }
    if (
      logScore === true &&
      (playerScore === highScores[1] ||
        (playerScore < highScores[1] && playerScore > highScores[2]))
    ) {
      highScores.pop();
      highScores.push(playerScore);
      listItem3.innerHTML = playerName.value + " " + playerScore;
      logScore = false;
    }
    playerName.style.visibility = "hidden";
    submitButton.style.visibility = "hidden";
    playAgainButton.style.visibility = "visible";
    playAgainButton.addEventListener("click", playAgain);
  });
};

//Start Gravity (bird drop)
let birdStart = function () {
  bird.style.bottom = birdBottom + "px";
  bird.style.left = birdLeft + "px";
  birdBottom -= gravity;
};

//Bird flying (bird moving up)
let fly = function () {
  if (birdBottom <= 696) {
    bird.style.bottom = birdBottom + "px";
    birdBottom += 75;
  }
};

//Set control for bird fly (spacebar = 32)
var controls = function (evt) {
  if (evt.which == 32) {
    fly();
  }
};

let starterKey = function (evt) {
  if (evt.which == 13) {
    startGame();
  }
};

//Remove start menu and begin the game
// Keybound to ENTER = 13
//NEED TO REMOVE ABILITY TO SPEED UP GRAVITY BY HITTING ENTER AGAIN!!!!!
function startGame() {
  document.querySelector(".start-menu").style.display = "none";
  bird.style.visibility = "visible";
  document.removeEventListener("keydown", starterKey);
  fly();
  birdStart();
  falling = setInterval(birdStart, 22);
  document.addEventListener("keydown", controls);
  createBarriers();
}
//Function that creates barriers (under sky div with class of barrier#), moves them (using style left and interval)
//clears barriers (removeChild and clear interval), and calls game over if collision
let createBarriers = function () {
  let barriersLeft = 500;
  let barrier1Bottom = 100;
  let randomHeight = Math.floor(Math.random() * (500 - 10 + 1) + 10);
  let barrier1Height = randomHeight;
  let barrier2Top = 0;
  let barrier2Bottom = barrier1Height + 300;
  //Create barrier in HTML with class of barrier1 and under sky DIV
  const barrier1 = document.createElement("div");
  barrier1.classList.add("barrier1");
  sky.appendChild(barrier1);
  //Create Top barrier with div class barrier 2 and under sky div
  const barrier2 = document.createElement("div");
  barrier2.classList.add("barrier2");
  sky.appendChild(barrier2);
  //Style barrier 1 to appear at the left with random height and bottom of 100px
  barrier1.style.left = barriersLeft + "px";
  barrier1.style.bottom = barrier1Bottom + "px";
  barrier1.style.height = randomHeight + "px";
  //Style barrier 2 with height of barrier1 + gap, appear at the left, top always at 0px
  barrier2.style.top = barrier2Top + "px";
  barrier2.style.left = barriersLeft + "px";
  barrier2.style.bottom = barrier1Height + 300 + "px";
  function moveBarriers() {
    //Set speed of barriers and apply to style left, call upon using setInterval
    barriersLeft -= 4;
    barrier1.style.left = barriersLeft + "px";
    barrier2.style.left = barriersLeft + "px";
    //Have player score once barriers pass player
    if (barriersLeft === 96) {
      playerScore++;
      liveScore.innerHTML = playerScore;
    }
    //Remove barriers once they are off screen
    if (barriersLeft <= -50) {
      clearInterval(timerID);
      sky.removeChild(barrier1);
      sky.removeChild(barrier2);
    }
    //Collision for bird if hits ground, top or bottom barrier, call gameOver function and clear interval if timer moving barriers
    if (
      (barriersLeft > 99 &&
        barriersLeft < 178 &&
        (birdBottom < barrier1Height + 99 ||
          birdBottom >= barrier2Bottom - 20)) ||
      birdBottom <= 100
    ) {
      gameOver();
      clearInterval(timerID);
      sky.removeChild(barrier1);
      sky.removeChild(barrier2);
    }
    if (gameOverStatus === true) {
      clearInterval(timerID);
      barrier1.style.display = "none";
      barrier2.style.display = "none";
    }
  }
  //create timer to call barriers, and timeout to create new ones (clear timeout if game over condition is reached)
  let timerID = setInterval(moveBarriers, 25);
  if (gameOverStatus != true) {
    setTimeout(createBarriers, 2000);
  }
  if (gameOverStatus == true) {
    clearTimeout(createBarriers);
    clearInterval(timerID);
  }
};

document.addEventListener("keydown", starterKey);
