import { Injectable } from '@angular/core';
import { TimeCard, Time } from '../models/time-card';
import { Http } from '@angular/http';

@Injectable()
export class TimeCardService {
  port = 'http://sevis-challenge-back-time:8080';
  //port = 'http://localhost:8080';
  constructor(private http: Http) { }

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
    const timeCards = [
      new TimeCard(1, new Date(2018, 3, 16), new Date(2018, 3, 22), 'In Progress', [
        new Time(new Date(2018, 3, 23), 8, 1, 1)
      ]),
      new TimeCard(1, new Date(2018, 3, 23), new Date(2018, 3, 29), 'Submitted', [
        new Time(new Date(2018, 3, 23), 8, 1, 1)
      ])
    ];
    timeCards[0].id = 1;
    timeCards[1].id = 2;
    return timeCards;
  }

  saveTimeCard(timeCard) {
    return;
  }

  deleteTimeCard(timeCardId) {
    return;
  }

}
