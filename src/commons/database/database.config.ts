import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Env } from '../environment/env';

interface ITypeOrmConfig {
  [key: string]: TypeOrmModuleOptions;
}

const config: ITypeOrmConfig = {
  local: {
    type: 'sqlite',
    database: Env.DATABASE_NAME,
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
  },
  test: {
    type: 'sqlite',
    database: ':memory:',
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
  },
  development: {
    type: 'postgres',
    host: Env.DATABASE_HOST,
    port: Env.DATABASE_PORT,
    username: Env.DATABASE_USERNAME,
    password: Env.DATABASE_PASSWORD,
    database: Env.DATABASE_NAME,
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
  },
  production: {
    type: 'postgres',
    host: Env.DATABASE_HOST,
    port: Env.DATABASE_PORT,
    username: Env.DATABASE_USERNAME,
    password: Env.DATABASE_PASSWORD,
    database: Env.DATABASE_NAME,
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
  },
};

export const databaseConfigurationOptions: TypeOrmModuleOptions = {
  ...config[Env.NODE_ENV],
};
