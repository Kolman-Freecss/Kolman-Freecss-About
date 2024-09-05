import { ElementRef, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  homeIntroduction = new Subject<ElementRef>();

  constructor() {
    // Empty constructor
  }

  getHomeIntroduction(): Observable<ElementRef> {
    return this.homeIntroduction.asObservable();
  }

  setHomeIntroduction(homeIntroduction: ElementRef) {
    this.homeIntroduction.next(homeIntroduction);
  }

}
