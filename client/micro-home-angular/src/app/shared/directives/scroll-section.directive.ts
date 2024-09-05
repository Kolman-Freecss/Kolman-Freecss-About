import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ScrollManagerDirective } from './scroll-manager.directive';

@Directive({
  selector: '[appScrollSection]',
})
export class ScrollSectionDirective implements OnInit {

  @Input('appScrollSection') id: string | number = 'default';

  constructor(
    private host: ElementRef<HTMLElement>,
    private manager: ScrollManagerDirective,
  ) {
  }

  ngOnInit() {
    this.manager.register(this);
  }

  ngOnDestroy() {
    this.manager.remove(this);
  }

  scroll() {
    this.host.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }

}
