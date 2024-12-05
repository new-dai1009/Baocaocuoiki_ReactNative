import { IsString, IsOptional, IsNumber, IsDecimal, Min, Max } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDecimal()
    @Min(0)
    @IsOptional()
    price?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    stock_quantity?: number;

    @IsOptional() 
    categoryId?: number;
}
