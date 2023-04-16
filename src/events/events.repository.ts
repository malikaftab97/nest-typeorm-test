import {DataSource, Repository, Raw} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {Event} from './entities/event.entity';

@Injectable()
export class EventRepository extends Repository<Event>
{
    constructor(private dataSource: DataSource)
    {
        super(Event, dataSource.createEntityManager());
    }

    /**
     * Get all events with workshops.
     */
    getEventsWithWorkshops = async () =>{
        return await this.createQueryBuilder("event")
                        .leftJoinAndSelect("event.workshops", "workshop")
                        .getMany();
    }

    /**
     * Get future schedule events.
     */
    getFutureEventWithWorkshops = async () =>{
        const myDate = new Date();
        const currentdate = myDate.getFullYear() + '-' +('0' + (myDate.getMonth()+1)).slice(-2)+ '-' +  ('0' + myDate.getDate()).slice(-2) + ' '+myDate.getHours()+ ':'+('0' + (myDate.getMinutes())).slice(-2)+ ':'+myDate.getSeconds();
        return await this.createQueryBuilder("event")
                        .leftJoinAndSelect("event.workshops", "workshop")
                        .where("workshop.start > :start", { start: `${currentdate}`})
                        .getMany();
    } 
}