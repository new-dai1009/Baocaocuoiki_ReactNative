import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity("shipments")
export class Shipment {
  @PrimaryGeneratedColumn()
  shipment_id: number;

  @ManyToOne(() => Order, (order) => order.shipments)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  carrier: string;

  @Column()
  tracking_number: string;

  @Column()
  ship_date: Date;

  @Column({ nullable: true })
  estimated_delivery_date: Date;

  @Column({ nullable: true })
  actual_delivery_date: Date;
}
