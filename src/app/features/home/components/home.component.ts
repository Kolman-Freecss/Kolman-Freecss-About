import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { GAMES_PATH } from '../../../shared/paths';
import { AnimationService } from '../../../shared/services/animation.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const rotateAnimation = trigger('rotateAnimation', [
  state('rotated', style({ transform: 'rotateX(360deg)' })),
  state('notRotated', style({ transform: 'rotateX(0)' })),
  transition('rotated => notRotated', animate('0.5s ease-in')),
  transition('notRotated => rotated', animate('0.5s ease-out'))
]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    rotateAnimation
  ],
})
export class HomeComponent {

  game = '/' + GAMES_PATH;
  @ViewChild('homeintroduction') homeIntroduction!: ElementRef;
  mouseHoverWrapper = false;

  linkedin = 'https://www.linkedin.com/in/sergiomartinezroman/';
  github = 'https://github.com/Kolman-Freecss';

  githubIcon = faGithub;
  linkedinIcon = faLinkedinIn;

  animationGithubState = 'rotated';
  animationLinkedinState = 'rotated';

  constructor(private animationService: AnimationService) {
  }

  toggleGithubHover() {
    this.animationGithubState = this.animationGithubState === 'rotated' ? 'notRotated' : 'rotated'
  }

  toggleLinkedinHover() {
    this.animationLinkedinState = this.animationLinkedinState === 'rotated' ? 'notRotated' : 'rotated'
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
