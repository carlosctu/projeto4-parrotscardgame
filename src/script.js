let cards = [];
let cardsNumber = Number(prompt("Com quantas cartas gostaria de jogar?"));

verifySelectedCards();

function verifySelectedCards() {
  while (cardsNumber < 4 || cardsNumber > 14) {
    alert("Favor escolher um número entre 4 a 14.");
    cardsNumber = prompt("Com quantas cartas gostaria de jogar?");
  }
  while (cardsNumber % 2 !== 0 || cardsNumber == 0) {
    alert("Favor escolher um número par ou diferente de zero.");
    cardsNumber = prompt("Com quantas cartas gostaria de jogar?");
  }
}

let card = `<div class="card"><div class="front-face face">Frente</div><div class="back-face face">Verso</div></div>`;
let gif = [
  `<img src="img/bobrossparrot.gif" alt="bobrossparrot">`,
  `<img src="img/explodyparrot.gif" alt="explodyparrot">`,
  `<img src="img/fiestaparrot.gif" alt="fiestaparrot">`,
  `<img src="img/metalparrot.gif" alt="metalparrot">`,
  `<img src="img/revertitparrot.gif" alt="revertitparrot">`,
  `<img src="img/tripletsparrot.gif" alt="tripletsparrot">`,
  `<img src="img/unicornparrot.gif" alt="unicornparrot">`,
];
let tableGame = document.querySelector(".container");

for (let i = 0; i < cardsNumber; i++) {
  cards.push(card);
  tableGame.innerHTML += `<div class="container"><div class="card"><div class="front-face face"><img src="img/front.png" alt="front" /></div><div class="back-face face">4${gif[i]}</div></div></div>`;
//   document.querySelector(".back-face").innerHTML = gif[i];
}
// console.log(cards[1]);
// console.log(document.querySelector(".back-face").innerHTML);

// function addGif(i) {
//   document.querySelector(".back-face").innerHTML = gifs[i];
// }
