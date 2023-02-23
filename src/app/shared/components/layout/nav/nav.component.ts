import { Component, OnInit } from '@angular/core';
import { GAMES_PATH, HOME_PATH } from '../../../paths';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  home = '/' + HOME_PATH;
  games = '/' + GAMES_PATH;

  constructor() { }

  ngOnInit(): void {
  }

}
