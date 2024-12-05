import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn()
  review_id: number;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @Column()
  rating: number;

  @Column('text')
  comment: string;

  @CreateDateColumn()
  created_at: Date;
}
