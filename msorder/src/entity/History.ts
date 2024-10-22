import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Cart } from "./Cart" 

@Entity()
export class History {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Cart)
    cart?: Cart;

    @Column()
    creationDate: Date

}
