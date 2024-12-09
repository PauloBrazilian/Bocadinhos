import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Cart } from "./Cart";
import { PaymentEnum } from "../useCases/enums/PaymentEnum";
import { StatusEnum } from "../useCases/enums/StatusEnum";

@Entity()
export class BuyCart {

    @PrimaryGeneratedColumn()
    buyCartId: number

    @Column({type: "enum", enum: PaymentEnum })
    payment: PaymentEnum 
    
    @Column({type: "enum", enum: StatusEnum})
    status: StatusEnum 

    @OneToOne(() => Cart)
    @JoinColumn({ referencedColumnName: "cartId" })  
    cart: Cart

}
