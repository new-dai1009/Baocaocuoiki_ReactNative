import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "src/database/entities/cart.entity";
import { CartItem } from "src/database/entities/cart_item.entity";
import { Product } from "src/database/entities/product.entity";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";






@Injectable()
export class CartService{
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>
    ){}

    //Lấy sản phẩm trong giỏ hàng của người dùng 
    async getCartByUser(userId: number){
        const cart = await this.cartRepository.findOne(
            {where: {user: {user_id: userId}},
            relations: ['cartItems', 'cartItems.product', 'cartItems.product.images']
        });
        if(!cart){
            throw new Error('Cart not found');
        }
        return cart;
    }
    // Thêm sản phẩm vào giỏ hàng
    async adddCart(userId: number, productId: number, quantity: number) {
        const user = await this.userRepository.findOne({where: {user_id: userId}});
        const product = await this.productRepository.findOne({where: {product_id: productId}});
        if(!user || !product){
            throw new HttpException("User or Product not found", HttpStatus.NOT_FOUND);
        }
        let cart = await this.cartRepository.findOne({
            where: {user: {user_id: userId}}
        });
        if(!cart){
            cart = this.cartRepository.create({user});
            await this.cartRepository.save(cart);
        }
        const cartItem = await this.cartItemRepository.findOne({
            where: {cart: {cart_id: cart.cart_id}, product: {product_id: productId}},
        })
        if(cartItem){
            cartItem.quantity += quantity;
            await this.cartItemRepository.save(cartItem);
        }else{
            const newCartItem = this.cartItemRepository.create({
                cart,
                product,
                quantity
            });
            await this.cartItemRepository.save(newCartItem);

        }
        return cart;
    }
}