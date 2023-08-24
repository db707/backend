import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Seeker } from "./Seeker";
import { Offer } from "./Offer";

@Entity({ name: 'apply' })
export class Apply {
    @PrimaryGeneratedColumn()
    applyid: number;

    @Column()
    date:Date;

    @Column()
    experiencedescription:string;

    @Column()
    personaldescription:string;

    @ManyToOne(() => Seeker, seeker => seeker.applies)
    @JoinColumn({name:"seekerid"})
    seeker: Seeker;

    @ManyToOne(() => Offer, offer => offer.applies)
    @JoinColumn({name:"offerid"})
    offer: Offer;
}