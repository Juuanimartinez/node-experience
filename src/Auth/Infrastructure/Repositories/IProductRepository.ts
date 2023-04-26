import { Product } from '../../Domain/Entities/Product';

export interface IProductRepository {
    getAll(): Promise<Product[]>;
    getOne(id: string): Promise<Product | null>;
    create(product: Product): Promise<Product>;
    update(id: string, product: Product): Promise<Product | null>;
    remove(id: string): Promise<Product | null>;
}
