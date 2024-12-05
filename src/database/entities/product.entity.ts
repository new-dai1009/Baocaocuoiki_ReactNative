import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { ProductImage } from './product_image.entity';
import { OrderItem } from './order_item.entity';
import { Review } from './review.entity';
import { CartItem } from './cart_item.entity';
import { WishlistItem } from './wishlist_item.entity';
import { PromotionProduct } from './promotion_product.entity';

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @Column()
  stock_quantity: number;

  @Column()
  collection: String;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => PromotionProduct, (promotionProduct) => promotionProduct.product)
  promotionProducts: PromotionProduct[];

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.product)
  wishlistItems: WishlistItem[];
}
