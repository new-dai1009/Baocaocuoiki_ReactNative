import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "src/database/entities/cart.entity";
import { ProductModule } from "../products/products.module";
import { UserModule } from "../users/users.module";
import { CartItemModule } from "../cartItem/cartItem.module";
import { CartController } from "./controller/carts.controller";
import { CartService } from "./services/carts.service";
import { CartItem } from "src/database/entities/cart_item.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Cart, CartItem]),
        forwardRef(() => ProductModule), 
        forwardRef(() => UserModule),     
        CartItemModule 
    ],
    controllers: [CartController],
    providers: [CartService],
})
export class CartModule {}
