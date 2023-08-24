import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apply } from "../entities/Apply";
import { ApplyWithRelations } from '../interface/apply';
import { Observable, from } from 'rxjs';


@Injectable()
export class ApplyService {
    constructor(
        @InjectRepository(Apply)
        private readonly applyRepository: Repository<Apply>,
    ) { }

    findAll(): Observable<ApplyWithRelations[]> {
        const query = `
        SELECT 
            offer.offerid AS ID,  
            apply.date AS date,
            offer.offerid AS offerID,
            offer.type AS offerType, 
            offer.title AS offerTitle, 
            offer.location AS offerLocation,
            seeker.seekerid AS seekerID,
            seeker.firstname AS seekerFirstName, 
            seeker.lastname AS seekerLastName 
        FROM 
            offer 
        LEFT JOIN 
            apply ON offer.offerid = apply.offerid 
        LEFT JOIN 
            seeker ON apply.seekerid = seeker.seekerid;
    `;
        return from(this.applyRepository.query(query));
    }
}