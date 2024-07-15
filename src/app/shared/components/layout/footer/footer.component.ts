import { Component } from '@angular/core';
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

  youtubeIcon = faYoutube;

  constructor() { }

}
