const data = [
    {
        id:1,
        english:'morning',
        hindi : 'सुबह'
    }
];
console.log(document.querySelectorAll('h1.tr'))
const trial = document.querySelectorAll('h1.tr');
console.log(trial.length)
for (let i=0; i<trial.length; i++) {
    trial[i].innerHTML = data[0]['english'];
}

class MixOrMatch {
    constructor(totalTime, cards) {
      this.cardsArray = cards;
      this.ticker = document.getElementById("flips");
    //   this.audioController = new AudioController();
    }
  
    startGame() {
      this.totalClicks = 0;
      this.cardToCheck = null;
      this.matchedCards = [];
      this.busy = true;
      setTimeout(() => {
        // this.audioController.startMusic();
        this.shuffleCards(this.cardsArray);
        this.countdown = this.startCountdown();
        this.busy = false;
      }, 5);
      this.hideCards();
      this.timer.innerText = this.timeRemaining;
      this.ticker.innerText = this.totalClicks;
    }
    startCountdown() {
      return setInterval(() => {
        this.timeRemaining--;
        this.timer.innerText = this.timeRemaining;
        if (this.timeRemaining === 0) this.gameOver();
      }, 10);
    }
    gameOver() {
      clearInterval(this.countdown);
    //   this.audioController.gameOver();
      document.getElementById("game-over-text").classList.add("visible");
    }
    victory() {
      clearInterval(this.countdown);
    //   this.audioController.victory();
      document.getElementById("victory-text").classList.add("visible");
    }
    hideCards() {
      this.cardsArray.forEach((card) => {
        card.classList.remove("visible");
        card.classList.remove("matched");
      });
    }
    flipCard(card) {
        // this.audioController.flip();
        this.totalClicks++;
        // this.ticker.innerText = this.totalClicks;
        card.classList.add("visible");
  
        // if (this.cardToCheck) {
        //   this.checkForCardMatch(card);
        // } else {
        //   this.cardToCheck = card;
        // }
    }
    checkForCardMatch(card) {
      if (this.getCardType(card) === this.getCardType(this.cardToCheck))
        this.cardMatch(card, this.cardToCheck);
      else this.cardMismatch(card, this.cardToCheck);
  
      this.cardToCheck = null;
    }
    cardMatch(card1, card2) {
      this.matchedCards.push(card1);
      this.matchedCards.push(card2);
      card1.classList.add("matched");
      card2.classList.add("matched");
    //   this.audioController.match();
      if (this.matchedCards.length === this.cardsArray.length) this.victory();
    }
    cardMismatch(card1, card2) {
      this.busy = true;
      setTimeout(() => {
        card1.classList.remove("visible");
        card2.classList.remove("visible");
        this.busy = false;
      }, 1000);
    }
    shuffleCards(cardsArray) {
      for (let i = cardsArray.length - 1; i > 0; i--) {
        const randIndex = Math.floor(Math.random() * (i + 1));
        [cardsArray[i], cardsArray[randIndex]] = [
          cardsArray[randIndex],
          cardsArray[i],
        ];
      }
      cardsArray = cardsArray.map((card, index) => {
        card.style.order = index;
      });
    }
    getCardType(card) {
      return card.getElementsByClassName("card-value")[0].src;
    }
    canFlipCard(card) {
      return (
        !this.busy &&
        !this.matchedCards.includes(card) &&
        card !== this.cardToCheck
      );
    }
  }
  if (document.readyState=='loading') {
    document.addEventListener("s",ready);
  } else {
    ready()
  }

  function ready() {
    let cards = Array.from(document.getElementsByClassName("card"));
    let game = new MixOrMatch(100, cards);
    console.log(cards)
    cards.forEach((card) => {
        card.addEventListener("click", () => {
          game.flipCard(card);
        });
      });
  }
