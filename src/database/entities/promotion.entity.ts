import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PromotionProduct } from './promotion_product.entity';

@Entity("promotions")
export class Promotion {
  @PrimaryGeneratedColumn()
  promotion_id: number;

  @Column()
  code: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 5, scale: 2 })
  discount_percentage: number;

  @CreateDateColumn()
  start_date: Date;

  @UpdateDateColumn()
  end_date: Date;

  @OneToMany(() => PromotionProduct, (promotionProduct) => promotionProduct.promotion)
  promotionProducts: PromotionProduct[];
}
