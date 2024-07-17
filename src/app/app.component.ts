import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackgroundType } from './shared/models';
import { NavigationEnd, Router } from '@angular/router';
import { CacheService } from './core/config/cache.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'Kolman-Freecss';
  background: BackgroundType = BackgroundType.Video;
  imagesBackground: string[] = [];

  @ViewChild('hoverSound') hoverSoundRef: ElementRef<HTMLAudioElement> | undefined;

  constructor(
    private router: Router,
    protected cacheService: CacheService,
  ) {
  }

  ngOnInit(): void {
    this.cacheService.setLangSelected(); // First time, set the default language
    this.setHomeImageBackground();
    this.setCarouselBackground(BackgroundType.Video);
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

  muteSound(): void {
    this.cacheService.toggleSoundMuted();
  }

  playHoverSound(): void {
    if (this.hoverSoundRef) {
      const audio = this.hoverSoundRef.nativeElement;
      audio.currentTime = 0;
      audio.play().then(r => r).catch(e => e);
    }
  }

}
