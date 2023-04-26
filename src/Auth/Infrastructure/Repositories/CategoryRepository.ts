import { Model } from 'mongoose';
import { Service,Inject } from 'typedi';
import { CategoryMongoose } from '../../Domain/Entities/CategoryMongoose';
import { ICategoryRepository } from './ICategoryRepository';


@Service()
export class CategoryRepository implements ICategoryRepository
{
    constructor(@Inject('CategoryModel') private readonly categoryModel: Model<CategoryMongoose>)
    {}

    async getAll(): Promise<CategoryMongoose[]>
    {
        return this.categoryModel.find().exec();
    }

    async getOne(id: string): Promise<CategoryMongoose | null>
    {
        return this.categoryModel.findById(id).exec();
    }

    async create(category: CategoryMongoose): Promise<CategoryMongoose>
    {
        const newCategory = new this.categoryModel(category);
        return newCategory.save();
    }

    async update(id: string, category: CategoryMongoose): Promise<CategoryMongoose | null>
    {
        return this.categoryModel.findByIdAndUpdate(id, category, { new: true }).exec();
    }

    async remove(id: string): Promise<CategoryMongoose | null>
    {
        return this.categoryModel.findByIdAndRemove(id).exec();
    }
}
