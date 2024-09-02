import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Category {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', type: 'varchar', length: 255 })
    categoryName: string;

}