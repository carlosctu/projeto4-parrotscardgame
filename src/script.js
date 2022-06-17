let cards = [];
let cardsNumber = Number(prompt("Com quantas cartas gostaria de jogar?"));
let gif = [
  `<img  src="img/bobrossparrot.gif" class="bobrossparrot">`,
  `<img src="img/explodyparrot.gif" class="explodyparrot">`,
  `<img src="img/fiestaparrot.gif" class="fiestaparrot">`,
  `<img src="img/metalparrot.gif" class="metalparrot">`,
  `<img src="img/revertitparrot.gif" class="revertitparrot">`,
  `<img src="img/tripletsparrot.gif" class="tripletsparrot">`,
  `<img src="img/unicornparrot.gif" class="unicornparrot">`,
];
let tableGame = document.querySelector(".container");
let cont = 0;
let aux = 0;
let firstCard,secondCard, parentFirstCard;
let card = "";

verifyCards();
setTable();

function flipCard(element) {
  element.querySelector(".front-face").classList.add("front-flip");
  element.querySelector(".back-face").classList.add("back-flip");
  // console.log(element.querySelector(".back-face").classList.contains("matched"))
  if (
    (firstCard == null || firstCard == "") &&
    !element.querySelector(".back-face").classList.contains("matched")
  ) {
    firstCard = element.querySelector(".back-face img");
    parentFirstCard = firstCard.parentNode.parentNode
  } else if (
    !element.querySelector(".back-face").classList.contains("matched") &&
    element.querySelector(".back-face img") !== firstCard
  ) {
    secondCard = element.querySelector(".back-face img");
    verifySelectedCards(element);
  }
}
function verifySelectedCards(element) {
  if (firstCard.isEqualNode(secondCard)) {
    firstCard.parentNode.classList.add("matched");
    secondCard.parentNode.classList.add("matched");
    aux++;
    firstCard = "";
    secondCard = "";
  } else {
    setTimeout(function () {
      parentFirstCard.querySelector(".front-face").classList.toggle("front-flip");
      parentFirstCard.querySelector(".back-face").classList.toggle("back-flip");
      firstCard = "";
      secondCard = "";
      element.querySelector(".front-face").classList.toggle("front-flip");
      element.querySelector(".back-face").classList.toggle("back-flip");
    }, 1000);
  }
}
function verifyCards() {
  while (cardsNumber < 4 || cardsNumber > 14) {
    alert("Favor escolher um número entre 4 a 14.");
    cardsNumber = prompt("Com quantas cartas gostaria de jogar?");
  }
  while (cardsNumber % 2 !== 0 || cardsNumber == 0) {
    alert("Favor escolher um número par ou diferente de zero.");
    cardsNumber = prompt("Com quantas cartas gostaria de jogar?");
  }
}
function setTable() {
  cardsNumber = cardsNumber / 2;
  for (let i = 0; i < cardsNumber; i++) {
    for (let j = 0; j < 2; j++) {
      cards.push(
        `<div class="card" onclick="flipCard(this)"><div class="front-face face"><img src="img/front.png" alt="front" /></div><div class="back-face face">${gif[i]}</div></div>`
      );
    }
    cards.sort(comparador);
  }

  while (cardsNumber * 2 > cont) {
    tableGame.innerHTML += cards[cont];
    cont++;
  }
}
function comparador() {
  return Math.random() - 0.5;
}
