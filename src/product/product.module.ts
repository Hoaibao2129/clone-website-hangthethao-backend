import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
// import { FirebaseModule } from 'firebase/firebase.module';
import { FirebaseService } from 'firebase/firebaseService';

@Module({
  // imports: [FirebaseModule],
  controllers: [ProductController],
  providers: [ProductService, FirebaseService]
})
export class ProductModule { }
