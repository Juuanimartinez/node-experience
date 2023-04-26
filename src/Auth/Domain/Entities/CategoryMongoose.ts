import { Schema, Document } from 'mongoose';

export interface CategoryMongoose extends Document {
    title: string;
    enable: boolean;
}

export const CategorySchema = new Schema<CategoryMongoose>({
    title: { type: String, required: true },
    enable: { type: Boolean, required: true }
});
