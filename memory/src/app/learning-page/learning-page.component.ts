import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

export interface Piece {
  img: string;
  title: string;
  creator: string;
  year: string;
  museum: string;
}

@Component({
  selector: 'app-learning-page',
  templateUrl: './learning-page.component.html',
  styleUrls: ['./learning-page.component.css']
})
export class LearningPageComponent implements OnInit {
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
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Edvard_Munch_-_Melancholy_%281894-96%29.jpg/520px-Edvard_Munch_-_Melancholy_%281894-96%29.jpg",
    title: "Melancholie",
    year: "1895",
    creator: "Edvard Munch",
    museum: "Oslo"
  }];

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }

}
