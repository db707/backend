import { Controller,Get } from '@nestjs/common';
import { ApplyService } from "./apply.service";

@Controller('apply')
export class ApplyController {
    constructor(private readonly ApplyService: ApplyService){};

    @Get()
    findAll(){
        return this.ApplyService.findAll();
    }

}
