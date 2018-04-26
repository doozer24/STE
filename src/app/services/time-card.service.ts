import { Injectable } from '@angular/core';
import { TimeCard, Time } from '../models/time-card';

@Injectable()
export class TimeCardService {

  constructor() { }

  createTimeCard(startDate: Date, endDate: Date) {
    const timeCard = new TimeCard(1, startDate, endDate, 'In Progress', [
      new Time(new Date(2018, 3, 23), 8, 1, 1)
    ]);
    timeCard.id = 1;
    return timeCard;
  }

  getTimeCard(id) {
    const timeCard = new TimeCard(1, new Date(2018, 3, 23), new Date(2018, 3, 29), 'In Progress', [
      new Time(new Date(2018, 3, 23), 8, 1, 1)
    ]);
    timeCard.id = id;
    return timeCard;
  }

  getActiveTimeCardsForUser(userId) {
    const timeCard = [
      new TimeCard(1, new Date(2018, 3, 16), new Date(2018, 3, 22), 'In Progress', [
        new Time(new Date(2018, 3, 23), 8, 1, 1)
      ]),
      new TimeCard(1, new Date(2018, 3, 23), new Date(2018, 3, 29), 'In Progress', [
        new Time(new Date(2018, 3, 23), 8, 1, 1)
      ])
    ];
    timeCard[0].id = 1;
    timeCard[1].id = 2;
    return timeCard;
  }

}
