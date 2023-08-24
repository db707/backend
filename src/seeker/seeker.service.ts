import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable,from } from 'rxjs';
import { Seeker } from 'src/entities/Seeker';
import { ShowSeekersInterface, ShowSeekerDetailsInterface } from 'src/interface/seeker';
import { Repository } from 'typeorm';

@Injectable()
export class SeekerService {
    constructor(@InjectRepository(Seeker)
    private readonly seekerRepository: Repository<Seeker>
    ){};

    showSeekers(id:number): Observable<ShowSeekersInterface[]>{
        const query1 = `
        SELECT 
        seeker.seekerid,
        seeker.firstname,
        seeker.lastname,
        MAX(apply.date) AS date,
        MAX(apply.applyid) AS applyid
        FROM seeker
        INNER JOIN apply ON seeker.seekerid = apply.seekerid
        WHERE apply.offerid = ?
        GROUP BY seeker.seekerid;
        `;
        return from(this.seekerRepository.query(query1, [id]));
    }

    showSeekerDetails(id:number): Observable<ShowSeekerDetailsInterface[]>{
        const query2 = `
        SELECT
        apply.applyid,
        apply.personaldescription,
        apply.experiencedescription,
        apply.seekerid,
        seeker.firstname,
        seeker.lastname,
        seeker.email
        FROM seeker
        INNER JOIN apply ON seeker.seekerid = apply.seekerid
        WHERE apply.applyid = ?
        
        `
        ;
        return from(this.seekerRepository.query(query2, [id]));
    }
}
