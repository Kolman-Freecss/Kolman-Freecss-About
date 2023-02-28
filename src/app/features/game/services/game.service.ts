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

    if (query.name == null && query.description == null) {
      return this.getGames();
    }

    this.games.forEach((game) => {
      if (query.name != null && query.name.length > 0 && game.name.toLowerCase().includes(query.name.toLowerCase())) {
        gamesFiltered.push(game);
      }
      if (query.description != null && query.description.length > 0 && game.description.toLowerCase().includes(query.description.toLowerCase())) {
        gamesFiltered.push(game);
      }
    });

    return of(gamesFiltered);
  }

  getGames(): Observable<Game[]> {
    return of(this.games);
  }
}
