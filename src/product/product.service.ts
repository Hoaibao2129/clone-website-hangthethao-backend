import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebaseService'
import { CreateProductDto } from './dto/createProduct.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
@Injectable()
export class ProductService {
    constructor(
        private firebaseService: FirebaseService,

    ) { }

    async insertProduct(images: Array<Express.Multer.File>, product: CreateProductDto) { }
}
