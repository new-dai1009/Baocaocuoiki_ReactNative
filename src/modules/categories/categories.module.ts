import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/database/entities/category.entity";








@Module({
    imports: [
        TypeOrmModule.forFeature([
            Category
        ])
    ],
    providers:[],
    controllers:[],
    exports:[TypeOrmModule],
})
export class CategoryModule {}