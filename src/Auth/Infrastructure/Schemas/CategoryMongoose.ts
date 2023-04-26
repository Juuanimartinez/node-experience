import { Schema } from 'mongoose';

export const CategoryMongoose = new Schema({
  title: { type: String, required: true },
  enable: { type: Boolean, default: true }
});
