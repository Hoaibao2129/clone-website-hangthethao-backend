import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiTags } from '@nestjs/swagger';
import { AddToCartDto } from './dto/addToCart.dto';

@Controller('cart')
@ApiTags('cart')
export class CartController {
    constructor(
        private cartService: CartService,
    ) { }

    @Post()
    async addToCart(@Body() addToCart: AddToCartDto) {
        return this.cartService.addToCart(addToCart)
    }

    @Get(':id')
    async viewDetailCart(@Param("id") id: string) {
        return this.cartService.getCartDetail(+id);
    }
}
