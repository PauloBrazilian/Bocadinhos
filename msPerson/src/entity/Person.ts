import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn } from "typeorm"


@Entity()
export class Person {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'varchar', length: 255})
    imgurl: string;

    @Column({type: 'varchar', length: 11})
    cpf: string;

    @Column({type: 'varchar', length: 100, unique: true})
    email: string;

    @Column({type: 'varchar', length: 255})
    password: string;

    @Column( {default: false})
    isAdmin: boolean;

    @CreateDateColumn()
    dataRegistro: Date;


}
