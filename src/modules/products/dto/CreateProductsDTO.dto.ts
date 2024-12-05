// create-product.dto.ts
import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  categoryId: number; 

  @IsNumber()
  stock_quantity: number;

  @IsString()
  collection: string;

  @IsOptional()
  @IsArray()
  images: string[];  
}
