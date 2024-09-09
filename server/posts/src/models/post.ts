import * as mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface PostAttrs {
   title: string;
   description: string;
}

export interface PostDoc extends mongoose.Document {
   title: string;
   description: string;
}

interface PostModel extends mongoose.Model<PostDoc> {
   build(attrs: PostAttrs): PostDoc;
}

const animeSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
   },
   {
      collection: 'Post',
      toJSON: {
         transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
         },
      },
   }
);

animeSchema.plugin(updateIfCurrentPlugin);

animeSchema.statics.build = (attrs: PostAttrs) => {
   return new Post(attrs);
};

const Post = mongoose.model<PostDoc, PostModel>('Post', animeSchema);

export { Post };