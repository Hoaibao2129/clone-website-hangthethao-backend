import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebaseService'
import { CreateProductDto } from './dto/createProduct.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'category/entities/category.entity';
import { SubCategory } from 'sub-category/entities/subCategory.entity';
import { FileName, Message } from 'enum/message.enum';
import { ResponseData } from 'helper/formatReturn';
import { FilterProduct } from './dto/filterProduct';
@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(SubCategory)
        private subCategoryRepository: Repository<SubCategory>,

        private firebaseService: FirebaseService,
    ) { }

    async insertProduct(images: Array<Express.Multer.File>, product: CreateProductDto) {
        const urlImages: any[] = [];

        const checkCategory = await this.categoryRepository.findOne({ where: { id: product.categoryId } });
        const checkSubCategory = await this.subCategoryRepository.findOne({ where: { id: product.subCategoryId } });
        if (!checkCategory || !checkSubCategory) {
            return ResponseData.error(`Category or SubCategory ${Message.DOES_NOT_EXIST}`);
        }
        if (checkCategory.id !== checkSubCategory.categoryId) {
            return ResponseData.error(`SubCategory ${Message.DOES_NOT_EXIST}`);
        }
        const saveProduct = await this.productRepository.save(product);
        saveProduct.category = checkCategory
        saveProduct.subCategory = checkSubCategory;
        if (images.length > 0) {
            const getUrlImagesPromise = images.map((image) => {
                return this.firebaseService.uploadFile(image, 1, FileName.PRODUCT);
            });
            const result = await Promise.all(getUrlImagesPromise);
            urlImages.push(...result);
            saveProduct.image = urlImages;
            const updateProduct = await this.productRepository.save(saveProduct);
            return ResponseData.success(updateProduct, Message.CREATE_SUCCESS);
        }
        return ResponseData.success(saveProduct, Message.CREATE_SUCCESS);
    }

    async getProducts(filterProduct: FilterProduct) {
        const where = this.buildWhereCondition(filterProduct);
        const products = await this.productRepository.find({
            where,
        })

        this.buildWhereCondition(filterProduct);
        return ResponseData.success(products, Message.GET_SUCCESS);
    }

    private buildWhereCondition(filterProduct: FilterProduct) {
        const where: any = {};

        if (filterProduct.categoryId) {
            where.category = { id: filterProduct.categoryId };
        }

        if (filterProduct.subCategoryId) {
            where.subCategory = { id: filterProduct.subCategoryId };
        }

        return where;
    }
}
