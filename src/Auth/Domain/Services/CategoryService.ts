import { Service } from 'typedi';
import { CategoryRepository } from '../../Infrastructure/Repositories/CategoryRepository';

@Service()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  getAll() {
    return this.categoryRepository.getAll();
  }

  getOne(id: string) {
    return this.categoryRepository.getOne(id);
  }

  create(category: any) {
    return this.categoryRepository.create(category);
  }

  update(id: string, category: any) {
    return this.categoryRepository.update(id, category);
  }

  remove(id: string) {
    return this.categoryRepository.remove(id);
  }
}
