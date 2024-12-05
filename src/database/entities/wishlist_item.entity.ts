import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity("wishlist_items")
export class WishlistItem {
  @PrimaryGeneratedColumn()
  wishlist_item_id: number;

  @ManyToOne(() => User, (user) => user.wishlistItems)
  user: User;

  @ManyToOne(() => Product, (product) => product.wishlistItems)
  product: Product;

  @Column({ default: true })
  is_active: boolean; 
  
  @CreateDateColumn()
  create_date: Date;
  
}
