import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Review } from './review.entity';
import { Address } from './address.entity';
import { Cart } from './cart.entity';
import { WishlistItem } from './wishlist_item.entity';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToOne(() => Cart, (cart) => cart.user)
  @JoinColumn()
  carts: Cart;

  @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.user)
  wishlistItems: WishlistItem[];
}
