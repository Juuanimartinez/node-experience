import { Context } from 'koa';
import { ProductService } from '../../Domain/Services/ProductService';
import { Service } from 'typedi';
import { Product } from 'Auth/Domain/Entities/Product';

@Service()
export class ProductController
{
    constructor(private readonly productService: ProductService)
    {}

    public async getProducts(ctx: Context): Promise<void>
    {
        const products = await this.productService.getProducts();
        ctx.body = products;
    }

    public async getProduct(ctx: Context): Promise<void>
    {
        const id = ctx.params.id;
        const product = await this.productService.getProductById(id);
        ctx.body = product;
    }

    public async createProduct(ctx: Context): Promise<void>
    {
        const newProduct = ctx.request.body;
        const createdProduct = await this.productService.createProduct(newProduct);
        ctx.body = createdProduct;
    }

    public async updateProduct(ctx: Context): Promise<void>
    {
        const id = ctx.params.id;
        const updatedProductData = ctx.request.body;
        const updatedProduct = await this.productService.updateProduct(id, updatedProductData);
        ctx.body = updatedProduct;
    }

    public async deleteProduct(ctx: Context): Promise<void>
    {
        const id = ctx.params.id;
        const deletedProduct = await this.productService.deleteProduct(id);
        ctx.body = { message: 'Product deleted successfully', deletedProduct };
    }
}
