import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CONTACT_PATH, GAMES_PATH, HOME_PATH } from '../../../paths';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { faAnglesLeft, faAnglesRight, faGamepad, faPortrait } from '@fortawesome/free-solid-svg-icons';
import { CacheService } from '../../../../core/config/cache.service';
import { Subscription } from 'rxjs';

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
export class NavComponent implements OnDestroy, AfterViewInit, OnInit {

  home = '/' + HOME_PATH;
  games = '/' + GAMES_PATH;
  contact = '/' + CONTACT_PATH;

  homeIcon = faPortrait;
  gameIcon = faGamepad;

  animationState = 'rotated';

  arrowLeft = faAnglesLeft;
  arrowRight = faAnglesRight;

  routeSub: Subscription | undefined;
  langSub: Subscription;

  @ViewChild('flag_es') flagEs: ElementRef<HTMLImageElement> | undefined;
  @ViewChild('flag_en') flagEn: ElementRef<HTMLImageElement> | undefined;
  @ViewChild('tab_link_contact') tabLinkContact: ElementRef<HTMLAnchorElement> | undefined;

  @ViewChild('hoverSound') hoverSoundRef: ElementRef<HTMLAudioElement> | undefined;

  constructor(private route: Router,
              private cacheService: CacheService,
              ) {
    this.langSub = this.cacheService.langEventChanged.subscribe((lang) => {
      this.handleLangSelected(lang);
    });
  }

  ngAfterViewInit(): void {
    this.handleLangSelected(this.cacheService.getLangSelected());
  }

  ngOnInit(): void {
    // Listener to animate the tabs-wrapper-links
    this.routeSub = this.route.events.subscribe(() => {
      if (this.route.url.startsWith(this.contact)) {
        this.tabLinkContact?.nativeElement.classList.add('active');
      } else {
        this.tabLinkContact?.nativeElement.classList.remove('active');
      }
    });
  }

  toggleHover() {
    this.playHoverSound();
    this.animationState = this.animationState === 'rotated' ? 'notRotated' : 'rotated'
  }

  isHome(): boolean {
    return this.route.url.startsWith(this.home);
  }

  isGames(): boolean {
    return this.route.url.startsWith(this.games) || this.route.url.startsWith(this.contact);
  }

  playHoverSound(): void {
    if (this.hoverSoundRef) {
      const audio = this.hoverSoundRef.nativeElement;
      audio.currentTime = 0;
      audio.play().then(r => r).catch(e => e);
    }
  }

  changeLanguage(language: string): void {
    this.cacheService.setLangSelected(language);
  }

  handleLangSelected(language: string): void {
    if (this.flagEs && this.flagEn) {
      if (language === 'es') {
        this.flagEs.nativeElement.classList.add('selected');
        this.flagEn.nativeElement.classList.remove('selected');
      } else {
        this.flagEs.nativeElement.classList.remove('selected');
        this.flagEn.nativeElement.classList.add('selected');
      }
    }
  }

  ngOnDestroy(): void {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
