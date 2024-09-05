import { Directive, HostListener, Input } from '@angular/core';
import { ScrollManagerDirective } from './scroll-manager.directive';

@Directive({
  selector: '[appScrollAnchor]',
})
export class ScrollAnchorDirective {

  @Input('appScrollAnchor') id: string | number = 'default';

  constructor(private manager: ScrollManagerDirective) {
  }

  @HostListener('click')
  scroll() {
    this.manager.scroll(this.id);
  }

}
