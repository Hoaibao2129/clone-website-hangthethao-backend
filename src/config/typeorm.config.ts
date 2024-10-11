import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as envConfig } from 'dotenv';

envConfig();

export const config = {
  type: 'postgres',
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
  autoLoadEntities: true,
  migrations: ['migrations/*{.ts,.js}'],
  url: process.env.DB_URL,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
