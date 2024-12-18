import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { config as envConfig } from 'dotenv';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';
// import { FirebaseModule } from './firebase/firebase.module';
import { SizeModule } from './size/size.module';
import { ProductQuantityModule } from './product-quantity/product-quantity.module';
import { CartModule } from './cart/cart.module';
import { HistoryByProductModule } from './history-by-product/history-by-product.module';
import { InfoByProductModule } from './info-by-product/info-by-product.module';
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
          // entities: [join(__dirname, '**/*.entity{.ts,.js}')],
          entities: [join(__dirname, "entities/*.entity{.ts,.js}")],
          synchronize: true,
          // logging: true,
        };
      },
    }),
    CategoryModule,
    SubCategoryModule,
    AuthModule,
    AdminModule,
    ProductModule,
    SizeModule,
    ProductQuantityModule,
    CartModule,
    HistoryByProductModule,
    InfoByProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
