import { Body, Controller, Post } from '@nestjs/common';
import { ProductQuantityService } from './product-quantity.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProdQuantityDto } from './dto/createProdQlty.dto';

@Controller('product-quantity')
@ApiTags('product-quantity')
export class ProductQuantityController {
    constructor(
        private productQuantityService: ProductQuantityService,
    ) { }


    @Post("")
    async createProdQuantity(@Body() createProdQuantityDto: CreateProdQuantityDto) {
        return this.productQuantityService.createProdQuantity(createProdQuantityDto);
    }
}
