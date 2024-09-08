// TODO: Move to game.ts
export class HighlightGame {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  source: string;
  video: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.image = data.image;
    this.link = data.link;
    this.source = data.source;
    this.video = data.video;
  }
}
