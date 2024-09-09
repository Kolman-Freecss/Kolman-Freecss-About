import * as mongoose from 'mongoose';
import app from './app';
import { config } from 'dotenv';
import { PostCreatedListener } from './events/listeners/post-created-listener';
import { natsWrapper } from './events/nats-wrapper';

config();

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    
    await natsWrapper.connect(
      "anime", // Cluster ID previously defined 
      "abc", // Unique client ID
      "http://localhost:4222"
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }
  
  console.log('Starting up listeners...');
  new PostCreatedListener(natsWrapper.client).listen();
  console.log('Listeners started!');

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
