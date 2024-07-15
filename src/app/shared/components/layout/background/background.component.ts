import { Component, Input } from '@angular/core';
import { BackgroundType } from '../../../models';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent {

  @Input() background: BackgroundType = BackgroundType.Video;
  @Input() imagesBackground: string[] = [];

  isCarouselBackground(): boolean {
    return this.background === BackgroundType.Carousel;
  }

  isImageBackground(): boolean {
    return this.background === BackgroundType.Image;
  }

  isVideoBackground(): boolean {
    return this.background === BackgroundType.Video;
  }

}
