import { Controller,Get,Param} from '@nestjs/common';
import { SeekerService } from './seeker.service';

@Controller('seekers')
export class SeekerController {
    constructor(private readonly SeekerService: SeekerService) {};

    @Get(':id')
    showSeekers(@Param('id') id:number){
        return this.SeekerService.showSeekers(id);
    }

    @Get('/seekerdetails/:id') // Hier füge ich ':id' hinzu
    showSeekerDetails(@Param('id') id:number) { // Hier ändere ich @Body zu @Param
        return this.SeekerService.showSeekerDetails(id);
    }


}
