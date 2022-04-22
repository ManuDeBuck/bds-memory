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
  public pieces: Piece[] = [];
  public cards: CardData[] = [];
  public flippedCards: CardData[] = [];
  public matchedCount: number = 0;
  public tries: number = 0;

  constructor(public router: Router) {
    const currNav = this.router.getCurrentNavigation();
    if (currNav !== null && currNav !== undefined) {
      const state = currNav.extras.state;
      if (state && state["pieces"]) {
        this.pieces = state["pieces"];
      }
    }
    if (this.pieces.length === 0) {
      router.navigate(["/learning"]);
    }
  }

  ngOnInit(): void {
    this.setupCards();
  }

  setupCards(): void {
    this.cards = [];
    this.pieces.forEach((piece) => {
      this.cards.push({
        img: piece.image,
        piece: piece,
        type: "text",
        state: 'default'
      });
      this.cards.push({
          img: piece.image,
          piece: piece,
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

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
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

      this.tries += 1;
    }, 2000);
  }

}
