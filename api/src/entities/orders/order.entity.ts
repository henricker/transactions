import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../accounts/account.entity';

export enum OrderStatus {
  Pending = 'pending',
  Approved = 'approved',
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  account_id: number;

  @Column({ nullable: false, type: 'float' })
  amount: number;

  @Column({ nullable: false })
  credit_card_number: string;

  @Column({ nullable: false })
  credit_card_name: string;

  @Column({ nullable: false })
  credit_card_cvv: number;

  @Column({ nullable: false, default: OrderStatus.Pending })
  status: OrderStatus;

  @ManyToOne(() => Account, {
    cascade: true,
  })
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
