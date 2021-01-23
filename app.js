import cardArray from "./src/cardItem.js";
// Select Element
const cardContainer = document.querySelector(".card-container");
const totalScore = document.querySelector(".total-score");

// temp var
let chosenCard = [];
let chosenCardId = [];
let completedCard = [];

const init = () => {
  // Randomize Card
  randomizeCard();
  // Create Board
  createBoard();
};
init();

// FUNCTION
function randomizeCard() {
  cardArray.sort(() => 0.5 - Math.random());
}

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    //   Create card
    const card = document.createElement("img");
    card.src = "./img/cardBack.png";
    card.classList.add("card-item");
    card.setAttribute("data-id", i);
    cardContainer.appendChild(card);
    // Create Flip functionality
    card.addEventListener("click", flipCard);
  }
}

function flipCard() {
  const cardID = this.dataset.id;
  chosenCard.push(cardArray[cardID].name);
  chosenCardId.push(cardID);
  this.src = cardArray[cardID].image;
  if (chosenCard.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  const cards = document.querySelectorAll(".card-item");
  const cardOneId = chosenCardId[0];
  const cardTwoId = chosenCardId[1];
  if (chosenCard[0] === chosenCard[1]) {
    alert("You found a match!!");
    cards[cardOneId].src = "./img/blank.png";
    cards[cardTwoId].src = "./img/blank.png";
    completedCard.push(chosenCard);
  } else {
    alert("Sorry, try again..");
    cards[cardOneId].src = "./img/cardBack.png";
    cards[cardTwoId].src = "./img/cardBack.png";
  }
  chosenCard = [];
  chosenCardId = [];
  totalScore.textContent = `Score : ${completedCard.length}`;
  if (completedCard.length >= cardArray.length / 2) {
    alert("Congratulations, you've won!!");
    completedCard = [];
    totalScore.textContent = "Score : 0";
    deleteBoard();
    init();
  }
}

function deleteBoard() {
  const cards = [...document.querySelectorAll(".card-item")];
  cards.map((card) => {
    card.remove();
  });
}
