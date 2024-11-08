import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { BuyCart } from './BuyCart';

@Entity()
export class History {
  
  @PrimaryGeneratedColumn()
  historyId: number;

  @OneToOne(() => BuyCart)
  @JoinColumn({ referencedColumnName: 'buyCartId' })  
  buyCart?: BuyCart;

  @Column()
  creationDate: Date;

  @Column()
  status?: string;
}
