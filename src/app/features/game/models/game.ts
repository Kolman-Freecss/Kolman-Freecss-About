export interface Game {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
}

export interface GamePage {
  content: Game[];
  filteredSize: number;
  filteredPages: number;
  totalElements: number;
}

export interface SearchGamesQuery {
  name: string;
  description: string;
}
