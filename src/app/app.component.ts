import { Component, OnInit } from '@angular/core';
import { BackgroundType } from './shared/models/background-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Kolman-Freecss';
  background: BackgroundType = BackgroundType.Carousel;

  constructor() {

  }

  ngOnInit(): void {
    this.setCarouselBackground(BackgroundType.Carousel);
  }

  setCarouselBackground(background: BackgroundType): void {
    this.background = background;
  }
}
