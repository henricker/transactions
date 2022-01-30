import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'accounts' })
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: number;

  @Column()
  password: number;
}
