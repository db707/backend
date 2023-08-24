import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { Apply } from "./Apply";

@Entity({name: 'seeker'})
export class Seeker {
    @PrimaryGeneratedColumn()
    seekerid: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({unique:true})
    email:string;

    @OneToMany(()=> Apply, apply => apply.seeker)
    applies: Apply[];
}