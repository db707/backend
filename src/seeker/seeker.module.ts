import { Module } from '@nestjs/common';
import { SeekerController } from './seeker.controller';
import { SeekerService } from './seeker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seeker } from 'src/entities/Seeker';

@Module({
  imports: [TypeOrmModule.forFeature([Seeker])],
  controllers: [SeekerController],
  providers: [SeekerService]
})
export class SeekerModule {}
