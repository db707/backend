import { Controller,Post,Body,Get,Param} from '@nestjs/common';
import { OfferService } from './offer.service';
import { AddOfferInterface } from 'src/interface/offer';
import { ApplySeeker } from 'src/interface/apply';

@Controller('offer')
export class OfferController {
    constructor(private readonly OfferService: OfferService) {};

    @Get()
    showOffer(){
        return this.OfferService.showOffer();
    }

    @Get('/offerdetails/:id') // Hier füge ich ':id' hinzu
    showOfferDetails(@Param('id') id:number) { // Hier ändere ich @Body zu @Param
        return this.OfferService.showOfferDetails(id);
    }


    @Post()
    submitOffer(@Body() offerData:AddOfferInterface){
        return this.OfferService.submitOffer(offerData);
    }

    @Post('/submitapply/:id')
    submitApply(@Param('id') id:number, @Body() applyData:ApplySeeker){
        return this.OfferService.submitApply(id,applyData);
    }

}
