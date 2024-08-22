import { Schema } from 'mongoose';

import { IBlog } from './interface';

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    content: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true }
);

export default blogSchema;
