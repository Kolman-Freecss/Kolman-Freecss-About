import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { GAMES_PATH } from '../../../shared/paths';
import { AnimationService } from '../../../shared/services/animation.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { faGithub, faItchIo, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';

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
  itch = 'https://kolman-freecss.itch.io/';

  githubIcon = faGithub;
  linkedinIcon = faLinkedinIn;
  itchIcon = faItchIo;

  animationGithubState = 'rotated';
  animationLinkedinState = 'rotated';
  animationItchState = 'rotated';

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
    console.log('mouse hover wrapper');
    this.mouseHoverWrapper = true;
  }

  public onMouseLeaveWrapper() {
    console.log('mouse leave wrapper');
    this.mouseHoverWrapper = false;
  }

  playHoverSound(): void {
    if (this.hoverSoundRef) {
      const audio = this.hoverSoundRef.nativeElement;
      audio.currentTime = 0;
      audio.play();
    }
  }

}
