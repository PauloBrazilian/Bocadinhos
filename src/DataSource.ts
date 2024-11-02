import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!, 10),
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    entities: [
        __dirname + '/../../dist/src/entity/*.js'
    ],
    migrations: [
        __dirname + '/../../dist/src/migrations/*.js'
    ],
    synchronize: false,
});

AppDataSource.initialize()
    .then(() => {
        console.log("Conexão com o banco de dados estabelecida");
    })
    .catch((error) => {
        console.error("Erro ao conectar ao banco de dados", error);
    });
