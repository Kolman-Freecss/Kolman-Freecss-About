import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  linkedin = 'https://www.linkedin.com/in/sergiomartinezroman/';
  github = 'https://github.com/Kolman-Freecss';
  youtube = 'https://www.youtube.com/channel/UCZ9Y4Z5QZ5Z9Z5Z9';

  constructor() { }

  ngOnInit(): void {
  }

}
