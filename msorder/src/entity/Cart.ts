import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Cart {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    productId: number

    @Column()
    personId: number    

}
