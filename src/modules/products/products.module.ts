import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/database/entities/product.entity";
import { ProductService } from "./services/products.service";
import { ProductController } from "./controller/products.controller";
import { CategoryModule } from "../categories/categories.module";
import { ProductImageModule } from "../productImage/productImage.module";



@Module({
    imports:[
        TypeOrmModule.forFeature([
            Product
        ]),
        CategoryModule, ProductImageModule
    ],
    providers: [ProductService],
    controllers: [ProductController],
    exports:[TypeOrmModule]
})
export class ProductModule{}