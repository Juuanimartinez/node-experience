import { Service } from 'typedi';
import { ProductRepository } from '../../Infrastructure/Repositories/ProductRepository';

@Service()
export class ProductService
{
    constructor(private readonly productRepository: ProductRepository)
    {}

    getProducts()
    {
        return this.productRepository.getAll();
    }

    getProductById(id: string)
    {
        return this.productRepository.getOne(id);
    }

    createProduct(product: any)
    {
        return this.productRepository.create(product);
    }

    updateProduct(id: string, product: any)
    {
        return this.productRepository.update(id, product);
    }

    deleteProduct(id: string)
    {
        return this.productRepository.remove(id);
    }
}
