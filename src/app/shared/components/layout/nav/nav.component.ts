import { Component, ElementRef, ViewChild } from '@angular/core';
import { GAMES_PATH, HOME_PATH } from '../../../paths';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { faGamepad, faPortrait } from '@fortawesome/free-solid-svg-icons';

const pulseAnimation = trigger('pulseAnimation', [
  state('open', style({ transform: 'transform: scale(1)' })),
  state('closed', style({ transform: 'transform: scale(1.3)' })),
  transition('open => closed', animate('0.5s ease-in')),
  transition('closed => open', animate('0.5s ease-out'))
]);

const rotateAnimation = trigger('rotateAnimation', [
  state('rotated', style({ transform: 'rotateX(360deg)' })),
  state('notRotated', style({ transform: 'rotateX(0)' })),
  transition('rotated => notRotated', animate('0.5s ease-in')),
  transition('notRotated => rotated', animate('0.5s ease-out'))
]);

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    pulseAnimation,
    rotateAnimation
  ],
})
export class NavComponent {

  home = '/' + HOME_PATH;
  games = '/' + GAMES_PATH;
  homeIcon = faPortrait;
  gameIcon = faGamepad;

  animationState = 'rotated';

  @ViewChild('hoverSound') hoverSoundRef: ElementRef<HTMLAudioElement> | undefined;

  constructor(private route: Router) { }

  toggleHover() {
    this.playHoverSound();
    this.animationState = this.animationState === 'rotated' ? 'notRotated' : 'rotated'
  }

  isHome(): boolean {
    return this.route.url.startsWith(this.home);
  }

  isGames(): boolean {
    return this.route.url.startsWith(this.games);
  }

  playHoverSound(): void {
    if (this.hoverSoundRef) {
      const audio = this.hoverSoundRef.nativeElement;
      audio.currentTime = 0;
      audio.play();
    }
  }

}
