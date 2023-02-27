import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { GAMES_PATH } from '../../../shared/paths';
import { AnimationService } from '../../../shared/services/animation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  game = '/' + GAMES_PATH;
  @ViewChild('homeintroduction') homeIntroduction!: ElementRef;
  mouseHoverWrapper = false;

  constructor(private animationService: AnimationService) {
  }

  @HostListener('document:scroll', ['$event'])
  public onViewportScroll() {
    this.animationService.setHomeIntroduction(this.homeIntroduction);
  }

  public onMouseHoverWrapper() {
    console.log('mouse hover wrapper');
    this.mouseHoverWrapper = true;
  }

  public onMouseLeaveWrapper() {
    console.log('mouse leave wrapper');
    this.mouseHoverWrapper = false;
  }

}
