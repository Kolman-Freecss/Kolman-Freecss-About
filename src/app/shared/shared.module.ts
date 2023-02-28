import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from './services/animation.service';
import { ScrollSectionDirective } from './directives/scroll-section.directive';
import { ScrollManagerDirective } from './directives/scroll-manager.directive';
import { ScrollAnchorDirective } from './directives/scroll-anchor.directive';



@NgModule({
   declarations: [
      ScrollSectionDirective,
      ScrollManagerDirective,
      ScrollAnchorDirective,
   ],
   imports: [
      CommonModule,
   ],
  exports: [
    ScrollSectionDirective,
    ScrollAnchorDirective,
    ScrollManagerDirective,
  ],
   providers: [
      AnimationService,
   ],
})
export class SharedModule { }
