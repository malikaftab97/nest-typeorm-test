import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Workshop } from './entities/workshop.entity';
import { Event } from './entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRepository } from './events.repository';

export const eventsModuleConfig = {
  imports: [TypeOrmModule.forFeature([Event, Workshop])],
  controllers: [EventsController],
  providers: [EventsService,EventRepository],
};

@Module(eventsModuleConfig)
export class EventsModule {}
