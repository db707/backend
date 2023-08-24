import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Apply } from "./Apply";

@Entity({name: 'offer'})
export class Offer {
    @PrimaryGeneratedColumn()
    offerid:number;

    @Column()
    title:string;

    @Column()
    type:string;

    @Column()
    location:string;

    @Column()
    jobdescription:string;

    @Column()
    skilldescription:string;

    @Column()
    email:string;

    @Column()
    date:Date;

    @OneToMany(()=> Apply, apply => apply.offer)
    applies: Apply[];
}