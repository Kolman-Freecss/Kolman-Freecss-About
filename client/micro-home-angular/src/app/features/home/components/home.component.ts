import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { GAMES_PATH } from '../../../shared/paths';
import { AnimationService } from '../../../shared/services/animation.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { faGithub, faItchIo, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { assetUrl } from '../../../../single-spa/asset-url';

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

  clickSoundUrl = assetUrl('audio/click_003.ogg');

  linkedin = 'https://www.linkedin.com/in/sergiomartinezroman/';
  github = 'https://github.com/Kolman-Freecss';
  itch = 'https://kolman-freecss.itch.io/';

  githubIcon = faGithub;
  linkedinIcon = faLinkedinIn;
  itchIcon = faItchIo;

  animationGithubState = 'rotated';
  animationLinkedinState = 'rotated';
  animationItchState = 'rotated';

  alienImg = assetUrl('img/Alien.png');
  thecoreSchoolImg = assetUrl('img/thecoreschool.png');
  uocImg = assetUrl('img/logo-uoc.png');
  marianaoImg = assetUrl('img/logo_marianao.png');
  eLearningImg = assetUrl('img/e-learning.png');
  imagarImg = assetUrl('img/imagar-logo.jpg');
  capgeminiImg = assetUrl('img/capgemini-logo.png');
  carverImg = assetUrl('img/carver-logo.jpg');
  everisImg = assetUrl('img/everis-logo.jpg');
  beepImg = assetUrl('img/beep-logo.jpg');


  @ViewChild('hoverSound') hoverSoundRef: ElementRef<HTMLAudioElement> | undefined;

  constructor(private animationService: AnimationService,
              private sanitizer: DomSanitizer
              ) {
  }

  toggleGithubHover() {
    this.playHoverSound();
    this.animationGithubState = this.animationGithubState === 'rotated' ? 'notRotated' : 'rotated'
  }

  toggleLinkedinHover() {
    this.playHoverSound();
    this.animationLinkedinState = this.animationLinkedinState === 'rotated' ? 'notRotated' : 'rotated'
  }

  toggleItchHover() {
    this.playHoverSound();
    this.animationItchState = this.animationItchState === 'rotated' ? 'notRotated' : 'rotated'
  }

  @HostListener('document:scroll', ['$event'])
  public onViewportScroll() {
    this.animationService.setHomeIntroduction(this.homeIntroduction);
  }

  public onMouseHoverWrapper() {
    this.mouseHoverWrapper = true;
  }

  public onMouseLeaveWrapper() {
    this.mouseHoverWrapper = false;
  }

  playHoverSound(): void {
    if (this.hoverSoundRef) {
      const audio = this.hoverSoundRef.nativeElement;
      audio.currentTime = 0;
      audio.play().then(r => r).catch(e => e);
    }
  }

}
