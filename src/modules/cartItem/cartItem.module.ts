import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItem } from "src/database/entities/cart_item.entity";
import { CartModule } from "../cart/cart.module";






@Module({
    imports: [
        TypeOrmModule.forFeature([
            CartItem
        ]),
    ],

    controllers: [],
    providers: [],
})
export class CartItemModule{};