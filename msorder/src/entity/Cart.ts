import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Cart {

    @PrimaryGeneratedColumn()
    cartId: number

    @Column("int", { array: true })
    productIds: number[]

    @Column()
    personId: number    

    @Column()
    total: number

}
