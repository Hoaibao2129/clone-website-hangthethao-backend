import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductQuantity } from 'entities/productQuantity.entity';
import { Repository } from 'typeorm';
import { CreateProdQuantityDto } from './dto/createProdQlty.dto';
import { Product } from 'entities/product.entity';
import { Size } from 'entities/size.entity';
import { ResponseData } from 'helper/formatReturn';
import { Message } from 'enum/message.enum';
import { UpdateProdQuantityDto } from './dto/updateProdQlty.dto';
import { FilterProdQltyDto } from './dto/filterProdQlty.dto';

@Injectable()
export class ProductQuantityService {
    constructor(
        @InjectRepository(ProductQuantity)
        private productQuantityRepository: Repository<ProductQuantity>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Size)
        private sizeRepository: Repository<Size>,
    ) { }

    async createProdQuantity(createProdQuantityDto: CreateProdQuantityDto) {
        const checkProd = await this.productRepository.findOne({ where: { id: createProdQuantityDto.productId } });
        if (!checkProd) {
            return ResponseData.error(`Product ${Message.DOES_NOT_EXIST}`);
        }
        const checkSize = await this.sizeRepository.findOne({ where: { id: createProdQuantityDto.sizeId } });
        if (!checkSize) {
            return ResponseData.error(`Size ${Message.DOES_NOT_EXIST}`);
        }
        createProdQuantityDto.product = checkProd;
        createProdQuantityDto.size = checkSize;
        const saveProdQuantity = await this.productQuantityRepository.save(createProdQuantityDto);

        return ResponseData.success(saveProdQuantity, Message.CREATE_SUCCESS);
    }

    async updateProdQuantity(updateProdQuantityDto: UpdateProdQuantityDto) {
        const checkProdQlty = await this.productQuantityRepository.findOne({ where: { id: updateProdQuantityDto.id } })

        if (!checkProdQlty) {
            return ResponseData.error(Message.DOES_NOT_EXIST);
        }

        Object.assign(checkProdQlty, updateProdQuantityDto);
        const updateProdQuantity = await this.productQuantityRepository.update(checkProdQlty.id, checkProdQlty);


        return ResponseData.success(updateProdQuantity, Message.UPDATE_SUCCESS);
    }

    async deleteProdQuantity(id: number) {
        const del = await this.productQuantityRepository.delete(id);
        return ResponseData.success(del, Message.DELETE_SUCCESS);
    }

    async getProdQuantityByProductId(ProdQltyFilter: FilterProdQltyDto) {
        const where = this.buildWhereCondition(ProdQltyFilter);
        const prodQuantity: any = await this.productQuantityRepository.find({
            where,
        });
        console.log(prodQuantity);
        // return prodQuantity;
    }

    private buildWhereCondition(ProdQltyFilter: FilterProdQltyDto) {
        const where: any = {};
        if (ProdQltyFilter.productId) {
            where.product = { id: ProdQltyFilter.productId };
        }
        if (ProdQltyFilter.sizeId) {
            where.size = { id: ProdQltyFilter.sizeId };
        }

        return where;
    }
}
