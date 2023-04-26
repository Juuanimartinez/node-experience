import { Service } from 'typedi';
import { Product } from '../../Domain/Entities/Product';
import { IProductRepository } from './IProductRepository';
import { getModelForClass } from '@typegoose/typegoose';

@Service()
export class ProductRepository implements IProductRepository
{
    private readonly productModel;

    constructor()
    {
        this.productModel = getModelForClass(Product);
    }

    async getAll(): Promise<Product[]>
    {
        return await this.productModel.find().populate('category').exec();
    }

    async getOne(id: string): Promise<Product | null>
    {
        return await this.productModel.findById(id).populate('category').exec();
    }

    async create(product: Product): Promise<Product>
    {
        const newProduct = new this.productModel(product);
        return await newProduct.save();
    }

    async update(id: string, product: Product): Promise<Product | null>
    {
        return await this.productModel.findByIdAndUpdate(id, product, {
            new: true,
            runValidators: true
        });
    }

    async remove(id: string): Promise<Product | null>
    {
        return await this.productModel.findByIdAndRemove(id);
    }
}
