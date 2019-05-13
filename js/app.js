/*
 * Create a list that holds all of your cards
 */
const cards = [
  "fa fa-diamond",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-bomb"
];

const cardsContainer = document.querySelector(".deck");

let openCards = [];
let matchCards = [];

/* SHUFFLER */
function shuffle(array) {
    var currentIndex = array.length,
    temporaryValue,
    randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let cardArray = [];

/* START */
function start() {
  var shuffler = shuffle(cards);

  for(let i = 0; i < cards.length; i++) {
      const card = document.createElement("div");
      card.classList.add("card");
      cardsContainer.appendChild(card);
      card.innerHTML = "<i class='" + cards[i] + "'</i>";
      cardArray.push(card);

      click(card);
    }
  }

let firstClick = true;

/* CARD CLICK */
function click(card) {
    card.addEventListener("click", function() {
      const currentCard = this;
      const previousCard = openCards[0];

      if (firstClick) {
        timerCount = setInterval(function() {
          totalSeconds++;
          if (totalSeconds <= 59) {
            time.innerHTML =
              "  " + totalMinutes + "min. " + totalSeconds + " sec.";
          } else if (totalSeconds > 59) {
            totalMinutes++;
            totalSeconds = 0;
            time.innerHTML =
              "  " + totalMinutes + "min. " + totalSeconds + " sec.";
          }
        }, 1000);
        firstClick = false;
      }

      if (openCards.length === 1) {
        card.classList.add("open", "show", "off");
        openCards.push(this);

        comparing(currentCard, previousCard);
      } else {
        card.classList.add("open", "show", "off");
        openCards.push(this);
      }
    });
  }

/* CARD CLICK RESTRICTION */

function disableClick(card1, card2) {
  cardArray.forEach(element => {
    if (element !== card1 && element !== card2) {
      element.style.pointerEvents = "none";
    }
  });
}

function enableClick() {
  setTimeout(() => {
    cardArray.forEach(element => {
      element.removeAttribute("style");
    });
  }, 300);
}

/* COMPARING CARDS */
function comparing(currentCard, previousCard) {
  disableClick(currentCard, previousCard);
  if(currentCard.innerHTML === previousCard.innerHTML) {
      currentCard.classList.add("match");
      previousCard.classList.add("match");
      matchCards.push(currentCard, previousCard);

      openCards = [];

      gameOver();
  } else {
      setTimeout(function() {
      currentCard.classList.remove("open", "show", "off");
      previousCard.classList.remove("open", "show", "off");
      openCards = [];
      }, 300);
      addMove();
    }
enableClick();
}


/* GAME OVER */
 function gameOver() {
  if(matchCards.length === cards.length) {

    popupShow();
  }
}


/* GAME RESET */
const reset = document.querySelector(".restart");
reset.addEventListener("click", function() {
    cardsContainer.innerHTML = "";

stopTime();
start();
restart();
});

/* RESTART BUTTON */
function restart() {
  matchCards = [];
  moves = 0;
  moveCount.innerHTML = moves;

  rank();
}

/* MOVE COUNTER */
const moveCount = document.querySelector(".moves");
let moves = 0;
moveCount.innerHTML = 0
function addMove() {
  moves++;
  moveCount.innerHTML = moves;

  rank();
}

/* STARS */
const stars = document.querySelector(".stars");
const yourStars = `<li><i class=" fa fa-star "></i></li>`;
function rank() {
  if(moves < 9) {
    stars.innerHTML = yourStars + " " + yourStars + " " + yourStars;
  } else if (moves < 13) {
    stars.innerHTML = yourStars + " " + yourStars;
  } else {
    stars.innerHTML = yourStars;
  }
}

/* TIME */
const time = document.querySelector(".timer");

let timerCount;

let totalSeconds = 0;
let totalMinutes = 0;

time.innerHTML = " " + totalMinutes + " min. " + totalSeconds + " sec.";

function stopTime() {
  location.reload();
}

function stopTimer() {
  clearInterval(timerCount);
}


/* POP UP */
const popup = document.querySelector(".popup");

function popupShow() {
  // the popup is stored in the popup variable
  const button = document.querySelector(".button");
  if (matchCards.length === cards.length) {
    // we use the popup variable defined above to set its display property to block and make it appear
    popup.style.display = "block";
  }
  button.addEventListener("click", stopTime);
  getGameData();
}

/* FINAL RESULTS */
function getGameData() {
  const endStars = document.querySelector(".victory-stars");
  const endTime = document.querySelector(".victory-time");
  const endMoves = document.querySelector(".victory-moves");
  endStars.innerHTML = "You finished with " + stars.innerHTML + " stars!";
  endTime.innerHTML = "Your time: " + time.innerHTML;
  endMoves.innerHTML = "With only " + moveCount.innerHTML + " moves!";

  stopTimer();
}


start();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
/* function shuffle(cards) {
    var currentIndex = cards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }

    return array;
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
