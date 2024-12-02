import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InfoBuyProduct } from 'entities/infoBuyProduct.entity';
import { Repository } from 'typeorm';
@Injectable()
export class InfoByProductService {
    constructor(
        @InjectRepository(InfoBuyProduct)
        private infoBuyProd: Repository<InfoBuyProduct>,
    ) { }


    async getInfoBuyProduct() {
        const getInfoBuyProduct = await this.infoBuyProd.find();
        return getInfoBuyProduct;
    }

    async getInfoBuyProductById(id: number) {
        const getInfoBuyProduct = await this.infoBuyProd.findOne({ where: { id } });
        return getInfoBuyProduct
    }
}
