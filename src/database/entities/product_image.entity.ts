import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity("product_images")
export class ProductImage {
  @PrimaryGeneratedColumn()
  product_image_id: number;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;

  @Column()
  image_url: string;

  @Column({ default: false })
  is_primary: boolean;
}
