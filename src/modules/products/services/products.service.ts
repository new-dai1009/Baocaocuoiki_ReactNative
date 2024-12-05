import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/database/entities/product.entity";
import { Between, Like, Repository } from "typeorm";
import { CreateProductDto } from "../dto/CreateProductsDTO.dto";
import { UpdateProductDto } from "../dto/UpdateProductsDTO.dto";
import { Category } from "src/database/entities/category.entity";
import { ProductImage } from "src/database/entities/product_image.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
        @InjectRepository(ProductImage)
        private productImagesRepository: Repository<ProductImage>
    ) {}

    // Lấy tất cả sản phẩm
    findAll() {
        return this.productsRepository.find();
    }
    // Lấy ra các sản phẩm New Arrival

    async getNewArrival() : Promise<Product[]> {
        const currenDate = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(currenDate.getDate() - 30);

        return this.productsRepository.find({
            where: {
                created_at : Between(thirtyDaysAgo, currenDate),
                
            },
            relations:['category','images'],
            order:{
                created_at:"DESC",
            },
        });
    }

    // Tìm sản phẩm theo ID
    async findOne(id: number): Promise<Product> {
        const product = await this.productsRepository.findOne({
            where:{product_id : id},
            relations: ['category', 'images']
        });
        if (!product) {
            throw new Error('Product not found');
            }
        return product;
    }

      // Tìm sản phẩm theo tên
      async findByName(name: string): Promise<Product[]> {
        const products = await this.productsRepository.find({
          where: {
            description: Like(`%${name}%`),  
          },
          relations: ['category', 'images'],
        });
      
        if (products.length === 0) {
          throw new NotFoundException(`No products found with name: ${name}`);
        }
      
        return products;
      }

    // Thêm sản phẩm mới
    async createProducts(createProductDto: CreateProductDto): Promise<Product> {
        const { name, description, price, categoryId, stock_quantity, collection, images } = createProductDto;
    
        const category = await this.categoriesRepository.findOne({
            where: { category_id: categoryId },
        });
        if (!category) {
            throw new NotFoundException(`Category with ID ${categoryId} not found`);
        }
        const product = this.productsRepository.create({
            name,
            description,
            price,
            stock_quantity,
            collection,
            category,
        });

        const savedProduct = await this.productsRepository.save(product);
    
        if (images && images.length > 0) {
            const imagesProduct = images.map((imageUrl) => {
                const productImage = this.productImagesRepository.create({
                    image_url: imageUrl, 
                    product: savedProduct,  
                });
                return productImage;
            });
    
            await this.productImagesRepository.save(imagesProduct);
        }
        return savedProduct;
    }

    // Cập nhật sản phẩm
    async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);
        if (!product) {
            throw new Error("Product not found");
        }
        // Cập nhật các trường của sản phẩm
        Object.assign(product, updateProductDto);
        return this.productsRepository.save(product);
    }

    // Xóa sản phẩm
    async deleteProduct(id: number): Promise<void> {
        const product = await this.findOne(id);
        if (!product) {
            throw new Error("Product not found");
        }
        await this.productsRepository.remove(product);
    }
}
function ILike(arg0: string): string | import("typeorm").FindOperator<string> {
    throw new Error("Function not implemented.");
}

