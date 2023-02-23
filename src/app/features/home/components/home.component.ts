import { Component, OnInit } from '@angular/core';
import { GAMES_PATH } from '../../../shared/paths';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  game = "/" + GAMES_PATH;

  constructor() { }

  ngOnInit(): void {
  }

}
