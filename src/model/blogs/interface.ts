import { Types } from 'mongoose';

export interface IBlog {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  slug: string;
  userId: Types.ObjectId;
}
