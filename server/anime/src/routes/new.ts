import express from 'express';

const router = express.Router();

router.post('/api/anime', (req, res) => {
   res.send('Hello World');
});

export { router as newAnimeRouter };