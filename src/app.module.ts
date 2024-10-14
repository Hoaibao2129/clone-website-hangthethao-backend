import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { config as envConfig } from 'dotenv';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
envConfig();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const portStr = process.env.DB_PORT;
        if (!portStr) {
          throw new Error('process.env.DB_PORT is not defined');
        }
        const port = parseInt(portStr, 10);
        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: port,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [join(__dirname, '**/*.entity{.ts,.js}')],
          synchronize: true,
        };
      },
    }),
    CategoryModule,
    SubCategoryModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }