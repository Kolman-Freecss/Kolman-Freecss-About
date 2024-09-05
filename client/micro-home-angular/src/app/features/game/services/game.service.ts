import { Injectable, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Game, SearchGamesQuery } from '../models';
import { Options } from '../../../shared/models';
import { GamePage } from '../models/game';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GameService implements OnInit {

  games: Game[] = [];

  public gamesPulled = new Subject<void>();

  constructor(
    private firestore: Firestore
  ) {
  }

  ngOnInit(): void {
    this.refreshGames();
  }
  
  refreshGames(): void {
    this.loadGames();
  }

  /**
   * This method is used to load the games from the json file (deprecated_games.json)
   * */
  loadGames(): void {
    const highlightRef = collection(this.firestore, 'games');
    const firebaseGames = collectionData(highlightRef, {idField: 'id'}) as Observable<Game[]>;
    firebaseGames.subscribe((games) => {
      this.games = games;
      this.gamesPulled.next();
    });
  }

  searchGamesPaginated(query: SearchGamesQuery, options: Options): Observable<GamePage> {
    let gamePage: GamePage = {
      content: [],
      filteredSize: 0,
      filteredPages: 0,
      totalElements: 0,
    };
    let gamesFiltered: Game[] = [];

    if (query.name == null && query.description == null && (query.techs == null || query.techs.length === 0)) {
      return this.getGamesPaginated(options);
    }

    this.games.forEach((game) => {
      if (query.name != null && query.name.length > 0 && game.title.toLowerCase().includes(query.name.toLowerCase())) {
        gamesFiltered.push(game);
      }
      if (query.description != null && query.description.length > 0 && game.description.toLowerCase().includes(query.description.toLowerCase())) {
        gamesFiltered.push(game);
      }
      if (query.techs != null && query.techs.length > 0) {
        query.techs.forEach((tech) => {
          if (game.techs?.includes(tech) && !gamesFiltered.includes(game)) {
            gamesFiltered.push(game);
          }
        });
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
