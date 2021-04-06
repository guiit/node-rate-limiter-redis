import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
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

export default config;
