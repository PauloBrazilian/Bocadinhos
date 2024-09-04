import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Roles } from './Roles';

@Entity()
export class Person {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 255})
    name: string

    @Column({type: 'varchar', length: 255})
    imgurl: string

    @Column({type: 'varchar', length: 11})
    cpf: string

    @Column({type: 'varchar', length: 255})
    email: string

    @Column({type: 'varchar', length: 255})
    password: string

    @ManyToMany(() => Roles)
    roles: Roles


}
