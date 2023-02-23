import { Component, Input } from '@angular/core';
import { BackgroundType } from '../../../models/background-type';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent {

  @Input() background: BackgroundType = BackgroundType.Carousel;

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
