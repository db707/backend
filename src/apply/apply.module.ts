import { Module } from '@nestjs/common';
import { ApplyController } from './apply.controller';
import { ApplyService } from './apply.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apply } from 'src/entities/Apply';

@Module({
  imports: [TypeOrmModule.forFeature([Apply])],
  controllers: [ApplyController],
  providers: [ApplyService]
})
export class ApplyModule {}
