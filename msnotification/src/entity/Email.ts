import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Email {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fromEmail: string

    @Column()
    fromName: string

    @Column()
    replyTo: string

    @Column()
    subject: string

    @Column()
    body: string

    @Column()
    statusEmail: string

    @Column()
    img: string

}