import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductImage } from "src/database/entities/product_image.entity";







@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductImage
        ])
    ],
    providers:[],
    controllers: [],
    exports:[TypeOrmModule],
})

export class ProductImageModule{}