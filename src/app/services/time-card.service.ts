import { Injectable } from '@angular/core';
import { TimeCard, Time } from '../models/time-card';

@Injectable()
export class TimeCardService {

  constructor() { }

  createTimeCard() {
    return true;
  }

  getTimeCard(id) {
    const timeCard = new TimeCard(1, new Date(2018, 3, 23), new Date(2018, 3, 29), "In Progress", [
      new Time(new Date(2018, 3, 23), 8, 1, 1)
    ]);
    timeCard.id = id;
    return timeCard;
  }

}
