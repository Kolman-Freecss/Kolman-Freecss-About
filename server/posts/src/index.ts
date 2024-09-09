import * as mongoose from 'mongoose';
import app from './app';
import { config } from 'dotenv';

config();

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3001, () => {
    console.log('Listening on port 3001!!!!!!!!');
  });
};

start();
