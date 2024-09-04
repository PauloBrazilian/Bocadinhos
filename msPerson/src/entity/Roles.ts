import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Roles {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    token: string


}