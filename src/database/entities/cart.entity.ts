import { Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { CartItem } from './cart_item.entity';

@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @OneToOne(() => User, (user) => user.carts)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[];
}
