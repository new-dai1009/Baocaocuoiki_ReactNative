import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/database/entities/product.entity";
import { User } from "src/database/entities/user.entity";
import { WishlistItem } from "src/database/entities/wishlist_item.entity";
import { Repository } from "typeorm";

@Injectable()
export class WishlistItemService {
    constructor(
        @InjectRepository(WishlistItem)
        private readonly wishlistItemRepository: Repository<WishlistItem>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>

    ){}


    //Thêm Product vào Wishlits
    async addToProductWishList(userId: number, productId:number): Promise<WishlistItem>{
            const user = await this.userRepository.findOne({
                where: {user_id: userId }
            });
            if(!user){
                throw new NotFoundException("User not Found!");

            }
            const product = await this.productRepository.findOne({
                where:{product_id: productId}
            });
            if(!product){
                throw new NotFoundException("Product not Found!");
            }
            //kiểm tra sản phẩm đã tồn tại chưa
            const existingItem = await this.wishlistItemRepository.findOne({
                where: {user: {user_id: userId}, product: {product_id: productId}},
            });
            if(existingItem){
                throw new ConflictException("Product is already in your wishlist");
            }
            const wishlistItem = this.wishlistItemRepository.create({
                user: user,
                product: product
            })

        return this.wishlistItemRepository.save(wishlistItem);

    }
    //Lấy tất tất cả sản phẩm có trong wishlist
    async getAllWishlistItems(userId: number) : Promise<WishlistItem[]>{
        const user = await this.userRepository.findOne({
            where: {user_id: userId },
            relations:["wishlistItems", "wishlistItems.product"]
        });
        if(!user){
            throw new NotFoundException("User not Found!");
            }
        return user.wishlistItems;
    }
}