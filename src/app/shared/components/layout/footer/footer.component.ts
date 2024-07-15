import { Component, ElementRef, ViewChild } from '@angular/core';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent  {

  linkedin = 'https://www.linkedin.com/in/sergiomartinezroman/';
  github = 'https://github.com/Kolman-Freecss';
  youtube = 'https://www.youtube.com/@Kolman-Freecss/videos';

  @ViewChild('hoverSound') hoverSoundRef: ElementRef<HTMLAudioElement> | undefined;

  constructor() { }

  playHoverSound(): void {
    if (this.hoverSoundRef) {
      const audio = this.hoverSoundRef.nativeElement;
      audio.currentTime = 0;
      audio.play();
    }
  }

}
