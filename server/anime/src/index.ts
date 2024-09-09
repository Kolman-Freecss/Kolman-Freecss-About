import * as mongoose from 'mongoose';
import app from './app';

const start = async () => {
  // if (!process.env.MONGO_URI) {
  //   throw new Error('MONGO_URI must be defined');
  // }

  // try {
  //   await mongoose.connect(process.env.MONGO_URI);
  //   console.log('Connected to MongoDb');
  // } catch (err) {
  //   console.error(err);
  // }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
