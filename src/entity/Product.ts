import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    imgUrl?: string;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'decimal' })
    price: number;

    @Column({ type: 'varchar', array: true, nullable: true })
    category?: string[];
}
