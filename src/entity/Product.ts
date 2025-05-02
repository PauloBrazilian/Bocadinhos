import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './Category';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    imgUrl?: string;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'decimal' })
    price: number;

    @ManyToOne(() => Category)
    category?: Category;
}
