export interface AddOfferInterface {
    title: string;
    type: string;
    location: string;
    jobdescription: string;
    skilldescription: string;
    email: string;
    date: Date;
}

export interface ShowOfferInterface {
    offerid: number;
    title: string;
    type: string;
    location: string;
    seekers: number;
    date: Date;
}

export interface ShowOfferDetailsInterface {
    offerid: number;
    title: string;
    type: string;
    location: string;
    jobdescription: string;
    skilldescription: string;
    email: string;
    date: Date;
}