import { Body, Controller, Post, Put } from '@nestjs/common';
import { ProductQuantityService } from './product-quantity.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProdQuantityDto } from './dto/createProdQlty.dto';
import { UpdateProdQuantityDto } from './dto/updateProdQlty.dto';

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

    @Put("")
    async updateProdQuantity(@Body() updateProdQuantityDto: UpdateProdQuantityDto) {
        return this.productQuantityService.updateProdQuantity(updateProdQuantityDto);
    }


}
