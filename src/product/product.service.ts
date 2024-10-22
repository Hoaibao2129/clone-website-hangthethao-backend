import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebaseService'
import { CreateProductDto } from './dto/createProduct.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { SubCategory } from '../entities/subCategory.entity';
import { FileName, Message } from 'enum/message.enum';
import { ResponseData } from 'helper/formatReturn';
import { FilterProduct } from './dto/filterProduct';
import { UpdateProductDto } from './dto/updateProduct.dto';

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
                return this.firebaseService.uploadFile(image, saveProduct.id, FileName.PRODUCT);
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

    async deleteProduct(id: number) {
        const checkProduct = await this.productRepository.findOne({ where: { id } });
        if (!checkProduct) {
            return ResponseData.error(Message.DOES_NOT_EXIST)
        }
        if (checkProduct.image.length > 0) {
            const deleteImgPromise = checkProduct.image.map((image) => {
                image = image.replace('https://storage.googleapis.com/manager-user-130aa.appspot.com/', '');
                return this.firebaseService.deleteFile(image);
            })
            Promise.all(deleteImgPromise);
        }
        const deleteProduct = await this.productRepository.delete(id);
        return ResponseData.success(deleteProduct, Message.DELETE_SUCCESS)
    }

    async updateProduct(images: Array<Express.Multer.File>, updateProductDto: UpdateProductDto) {
        const checkProduct = await this.productRepository.findOne({ where: { id: updateProductDto.id } });
        if (!checkProduct) {
            return ResponseData.error(Message.DOES_NOT_EXIST)
        }
        if (updateProductDto.imageDelete) {
            const deleteImgPromise = updateProductDto.imageDelete.map((image) => {
                image = image.replace('https://storage.googleapis.com/manager-user-130aa.appspot.com/', '');
                return this.firebaseService.deleteFile(image);
            })
            updateProductDto.imageDelete.map((imgDel) => {
                checkProduct.image = checkProduct.image.filter((img) => img !== imgDel);
            })
            Promise.all(deleteImgPromise);

        }
        if (images) {
            const getUrlImagesPromise = images.map((image) => {
                return this.firebaseService.uploadFile(image, checkProduct.id, FileName.PRODUCT);
            });
            const result = await Promise.all(getUrlImagesPromise);

            checkProduct.image.push(...result);
        }

        Object.assign(checkProduct, updateProductDto)
        const updateProduct = await this.productRepository.update(checkProduct.id, checkProduct);
        return ResponseData.success(updateProduct, Message.UPDATE_SUCCESS)
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
