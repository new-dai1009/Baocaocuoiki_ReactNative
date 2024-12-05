import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItem } from "src/database/entities/cart_item.entity";
import { Repository } from "typeorm";


@Injectable()
export class CartItemsService{
    constructor(

        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>
    ){}
}