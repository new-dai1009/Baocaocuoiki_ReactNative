import { Controller, Get, Post, Body, Param, Put, Delete, Query } from "@nestjs/common";
import { ProductService } from "../services/products.service";
import { CreateProductDto } from "../dto/CreateProductsDTO.dto";
import { UpdateProductDto } from "../dto/UpdateProductsDTO.dto";
import { Product } from "src/database/entities/product.entity";

@Controller("products")
export class ProductController {
  constructor(
    private productService: ProductService
  ) {}

  // Lấy tất cả sản phẩm
  @Get()
  findAll() {
    return this.productService.findAll();
  }
  // Lấy các sản phẩm New Arival
  @Get('new-arrivals')
  async getNewArrival() : Promise<Product[]> {
    return this.productService.getNewArrival();
  }
  // Lấy sản phẩm theo ID
  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.productService.findOne(id);
  }
  //lấy sản phẩm theo tên

  @Get('search')
  async search(@Query('name') name: string): Promise<Product[]> {
    return this.productService.findByName(name);
  }
  // Thêm sản phẩm mới
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProducts(createProductDto);
  }

  // Cập nhật sản phẩm
  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  // Xóa sản phẩm
  @Delete(":id")
  async delete(@Param("id") id: number) {
    return this.productService.deleteProduct(id);
  }
}
