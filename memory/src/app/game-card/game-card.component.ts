import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface CardData {
  img: string;
  text: string;
  type: 'img' | 'text'
  state: 'default' | 'flipped' | 'matched';
}

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {

  @Input() data!: CardData;

  @Output() cardClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
