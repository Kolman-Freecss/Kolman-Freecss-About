import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BackgroundType } from '../../../models';
import { CacheService } from '../../../../core/config/cache.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements AfterViewInit, OnDestroy {

  @Input() background: BackgroundType = BackgroundType.Video;
  @Input() imagesBackground: string[] = [];

  @ViewChild('video_element', { static: true, read: ElementRef })
  video: ElementRef | undefined;

  audioSub: Subscription;

  constructor(
    protected cacheService: CacheService,
  ) {
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
