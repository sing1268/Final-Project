// Initial Setup
let $body = document.querySelector("body");
let $head = document.querySelector("head");

let stylesheet = ` <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
</link> <link rel="stylesheet" href="style.css"></link>`;

// insert location: afterbegin
$head.insertAdjacentHTML("afterbegin", stylesheet);

// Root elemement
let $gamePanel = document.getElementById("GameContainer");

// array of car images
let imageTitle = [
  "car1.png",
  "car2.png",
  "car3.png",
  "car4.png",
  "car5.png",
  "car6.png",
];

let imageArray = [];
let firstCard = "";
let secondCard = "";
let selectedImage = [];
let pointToWin = 0;
let currentPoints = 0;
/**
 * disableCards()
 *
 * This function disables the card by removing the event listener and changing the style properties
 */
function disableCards() {
  firstCard.classList.add("guessed");
  secondCard.classList.toggle("guessed");
  firstCard.removeEventListener("click", showCard);
  secondCard.removeEventListener("click", showCard);
}

/**
 * hideCards()
 *
 * This function hides the card if the user has guessed wrong cards
 */
function hideCards() {
  setTimeout(() => {
    secondCard.classList.remove("show");
    firstCard.classList.remove("show");
  }, 1000);
}

/**
 * showCard()
 *
 * This function contains the whole login of the game and decide to show or hide the cards
 */
function showCard() {
  for (let image of imageArray) {
    if (image === event.target.id) {
      // if user guesses correct second image
      if (selectedImage == image) {
        secondCard = this;
        secondCard.classList.toggle("show");
        disableCards();
        currentPoints++;
        selectedImage = [];
      } else {
        // if user clicks the image for hte first time
        if (selectedImage.length == 0) {
          firstCard = this;
          firstCard.classList.toggle("show");
          selectedImage = image;
        } else {
          // if user clicks the wrong second image
          secondCard = this;
          secondCard.classList.toggle("show");
          hideCards();
          selectedImage = [];
        }
      }
      break;
    }
  }
  // check if user has won the game
  checkIfWon();
}

/**
 * Adds the event listener to each card
 */
function addListenerToCards() {
  const cards = document.querySelectorAll(".imageColumnClass img");
  cards.forEach((card) => card.addEventListener("click", showCard));
}

/**
 * insertImage()
 *
 * Adds the Image to the DOM
 */
function insertImage() {
  let imageContent = [];
  imageContent.push(`<div id= "imageContainer" class="imageContainerClass">`);

  // sort the array
  imageArray.sort(() => Math.random() - 0.5);

  for (link of imageArray) {
    imageContent.push(`<div class="imageColumnClass">
    
      <img src=${link} alt="Car Image" id=${link}></img>
  </div>`);
  }
  imageContent.push(`</ div>`);

  // insert to document
  $gamePanel.innerHTML = imageContent.join("");
  addListenerToCards();
}

/**
 * checkIfWon()
 *
 * This funciton checks if the user has won and displays the woin message and option to restart the game
 */
function checkIfWon() {
  if (pointsToWin == currentPoints) {
    document.getElementById("imageContainer").classList.add("endGame");
    setTimeout(() => {
      $gamePanel.classList.add("won");
      let win = `<h1>You have won</h1><button class="btn btn-success winButton" id="restart">restart</button>`;
      $gamePanel.innerHTML = win;
      const $buttonSelector = document.querySelector(".winButton");
      $buttonSelector.addEventListener("click", mouseEvent);
    }, 1000);
  }
}

/**
 * generateImages()
 * This function is used to generate the image array based on the difficulty level
 * @param {*} totalImages
 */
function generateImages(totalImages) {
  for (let x = 0; x < 2; x++) {
    for (let y = 0; y < totalImages; y++) {
      imageArray.push(imageTitle[y]);
    }
  }
  pointsToWin = totalImages;
  insertImage();
}
/**
 * mouseEvent()
 *
 * Function to handle mouse button click events
 * @param {*} event
 */
function mouseEvent(event) {
  if (event.target.id === "easyLevel") {
    generateImages(2);
  } else if (event.target.id === "mediumLevel") {
    generateImages(4);
  } //check if user wants to switch full screen mode
  else if (event.target.id === "hardLevel") {
    generateImages(6);
  } else if (event.target.id === "restart") {
    $gamePanel.innerHTML = "";
    $gamePanel.classList.remove("won");
    showDifficultyDialog();
  }
}

/**
 * showDifficultyDialog()
 * This function is used to display the difficulty choose dialog
 */
function showDifficultyDialog() {
  imageArray = [];
  selectedImage = [];
  pointToWin = 0;
  currentPoints = 0;

  const buttons = ` <div class="buttonContainer"><h1> Choose the difficulty level</h1>
  <button class="btn btn-success" id="easyLevel">Easy</button>
  <button class="btn btn-warning" id="mediumLevel">Medium</button>
  <button class="btn btn-danger" id="hardLevel">Hard</button>
</div>`;
  // insert to document
  $gamePanel.innerHTML += buttons;

  const $buttonSelector = document.querySelector(".buttonContainer");
  $buttonSelector.addEventListener("click", mouseEvent);
}

showDifficultyDialog();
