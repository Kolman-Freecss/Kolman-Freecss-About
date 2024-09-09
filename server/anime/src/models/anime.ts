import * as mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface AnimeAttrs {
   animeId: string;
   title: string;
   description: string;
   grade: number;
}

export interface AnimeDoc extends mongoose.Document {
   animeId: string;
   title: string;
   description: string;
   grade: number;
}

interface AnimeModel extends mongoose.Model<AnimeDoc> {
   build(attrs: AnimeAttrs): AnimeDoc;
}

const animeSchema = new mongoose.Schema(
   {
      animeId: {
         type: String,
         required: true,
      },
      title: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      grade: {
         type: Number,
         required: true,
         min: 0,
         max: 10,
      },
   },
   {
      toJSON: {
         transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
         },
      },
   }
);

animeSchema.plugin(updateIfCurrentPlugin);

animeSchema.statics.build = (attrs: AnimeAttrs) => {
   return new Anime(attrs);
};

const Anime = mongoose.model<AnimeDoc, AnimeModel>('Anime', animeSchema);

export { Anime };