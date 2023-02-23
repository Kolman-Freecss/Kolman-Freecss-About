import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  home = '/home';
  games = '/games';

  constructor() { }

  ngOnInit(): void {
  }

}
