import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn()
  address_id: number;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @Column()
  street_address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postal_code: string;

  @Column()
  country: string;
}
