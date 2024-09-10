import * as mongoose from 'mongoose';
import app from './app';
import { config } from 'dotenv';
import { natsWrapper } from './events/nats-wrapper';

config();

const start = async () => {
   if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI must be defined');
   }
   if (!process.env.NATS_CLIENT_ID) {
      throw new Error('NATS_CLIENT_ID must be defined');
   }
   if (!process.env.NATS_URL) {
      throw new Error('NATS_URL must be defined');
   }
   if (!process.env.NATS_CLUSTER_ID) {
      throw new Error('NATS_CLUSTER_ID must be defined');
   }

   try {

      await natsWrapper.connect(
         process.env.NATS_CLUSTER_ID, // Cluster ID previously defined 
         process.env.NATS_CLIENT_ID, // Unique client ID
         process.env.NATS_URL,
      );

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
