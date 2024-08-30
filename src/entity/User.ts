import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    imgUrl: string;

    @Column('int')
    quantity: number;

    @Column('decimal')
    price: number;

    @Column('simple-array')
    category: string[];
    
}