import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Piece} from "../learning-page/learning-page.component";
import {CardData} from "../game-card/game-card.component";

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {
  public pieces: Piece[] = [{
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Edvard_Munch_-_Melancholy_%281894-96%29.jpg/520px-Edvard_Munch_-_Melancholy_%281894-96%29.jpg",
    title: "Melancholie",
    year: "1895",
    creator: "Edvard Munch",
    museum: "Oslo"
  }, {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Edvard_Munch_-_Melancholy_%281894-96%29.jpg/520px-Edvard_Munch_-_Melancholy_%281894-96%29.jpg",
    title: "Melancholie",
    year: "1895",
    creator: "Edvard Munch",
    museum: "Oslo"
  }, {
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.1art1.de%2Fimages%2Fimagexl%2Fm%2Fm82966.jpg&f=1&nofb=1",
    title: "Melancholie",
    year: "1895",
    creator: "Edvard Munch",
    museum: "Oslo"
  }, {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Edvard_Munch_-_Melancholy_%281894-96%29.jpg/520px-Edvard_Munch_-_Melancholy_%281894-96%29.jpg",
    title: "Melancholie",
    year: "1895",
    creator: "Edvard Munch",
    museum: "Oslo"
  }, {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Edvard_Munch_-_Melancholy_%281894-96%29.jpg/520px-Edvard_Munch_-_Melancholy_%281894-96%29.jpg",
    title: "Melancholie",
    year: "1895",
    creator: "Edvard Munch",
    museum: "Oslo"
  }, {
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.copia-di-arte.com%2Fkunst%2Fedvard_munch_11004%2FMelancholie-Edvard-Munch.jpg&f=1&nofb=1",
    title: "Melancholie",
    year: "1895",
    creator: "Edvard Munch",
    museum: "Oslo"
  }];
  public cards: CardData[] = [];
  public flippedCards: CardData[] = [];
  public matchedCount: number = 0;

  constructor(public router: Router) {
    /*const currNav = this.router.getCurrentNavigation();
    if (currNav !== null && currNav !== undefined) {
      const state = currNav.extras.state;
      if (state && state["pieces"]) {
        this.pieces = state["pieces"];
      }
    }*/
  }

  ngOnInit(): void {
    this.setupCards();
  }

  setupCards(): void {
    this.cards = [];
    this.pieces.forEach((piece) => {
      this.cards.push({
        img: piece.img,
        text: `${piece.title} by ${piece.creator} in ${piece.year} stored in ${piece.museum}`,
        type: "text",
        state: 'default'
      });
      this.cards.push({
          img: piece.img,
        text: `${piece.title} by ${piece.creator} in ${piece.year} stored in ${piece.museum}`,
          type: "img",
          state: 'default'
        }
      )
    });

    this.cards = this.shuffleArray(this.cards);
  }

  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2)
    {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length === 2) {
        this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();
    }
  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.img === cardTwo.img ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.pieces.length) {
          this.router.navigate(["/finished"]);
        }
      }

    }, 1000);
  }

}
