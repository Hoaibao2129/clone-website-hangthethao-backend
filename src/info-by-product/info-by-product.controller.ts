import { Controller } from '@nestjs/common';
import { InfoBuyProduct } from 'entities/infoBuyProduct.entity';

@Controller('info-by-product')
export class InfoByProductController {
    constructor(
        private infoBuyProductService: InfoBuyProduct
    ) { }
}
