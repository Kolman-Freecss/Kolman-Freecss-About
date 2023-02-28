export interface Game {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
}

export interface SearchGamesQuery {
  name: string;
  description: string;
}
