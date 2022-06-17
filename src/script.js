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
let firstCard, secondCard, parentFirstCard, list1, list2;
let card = "";
// Com esta variavel vamos permitir com que apenas possam ser clickadas duas partas por vez
let clicks = false;
// Jogadas do usuário
let plays = 0;
verifyCards();
setTable();



function flipCard(element) {
  // Caso já se tenham duas cartas viradas, a função irá parar aqui
  if (clicks) {
    return
  }
  element.querySelector(".front-face").classList.add("front-flip");
  element.querySelector(".back-face").classList.add("back-flip");

  if (
    (firstCard == null || firstCard == "") &&
    !element.querySelector(".back-face").classList.contains("matched")
    
  ) {
    firstCard = element.querySelector(".back-face img");
    parentFirstCard = firstCard.parentNode.parentNode;
    plays++
  } else if (
    !element.querySelector(".back-face").classList.contains("matched") &&
    element.querySelector(".back-face img") !== firstCard
    
  ) {
    secondCard = element.querySelector(".back-face img");
    clicks = true
    plays++
    verifySelectedCards(element);
  }
  setTimeout(function () {
  endGame()
  },500)
}
function verifySelectedCards(element) {
  
  if (firstCard.isEqualNode(secondCard)) {
    firstCard.parentNode.classList.add("matched");
    secondCard.parentNode.classList.add("matched");
    aux++;
    firstCard = "";
    secondCard = "";
    clicks = false;
  } else {
    firstCard = "";
    secondCard = "";
    setTimeout(function () {
      parentFirstCard
        .querySelector(".front-face")
        .classList.remove("front-flip");
      parentFirstCard.querySelector(".back-face").classList.remove("back-flip");

      element.querySelector(".front-face").classList.remove("front-flip");
      element.querySelector(".back-face").classList.remove("back-flip");
      // Destravando o click após desvirar as cartas
      clicks = false;
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
function endGame() {
  let flippedCards = document.querySelectorAll(".matched").length
  if (cardsNumber*2 == flippedCards) {
    alert(`Você ganhou em ${plays} jogadas!`)
  }
}