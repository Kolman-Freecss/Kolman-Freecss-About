import { Component, OnInit } from '@angular/core';
import { BackgroundType } from './shared/models';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'Kolman-Freecss';
  background: BackgroundType = BackgroundType.Carousel;
  imagesBackground: string[] = [];

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.setHomeImageBackground();
    this.setCarouselBackground(BackgroundType.Carousel);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/game') {
          this.setGameImageBackground();
        } else {
          this.setHomeImageBackground();
        }
      }
    });
  }

  setCarouselBackground(background: BackgroundType): void {
    this.background = background;
  }

  setHomeImageBackground(): void {
    this.imagesBackground = [
      'assets/img/general-background-7.jpg',
      'assets/img/general-background-6.jpg',
      'assets/img/general-background-5.jpg',
      ];
  }

  setGameImageBackground(): void {
    this.imagesBackground = [
      'assets/img/BackgroundMenu.PNG',
      'assets/img/BackgroundMenu2.PNG'
      ];
  }
}
