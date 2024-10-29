import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiTags } from '@nestjs/swagger';
import { AddToCartDto } from './dto/addToCart.dto';
import { UpdateCartDto } from './dto/updateCart.dto';

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

    @Put()
    async updateCart(@Body() updateCart: UpdateCartDto) {
        return this.cartService.updateCartDetail(updateCart);
    }
}