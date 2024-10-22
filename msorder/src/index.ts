import 'reflect-metadata';
import 'dotenv/config';
import app from './app';
import { AppDataSource } from './DataSource';

AppDataSource.initialize()
    .then(async () => {
        app.set('port', process.env.PORT || 8090);
        app.listen(app.get('port'), () => {
            console.info('Server started on http://localhost:' + app.get('port'));
        });
    })
    .catch(error => console.log('Error during Data Source initialization:', error));