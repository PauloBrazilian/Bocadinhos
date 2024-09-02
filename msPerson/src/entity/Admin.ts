import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Admin {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    imgurl: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    Role: role

}
