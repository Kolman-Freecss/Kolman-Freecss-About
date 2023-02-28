export interface Game {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface SearchGamesQuery {
  name: string;
  description: string;
}
