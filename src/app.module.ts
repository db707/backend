import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/Offer';
import { Seeker } from './entities/Seeker';
import { Apply } from './entities/Apply';
import { OfferModule } from './offer/offer.module';
import { SeekerModule } from './seeker/seeker.module';
import { ApplyModule } from './apply/apply.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'recruitmentcenter',
      entities: [Offer,Seeker,Apply],
      synchronize: false,
    }),
    OfferModule,
    SeekerModule,
    ApplyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
