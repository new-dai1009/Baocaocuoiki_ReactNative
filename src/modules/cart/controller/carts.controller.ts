import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { CartService } from "../services/carts.service";
import { Cart } from "src/database/entities/cart.entity";
import { AddToCartDto } from "../dto/add-cart.dto";




@Controller('carts')
export class CartController{
    constructor(
        private readonly cartService: CartService
    ){}
    
    @Get(":userId")
    async getCart(@Param('userId') userId: number): Promise<Cart> {
        return this.cartService.getCartByUser(userId);
    }
    @Post('add')
    async addToCart(@Body() addToCartDto: AddToCartDto) {
      const { userId, productId, quantity } = addToCartDto;
      try {
        const cart = await this.cartService.adddCart(userId, productId, quantity);
        return {
          message: 'Product added to cart successfully',
          cart: cart
        };
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
}


