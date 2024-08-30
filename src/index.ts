import 'reflect-metadata';
import 'dotenv/config';
import app from './app';
import { AppDataSource } from '../data-source';
import { ProductRepository } from './repositories/ProductRepository';

AppDataSource.initialize()
    .then(async () => {
        const productRepository = new ProductRepository(AppDataSource);

        app.set('port', process.env.PORT || 8090);
        app.listen(app.get('port'), () => {
            console.info('Server started on http://localhost:' + app.get('port'));
        });
    })
    .catch(error => console.log(error));