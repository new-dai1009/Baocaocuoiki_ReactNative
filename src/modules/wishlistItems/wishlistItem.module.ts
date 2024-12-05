import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WishlistItem } from "src/database/entities/wishlist_item.entity";
import { WishlistsItemController } from "./controller/wishlistItem.controller";
import { WishlistItemService } from "./services/wishlistItem.service";
import { User } from "src/database/entities/user.entity";
import { UserModule } from "../users/users.module";
import { ProductModule } from "../products/products.module";
import { Product } from "src/database/entities/product.entity";





@Module({
    imports: [
        TypeOrmModule.forFeature([
            WishlistItem, Product, User
        ]),
        UserModule, ProductModule
    ],
    providers:[WishlistItemService],
    controllers: [WishlistsItemController],
})
export class WishlistItemModule {}