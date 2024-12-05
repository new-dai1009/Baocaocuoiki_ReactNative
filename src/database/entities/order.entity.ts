import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { OrderItem } from './order_item.entity';
import { Address } from './address.entity';
import { Payment } from './payment.entity';
import { Shipment } from './shipment.entity';

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @CreateDateColumn()
  order_date: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  total_amount: number;

  @Column()
  status: string;

  @ManyToOne(() => Address)
  shipping_address: Address;

  @ManyToOne(() => Address)
  billing_address: Address;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];

  @OneToMany(() => Shipment, (shipment) => shipment.order)
  shipments: Shipment[];
}
