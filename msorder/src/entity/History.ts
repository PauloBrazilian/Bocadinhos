import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { BuyCart } from './BuyCart';

@Entity()
export class History {
  
  @PrimaryGeneratedColumn()
  historyId: number;

  @Column()
  creationDate: Date;

  @Column()
  status?: string;

  @OneToOne(() => BuyCart)
  @JoinColumn({ referencedColumnName: 'buyCartId' })  
  buyCart?: BuyCart;
  
}
