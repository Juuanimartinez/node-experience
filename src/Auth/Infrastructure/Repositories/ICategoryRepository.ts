import { CategoryMongoose } from '../../Domain/Entities/CategoryMongoose';

export interface ICategoryRepository {
    getAll(): Promise<CategoryMongoose[]>;
    getOne(id: string): Promise<CategoryMongoose | null>;
    create(category: CategoryMongoose): Promise<CategoryMongoose>;
    update(id: string, category: CategoryMongoose): Promise<CategoryMongoose | null>;
    remove(id: string): Promise<CategoryMongoose | null>;
}
