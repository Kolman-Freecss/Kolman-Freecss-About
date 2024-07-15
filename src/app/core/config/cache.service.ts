import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  soundMuted = false;

  public soundEventToggled = new Subject<boolean>();

  constructor() { }

  isSoundMuted(): boolean {
    return this.soundMuted;
  }

  toggleSoundMuted(): void {
    this.soundMuted = !this.soundMuted;
    this.soundEventToggled.next(this.soundMuted);
  }
}
