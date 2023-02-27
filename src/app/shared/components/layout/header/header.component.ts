import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AnimationService } from '../../../services/animation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges {

  @ViewChild('headerwrapper') headerWrapper!: ElementRef;
  cacheBoundingRectHeader!: any;
  cacheBoundingRectHome!: any;
  showHeader = true;
  @Input() mouseHoverWrapper = false;

  constructor(private animationService: AnimationService) {
  }

  ngOnInit(): void {
    this.initSubscriptions();
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
   *
   */
  public onViewportScroll(homeIntroduction?: ElementRef): void {
    const boundingRectHome = homeIntroduction?.nativeElement.getBoundingClientRect();
    const boundingRectHeader = this.headerWrapper?.nativeElement.getBoundingClientRect();
    if (boundingRectHeader != undefined && boundingRectHeader?.bottom > 0) {
      this.cacheBoundingRectHeader = boundingRectHeader?.bottom;
    }
    if (boundingRectHome != undefined && boundingRectHome?.bottom > 0) {
      this.cacheBoundingRectHome = boundingRectHome?.bottom;
    }
    // If the mouse is hovering the wrapper or the home section is on the viewport, show the header
    if (this.mouseHoverWrapper || this.cacheBoundingRectHome >= this.cacheBoundingRectHeader) {
      this.showHeaders();
    } else {
      this.hideHeaders();
    }
  }

}
