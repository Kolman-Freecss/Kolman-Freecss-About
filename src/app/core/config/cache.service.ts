import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  soundMuted = false;
  langSelected = 'en';

  public soundEventToggled = new Subject<boolean>();
  public langEventChanged = new Subject<string>();

  constructor(
    private translateService: TranslateService
  ) { }

  isSoundMuted(): boolean {
    return this.soundMuted;
  }

  toggleSoundMuted(): void {
    this.soundMuted = !this.soundMuted;
    this.soundEventToggled.next(this.soundMuted);
  }

  getLangSelected(): string {
    return this.langSelected;
  }

  setLangSelected(lang?: string): void {
    this.langSelected = lang ?? this.langSelected;
    const userLang = lang ? this.langSelected : navigator.language || this.langSelected;
    const languageCode = userLang.split('-')[0];
    this.translateService.setDefaultLang("messages." + languageCode);
    this.translateService.use("messages." + languageCode);
    this.langEventChanged.next(this.langSelected);
  }
}
