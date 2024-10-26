import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'entities/cart.entity';
import { CartDetail } from 'entities/cartDetail.entity';
import { Repository } from 'typeorm';
import { AddToCartDto } from './dto/addToCart.dto';
import { ResponseData } from 'helper/formatReturn';
import { Message } from 'enum/message.enum';
import { Product } from 'entities/product.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        @InjectRepository(CartDetail)
        private cartDetailRepository: Repository<CartDetail>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>

    ) { }

    async addToCart(addToCartDto: AddToCartDto) {
        if (!addToCartDto.cartId) {
            const newCart = new Cart();
            const cart = await this.cartRepository.save(newCart);
            addToCartDto.cartId = cart.id;
        }

        const checkCart = await this.cartRepository.findOne({ where: { id: addToCartDto.cartId } });
        if (!checkCart) {
            return ResponseData.error(`Cart ${Message.DOES_NOT_EXIST}`);
        }

        const checkProduct = await this.productRepository.findOne({ where: { id: addToCartDto.productId } });
        if (!checkProduct) {
            return ResponseData.error(`Product ${Message.DOES_NOT_EXIST}`);
        }

        const checkCartDetail = await this.cartDetailRepository.findOne({ where: { cart: { id: addToCartDto.cartId }, product: { id: addToCartDto.productId } } });
        if (checkCartDetail) {
            checkCartDetail.quantity = checkCartDetail.quantity + addToCartDto.quantity;
            await this.cartDetailRepository.update(checkCartDetail.id, checkCartDetail);
            return ResponseData.success(checkCartDetail, Message.CREATE_SUCCESS);
        }

        addToCartDto.product = checkProduct;
        addToCartDto.cart = checkCart;
        const saveCartDetail = await this.cartDetailRepository.save(addToCartDto);

        return ResponseData.success(saveCartDetail, Message.CREATE_SUCCESS);
    }

    async getCartDetail(id: number) {
        const cartDetail = await this.cartDetailRepository.find(
            {
                where: { cart: { id } },
                relations: ["product"]
            }
        );
        return ResponseData.success(cartDetail, Message.GET_SUCCESS);
    }
}
