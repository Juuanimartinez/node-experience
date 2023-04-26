import 'reflect-metadata';
import './inversify.config';
import './register';

import MainConfig from './Config/MainConfig';
import DatabaseFactory from './Shared/Factories/DatabaseFactory';

import EventHandler from './Shared/Infrastructure/Events/EventHandler';
import CacheFactory from './Shared/Factories/CacheFactory';
import ICacheRepository from './Shared/Infrastructure/Repositories/ICacheRepository';

import CronFactory from './Shared/Factories/CronFactory';
import ICreateConnection from './Shared/Infrastructure/Database/ICreateConnection';
import Logger from './Shared/Application/Logger/Logger';

// Importaciones adicionales
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { Container } from 'typedi';
import { model, Schema } from 'mongoose';
import { CategoryMongoose } from './Auth/Domain/Entities/CategoryMongoose';
import { CategoryController } from './Auth/Presentation/Controllers/CategoryController';
import { ProductController } from './Auth/Presentation/Controllers/ProductController';

void (async() =>
{
    const config = MainConfig.getInstance().getConfig();

    const databaseFactory = new DatabaseFactory();
    const createConnection: ICreateConnection = databaseFactory.create();

    const cache: ICacheRepository = CacheFactory.createRedisCache(config.cache.redis);
    const eventHandler = EventHandler.getInstance();

    // Crear el esquema y el modelo de Mongoose para Category
    const categorySchema = new Schema<CategoryMongoose>({
        title: { type: String, required: true },
        enable: { type: Boolean, required: true }
    });

    const CategoryModel = model<CategoryMongoose>('Category', categorySchema);
    Container.set('CategoryModel', CategoryModel);

    // Crear la aplicación Koa y configurar el enrutador
    const koaApp = new Koa();
    const router = new Router();

    const categoryController = Container.get(CategoryController);
    router.get('/categories', categoryController.getAll.bind(categoryController));
    router.get('/categories/:id', categoryController.getOne.bind(categoryController));
    router.post('/categories', categoryController.create.bind(categoryController));
    router.put('/categories/:id', categoryController.update.bind(categoryController));
    router.delete('/categories/:id', categoryController.remove.bind(categoryController));

    // (...)
    const productController = Container.get(ProductController);
    router.get('/products', productController.getProducts.bind(productController));
    router.get('/products/:id', productController.getProduct.bind(productController));
    router.post('/products', productController.createProduct.bind(productController));
    router.put('/products/:id', productController.updateProduct.bind(productController));
    router.delete('/products/:id', productController.deleteProduct.bind(productController));
    // (...)


    koaApp.use(bodyParser());
    koaApp.use(router.routes()).use(router.allowedMethods());

    try
    {
        await createConnection.initConfig();
        await createConnection.create();

        await cache.cleanAll();

        await eventHandler.setListeners();

        const cronFactory = new CronFactory();
        cronFactory.start();

        // Escuchar en el servidor Koa en lugar del servidor predeterminado
        koaApp.listen(config.app.serverPort, () =>
        {
            console.log(`Server is running on port ${config.app.serverPort}`);
        });
    }
    catch (error)
    {
        await Logger.info('Error while connecting to the database', error);
        throw error;
    }

    async function closeGracefully(signal: NodeJS.Signals)
    {
        await createConnection.close(true);
        cache.close();
        await eventHandler.removeListeners();

        process.kill(process.pid, signal);
    }

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.once('SIGINT', closeGracefully);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.once('SIGTERM', closeGracefully);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.once('SIGUSR2', closeGracefully);
})();
