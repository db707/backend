import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Offer } from 'src/entities/Offer';
import { AddOfferInterface, ShowOfferDetailsInterface, ShowOfferInterface} from 'src/interface/offer';
import { ApplySeeker } from 'src/interface/apply';
import { Repository } from 'typeorm';

@Injectable()
export class OfferService {
    constructor(
        @InjectRepository(Offer)
        private readonly offerRepository: Repository<Offer>
        ) { };

    submitOffer(offerData: AddOfferInterface) {
        const {title, type, location, jobdescription, skilldescription, email} = offerData;
        const query = `
        INSERT INTO offer (title, type, location, jobdescription, skilldescription, email,date) 
        VALUES (?, ?, ?, ?, ?, ?, NOW())
        `;
        return from(this.offerRepository.query(query, [title, type, location, jobdescription, skilldescription, email]));
    }
    showOffer(): Observable<ShowOfferInterface[]>{
        const query2 = `
        SELECT 
        offer.offerid, 
        offer.title, 
        offer.type, 
        offer.location,
        offer.date,
        (SELECT COUNT(DISTINCT apply.seekerid) FROM apply WHERE apply.offerid = offer.offerid) AS seekers
        FROM offer;
        `;
        return from(this.offerRepository.query(query2));
    }

    showOfferDetails(id:number): Observable<ShowOfferDetailsInterface[]>{
        const query3 = `
        SELECT 
        offer.offerid, 
        offer.title, 
        offer.type, 
        offer.location,
        offer.date,
        offer.jobdescription,
        offer.skilldescription,
        offer.email
        FROM offer
        WHERE offer.offerid = ?
        `;
        return from(this.offerRepository.query(query3, [id]));
    }
    submitApply(id:number, applyData: ApplySeeker){
        return from(
          this.offerRepository.manager.transaction(async manager => {
            // Überprüfen, ob die E-Mail-Adresse existiert
            const seeker = await manager.query(
              'SELECT seekerid FROM seeker WHERE email = ? LIMIT 1',
              [applyData.email],
            );
    
            let seekerId;
            // Wenn die E-Mail-Adresse nicht existiert, fügen Sie einen neuen seeker ein
            if (seeker.length === 0) {
              const insertResult = await manager.query(
                'INSERT INTO seeker (firstname, lastname, email) VALUES (?, ?, ?)',
                [applyData.firstname, applyData.lastname, applyData.email],
              );
              seekerId = insertResult.insertId;
            } else {
              seekerId = seeker[0].seekerid;
            }
            // Fügen Sie den Eintrag in die apply-Tabelle ein
            await manager.query(
              'INSERT INTO apply (offerid, seekerid, experiencedescription, personaldescription, date) VALUES (?, ?, ?, ?, CURDATE())',
              [id, seekerId, applyData.experiencedescription, applyData.personaldescription],
            );
          })
        );
      }
}
