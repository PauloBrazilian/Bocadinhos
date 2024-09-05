import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Person } from './Person';

@Entity()
export class Admin {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Person)
    @JoinColumn()
    person: Person;

    @Column({default: 1})
    acess: number;

}
