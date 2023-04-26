import { Schema } from 'mongoose';

export const ProductMongoose = new Schema({
  price: { type: Number, required: true },
  title: { type: String, required: true },
  enable: { type: Boolean, default: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
});
