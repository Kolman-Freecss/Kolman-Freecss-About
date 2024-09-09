import express from 'express';
import { Post } from '../models/post';
import { PostCreatedPublisher } from '../events/publishers/post-created-publisher';
import { natsWrapper } from '../events/nats-wrapper';

const router = express.Router();

router.post('/api/post', async (req, res) => {

   const newPost = Post.build({
      title: 'NewPost',
      description: 'PostDescription',
   });
   
   await newPost.save().then((post) => {
      console.log(post);
   });
   
   new PostCreatedPublisher(natsWrapper.client).publish({
      title: newPost.title,
      description: newPost.description,
   });

   res.send('Hello World');
});

export { router as newPostsRouter };