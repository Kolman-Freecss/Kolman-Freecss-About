import express, { Request, Response } from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

export { router as indexRouter };
