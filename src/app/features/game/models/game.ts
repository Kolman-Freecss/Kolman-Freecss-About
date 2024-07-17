export interface Game {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  source: string;
  video: string;
  techs: string[];
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
  techs: string[];
}
