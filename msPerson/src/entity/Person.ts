import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Person {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    imgurl: string

    @Column()
    cpf: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    Role: role

}
