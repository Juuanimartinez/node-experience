import { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  title: string;
  enable: boolean;
}

export const CategorySchema: Schema = new Schema({
  title: { type: String, required: true },
  enable: { type: Boolean, default: true }
});
