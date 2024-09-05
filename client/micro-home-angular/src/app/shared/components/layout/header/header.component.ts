import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AnimationService } from '../../../services/animation.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges {

  @ViewChild('headerwrapper') headerWrapper!: ElementRef;
  //TODO Redux here
  cacheBoundingRectHeader!: any;
  cacheBoundingRectHome!: any;
  showHeader = true;
  @Input() mouseHoverWrapper = false;

  @ViewChild('hoverSound') hoverSoundRef: ElementRef<HTMLAudioElement> | undefined;

  constructor(private animationService: AnimationService,
              private localStorage: LocalStorageService
              ) {
  }

  ngOnInit(): void {
    this.initSubscriptions();
    this.onViewportScroll();
  }

  ngOnChanges(): void {
    this.onViewportScroll();
  }

  initSubscriptions(): void {
    this.initAnimationsSubscriptions();
  }

  initAnimationsSubscriptions(): void {
    this.animationService.getHomeIntroduction().subscribe((homeIntroduction: ElementRef) => {
      this.onViewportScroll(homeIntroduction);
    });
  }

  private hideHeaders() {
    this.showHeader = false;
  }

  private showHeaders() {
    this.showHeader = true;
  }

  /**
   * ⤵️ Detects when the home introduction is out of the viewport and hides the header and mouse hover wrapper
   */
  public onViewportScroll(homeIntroduction?: ElementRef): void {
    const boundingRectHome = homeIntroduction?.nativeElement.getBoundingClientRect();
    const boundingRectHeader = this.headerWrapper?.nativeElement.getBoundingClientRect();
    if (boundingRectHeader != undefined && boundingRectHeader?.bottom > 0) {
      this.cacheBoundingRectHeader = boundingRectHeader?.bottom;
      this.localStorage.store('cacheBoundingRectHeader', this.cacheBoundingRectHeader);
    } else if (this.cacheBoundingRectHeader == undefined) {
      this.cacheBoundingRectHeader = this.localStorage.retrieve('cacheBoundingRectHeader');
    }
    if (boundingRectHome != undefined && boundingRectHome?.bottom > 0) {
      this.cacheBoundingRectHome = boundingRectHome?.bottom;
      this.localStorage.store('cacheBoundingRectHome', this.cacheBoundingRectHome);
    } else if (this.cacheBoundingRectHome == undefined) {
      this.cacheBoundingRectHome = this.localStorage.retrieve('cacheBoundingRectHome');
    }
    // If the mouse is hovering the wrapper or the home section is on the viewport, show the header
    if (this.mouseHoverWrapper || this.cacheBoundingRectHome >= this.cacheBoundingRectHeader) {
      this.showHeaders();
    } else {
      this.hideHeaders();
    }
  }

  playHoverSound(): void {
    if (this.hoverSoundRef) {
      const audio = this.hoverSoundRef.nativeElement;
      audio.currentTime = 0;
      audio.play().then(r => r).catch(e => e);
    }
  }

}
