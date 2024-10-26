import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductQuantityService } from './product-quantity.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProdQuantityDto } from './dto/createProdQlty.dto';
import { UpdateProdQuantityDto } from './dto/updateProdQlty.dto';
import { FilterProdQltyDto } from './dto/filterProdQlty.dto';

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

    @Delete(":id")
    async deleteProdQuantity(@Param('id') id: string) {
        return this.productQuantityService.deleteProdQuantity(+id)
    }

    @Get("")
    async getProdQuantity(@Query() ProdQltyFilter: FilterProdQltyDto) {
        return this.productQuantityService.getProdQuantityByProductId(ProdQltyFilter);
    }

}
