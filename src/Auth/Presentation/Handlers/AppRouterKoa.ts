
import { CategoryController } from '../../../Auth/Presentation/Controllers/CategoryController';
import { ProductController } from '../../../Auth/Presentation/Controllers/ProductController';
import { Container } from 'typedi';
import Router from '@koa/router';
import { useKoaServer } from 'routing-controllers';

export class AppRouterKoa
{
    private router: Router;

    constructor(private readonly app: any)
    {
        this.router = new Router();
        this.registerRoutes();
    }

    getRouter()
    {
        return this.router;
    }

    private registerRoutes()
    {
        useKoaServer(this.app, {
            controllers: [CategoryController, ProductController],
            routePrefix: '/api'
        });
    }
}
