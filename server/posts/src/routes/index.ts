import express, { Request, Response } from 'express';
import { Post } from '../models/post';

const router = express.Router();

/* GET home page. */
router.get('/api/posts', async (req: Request, res: Response) => {
   const post = await Post.find({});
   console.log(post);
   res.send(post);
});

export { router as indexRouter };
