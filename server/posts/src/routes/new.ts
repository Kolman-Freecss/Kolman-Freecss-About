import express from 'express';
import { Post } from '../models/./post';

const router = express.Router();

router.post('/api/anime', async (req, res) => {

   const newPost = Post.build({
      title: 'NewPost',
      description: 'PostDescription',
   });
   await newPost.save().then((post) => {
      console.log(post);
   });

   res.send('Hello World');
});

export { router as newAnimeRouter };