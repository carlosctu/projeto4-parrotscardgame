let cards = [];
let cardsNumber = Number(prompt("Com quantas cartas gostaria de jogar?"));
let gif = [`<img src="img/jiggly.gif" alt="jiggly">`,`<img src="img/pikachu.gif" alt="pikachu">`,`<img src="img/psyduck.gif" alt="psyduck">`,`<img src="img/slowpo.gif" alt="slowpo">`,`<img src="img/squirtle.gif" alt="squirtle">`,`<img src="img/squirtle_water.gif" alt="squirtle_water">`,`<img src="img/pikapika.gif" alt="pikapika">`]
// Embaralhando o array de gifs
shuffleGifs(gif);
let tableGame = document.querySelector(".container");
let cont = 0;
let aux = 0;
let firstCard, secondCard, parentFirstCard, list1, list2;
let card = "";
// Com esta variavel vamos permitir com que apenas possam ser clickadas duas partas por vez
let clicks = false;
// Jogadas do usuário
let plays = 0;
// Variaveis do timer
let min = 0;
let seg = 0;
let tikTok = "";
let intervalTimer;

verifyCards();
setTable();

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
  layout(cardsNumber)
  cardsNumber = cardsNumber / 2;
  for (let i = 0; i < cardsNumber; i++) {
    for (let j = 0; j < 2; j++) {
      cards.push(
        `<div class="card" onclick="flipCard(this)"><div class="front-face face"><img src="img/pokemon-frente.jpg" alt="front" /></div><div class="back-face face">${gif[i]}</div></div>`
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
function flipCard(element) {
  // Caso já se tenham duas cartas viradas, a função irá parar aqui
  if (clicks) {
    return;
  }
  element.querySelector(".front-face").classList.add("front-flip");
  element.querySelector(".back-face").classList.add("back-flip");

  if (
    (firstCard == null || firstCard == "") &&
    !element.querySelector(".back-face").classList.contains("matched")
  ) {
    firstCard = element.querySelector(".back-face img");
    parentFirstCard = firstCard.parentNode.parentNode;
    plays++;
  } else if (
    !element.querySelector(".back-face").classList.contains("matched") &&
    element.querySelector(".back-face img") !== firstCard
  ) {
    secondCard = element.querySelector(".back-face img");
    clicks = true;
    plays++;
    verifySelectedCards(element);
  }
  if (plays == 1) {
    intervalTimer = setInterval(setTimer, 1000);
  }
  endGame();
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
function endGame() {
  let flippedCards = document.querySelectorAll(".matched").length;
  if (cardsNumber * 2 !== flippedCards) {
    return;
  } else {
    setTimeout(function () {
      if (min == 0) {
        alert(
          `Você ganhou em ${plays} jogadas e num tempo de ${seg} segundos!`
        );
      } else {
        alert(
          `Você ganhou em ${plays} jogadas e num tempo de ${min} min e ${seg} seg!`
        );
      }
      // Parando o setInterval()
      clearInterval(intervalTimer);
      seg = 0;
      min = 0;
      verifyTimer();
      reset();
    }, 500);
  }
}
function reset() {
  let answer = prompt("Gostaria de reiniciar a partida? (Caso positivo digite 'sim')");
  
    if (answer == null || answer.toLowerCase() !== "sim"){
      clicks = true;
      alert("Obrigado por jogar!");
    } else{
      answer.toLowerCase()
      location.reload();
    }
}

// Timer
function setTimer() {
  // Como o jogo é rapido, apenas fiz no formato mm:ss
  seg++;
  if (seg == 60) {
    seg = 0;
    min++;
  }
  verifyTimer();
}
function verifyTimer() {
  tikTok = (min < 10 ? "0" + min : min) + ":" + (seg < 10 ? "0" + seg : seg);
  document.querySelector(".timer").innerHTML = tikTok;
}

// Arruma layout conforme numero de cartas informado
function layout(cardsNumber) {
  switch (cardsNumber) {
    case 6:
      document.querySelector(".container").classList.add("container-6")
      break;
    case 8:
      document.querySelector(".container").classList.add("container-8")
      break;
    case 10:
      document.querySelector(".container").classList.add("container-10")
      break;
    case 12:
      document.querySelector(".container").classList.add("container-12")
      break;
    case 14:
      document.querySelector(".container").classList.add("container-14")
      break;
    default:
      break;
  }
}

// Embaralha o Array de Gif
function shuffleGifs(gif){
  gif.sort(()=> Math.random() - 0.5);
}
