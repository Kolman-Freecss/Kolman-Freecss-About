import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CacheService } from '../../../core/config/cache.service';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

const disableAnimation = trigger('disableAnimation', [
  state('true', style({ opacity: 0 })),
  state('false', style({ opacity: 1 })),
  transition('true => false', [animate('1s ease-out')]),
  transition('false => true', [animate('1s ease-out')]),
]);

@Component({
  selector: 'app-mouse-follower',
  standalone: true,
  imports: [
    TranslateModule,
  ],
  templateUrl: './mouse-follower.component.html',
  styleUrl: './mouse-follower.component.scss',
  animations: [disableAnimation]
})
export class MouseFollowerComponent implements OnInit, OnDestroy {

  private mouseMoveListener: (() => void) | undefined;
  public isMouseFollowerActive = true;

  audioSub: Subscription;

  constructor(private renderer: Renderer2,
              private el: ElementRef,
              protected cacheService: CacheService) {
    this.audioSub = cacheService.soundEventEnabled.subscribe((soundMuted: boolean) => {
      console.log('soundMuted', soundMuted);
      if (!soundMuted && this.isMouseFollowerActive) {
        this.disableMouseFollower();
        this.audioSub.unsubscribe();
      }
    });
  }

  ngOnInit() {
    this.mouseMoveListener = this.renderer.listen('document', 'mousemove', this.onMouseMove.bind(this));
    setTimeout(() => {
      this.disableMouseFollower();
    }, 7000);
  }

  ngOnDestroy() {
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
    }
    if (this.audioSub) {
      this.audioSub.unsubscribe();
    }
  }

  disableMouseFollower() {
    console.log('disableMouseFollower');
    if (this.isMouseFollowerActive) {
      this.isMouseFollowerActive = false;
    }
  }

  onMouseMove(event: MouseEvent) {
    const followerElement = this.el.nativeElement.querySelector('.follower');
    this.renderer.setStyle(followerElement, 'left', `${event.clientX}px`);
    this.renderer.setStyle(followerElement, 'top', `${event.clientY}px`);
  }
}
