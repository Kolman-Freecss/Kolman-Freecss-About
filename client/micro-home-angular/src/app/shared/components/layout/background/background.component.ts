import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BackgroundType } from '../../../models';
import { CacheService } from '../../../../core/config/cache.service';
import { Subscription } from 'rxjs';
import { assetUrl } from '../../../../../single-spa/asset-url';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements AfterViewInit, OnDestroy, OnInit {

  @Input() background: BackgroundType = BackgroundType.Video;
  @Input() imagesBackground: string[] = [];

  @ViewChild('video_element', { static: true, read: ElementRef })
  video: ElementRef | undefined;

  backgroundAudio = assetUrl('audio/BackgroundLvl1.wav')
  gameplayPresentation = assetUrl('video/GameplayPresentacionCompressed.mp4')

  audioSub: Subscription;

  mouseOverListener: EventListener;

  constructor(
    protected cacheService: CacheService,
  ) {
    this.mouseOverListener = () => {
      const audio = document.getElementById('audio_id') as HTMLAudioElement;
      if (audio) {
        console.log('audio', audio);
        audio.play().then(r => {
          this.cacheService.setSoundMuted(false);
        }).catch(e => console.error(e));
        document?.removeEventListener('click', this.mouseOverListener);
      }
    }
    this.audioSub = cacheService.soundEventToggled.subscribe((soundMuted: boolean) => {
      const audioBackgroundSound = document.getElementById('audio_id') as HTMLAudioElement;
      if (audioBackgroundSound) {
        audioBackgroundSound.muted = soundMuted;
      }
    });
  }

  ngAfterViewInit() {
    if (this.video) {
      this.video.nativeElement.muted = true;
      this.video.nativeElement.play();
    }
    document.addEventListener('click', this.mouseOverListener);
  }

  ngOnInit(): void {
    const audio = document.getElementById('audio_id') as HTMLAudioElement;
    this.cacheService.setSoundMuted(audio.paused);
  }

  isCarouselBackground(): boolean {
    return this.background === BackgroundType.Carousel;
  }

  isImageBackground(): boolean {
    return this.background === BackgroundType.Image;
  }

  isVideoBackground(): boolean {
    return this.background === BackgroundType.Video;
  }

  ngOnDestroy() {
    if (this.audioSub) {
      this.audioSub.unsubscribe();
    }
  }

}
