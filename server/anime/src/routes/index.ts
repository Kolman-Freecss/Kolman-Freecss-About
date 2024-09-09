import express, { Request, Response } from 'express';
import { Anime } from '../models/anime';

const router = express.Router();

/* GET home page. */
router.get('/api/animes', async (req: Request, res: Response) => {
   const animes = await Anime.find({}).populate('anime');
   res.send(animes);
});

export { router as indexRouter };
