import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
