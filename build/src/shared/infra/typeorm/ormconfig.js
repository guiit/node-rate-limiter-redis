"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['./src/modules/*/infra/typeorm/entities/*.ts'],
    cli: {
        migrationsDir: './src/shared/infra/typeorm/migrations'
    },
    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
    synchronize: false
};
exports.default = config;