import express from 'express';
import { Anime } from '../models/anime';

const router = express.Router();

router.post('/api/anime', async (req, res) => {

   const newAnime = Anime.build({
      animeId: '1',
      title: 'Naruto',
      description: 'Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.',
      grade: 9.5
   });
   await newAnime.save().then((anime) => {
      console.log(anime);
   });

   res.send('Hello World');
});

export { router as newAnimeRouter };