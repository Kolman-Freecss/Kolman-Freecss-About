import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game, SearchGamesQuery } from '../models';
import data from '../../../../assets/data/games.json';
import { Options } from '../../../shared/models';
import { GamePage } from '../models/game';

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

  searchGamesPaginated(query: SearchGamesQuery, options: Options): Observable<GamePage> {
    let gamePage: GamePage = {
      content: [],
      filteredSize: 0,
      filteredPages: 0,
      totalElements: 0,
    };
    let gamesFiltered: Game[] = [];

    if (query.name == null && query.description == null) {
      return this.getGamesPaginated(options);
    }

    this.games.forEach((game) => {
      if (query.name != null && query.name.length > 0 && game.name.toLowerCase().includes(query.name.toLowerCase())) {
        gamesFiltered.push(game);
      }
      if (query.description != null && query.description.length > 0 && game.description.toLowerCase().includes(query.description.toLowerCase())) {
        gamesFiltered.push(game);
      }
    });
    let numGamesFiltered = gamesFiltered.length;
    gamesFiltered = gamesFiltered.slice(options.page * options.pageSize, options.page * options.pageSize + options.pageSize);

    gamePage.content = gamesFiltered;
    gamePage.filteredSize = gamesFiltered.length;
    gamePage.filteredPages = Math.ceil(numGamesFiltered / options.pageSize);
    gamePage.totalElements = numGamesFiltered;
    return of(gamePage);
  }

  getGamesPaginated(options: Options): Observable<GamePage> {
    let gamePage: GamePage = {
      content: [],
      filteredSize: 0,
      filteredPages: 0,
      totalElements: 0,
    };
    let gamesFiltered: Game[] = [];

    gamesFiltered = this.games.slice(options.page * options.pageSize, options.page * options.pageSize + options.pageSize);
    gamePage.content = gamesFiltered;
    gamePage.filteredSize = gamesFiltered.length;
    gamePage.filteredPages = Math.ceil(this.games.length / options.pageSize);
    gamePage.totalElements = this.games.length;
    return of(gamePage);
  }

  getGames(): Observable<Game[]> {
    return of(this.games);
  }
}
