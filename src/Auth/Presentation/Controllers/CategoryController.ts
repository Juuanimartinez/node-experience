import { Context } from 'koa';
import { Service } from 'typedi';
import { CategoryService } from '../../../Auth/Domain/Services/CategoryService';

@Service()
export class CategoryController
{
    constructor(private readonly categoryService: CategoryService)
    {}

    async getAll(ctx: Context): Promise<void>
    {
        ctx.body = await this.categoryService.getAll();
    }

    async getOne(ctx: Context): Promise<void>
    {
        const id = ctx.params.id;
        ctx.body = await this.categoryService.getOne(id);
    }

    async create(ctx: Context): Promise<void>
    {
        const category = ctx.request.body;
        ctx.body = await this.categoryService.create(category);
    }

    async update(ctx: Context): Promise<void>
    {
        const id = ctx.params.id;
        const category = ctx.request.body;
        ctx.body = await this.categoryService.update(id, category);
    }

    async remove(ctx: Context): Promise<void>
    {
        const id = ctx.params.id;
        ctx.body = await this.categoryService.remove(id);
    }
}
