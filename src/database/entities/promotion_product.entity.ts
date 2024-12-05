import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Promotion } from './promotion.entity';
import { Product } from './product.entity';

@Entity("promotion_products")
export class PromotionProduct {
  @PrimaryGeneratedColumn()
  promotion_product_id: number;

  @ManyToOne(() => Promotion, (promotion) => promotion.promotionProducts)
  promotion: Promotion;

  @ManyToOne(() => Product, (product) => product.promotionProducts)
  product: Product;
}
