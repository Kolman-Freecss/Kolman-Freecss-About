import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game, SearchGamesQuery } from '../models';
import data from '../../../../assets/data/games.json';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  games: Game[] = [];

  constructor() {
    this.loadGames();
  }

  /**
   * This method is used to load the games from the json file (games.json)
   * */
  loadGames(): void {
    this.games.push(...data);
  }

  searchGames(query: SearchGamesQuery): Observable<Game[]> {
    let gamesFiltered: Game[] = [];

    this.games.forEach((game) => {
      if (query.name != null && game.name.toLowerCase().includes(query.name.toLowerCase())) {
        gamesFiltered[game.id] = game;
      }
      if (query.description != null && game.description.toLowerCase().includes(query.description.toLowerCase())) {
        gamesFiltered[game.id] = game;
      }
    });

    return of(gamesFiltered);
  }

  getGames(): Observable<Game[]> {
    return of(this.games);
  }
}
