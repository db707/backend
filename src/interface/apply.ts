import { Apply } from "../entities/Apply";


export interface ApplyWithRelations extends Apply {
    ID: number;
    offerID: number;
    seekerID: number;
    date: Date;
    offerType: string;
    offerTitle: string;
    offerLocation: string;
    seekerFirstName: string;
    seekerLastName: string;
}



export interface ApplySeeker extends Apply {
    firstname: string;
    lastname: string;
    personaldescription: string;
    experiencedescription: string;
    email: string;
}