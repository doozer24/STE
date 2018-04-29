import { Injectable } from '@angular/core';
import { TimeCard, Time } from '../models/time-card';
import { Http } from '@angular/http';
import * as _ from 'lodash';

@Injectable()
export class TimeCardService {
<<<<<<< HEAD
  port = 'http://localhost:8082';
=======
  port = 'sevis-challenge-back-time:8080';
  //port = 'http://localhost:8080';
>>>>>>> master
  constructor(private http: Http) { }

  async createTimeCard(startDate: Date, endDate: Date, loginId: string): Promise<any> {
    // const timeCard = new TimeCard(1, startDate, endDate, 'In Progress', [
    //   new Time(new Date(2018, 3, 23), 8, 1, 1)
    // ]);
    // timeCard.id = 1;
    // return timeCard;
    const that = this;
    return new Promise(resolve => {
      that.http.post(that.port + '/time/create', {loginId: loginId, startDate: startDate, endDate: endDate})
      .map(res => res.json())
      .subscribe(data => {
          resolve({data: data, error: null});
        },
        error => {
          resolve({data: null, error: error});
        }
      );
    });
  }

  getTimeCard(id): any {
    // const timeCard = new TimeCard(1, new Date(2018, 3, 23), new Date(2018, 3, 29), 'In Progress', [
    //   new Time(new Date(2018, 3, 23), 8, 1, 1)
    // ]);
    // timeCard.id = id;
    // return timeCard;
    const that = this;
    return new Promise(resolve => {
      that.http.get(that.port + '/time/id/' + id)
      .map(res => res.json())
      .subscribe(data => {
          resolve({data: that.convertJsonToTimeCard(data), error: null});
        },
        error => {
          resolve({data: null, error: error});
        }
      );
    });
  }

  getActiveTimeCardsForUser(userId): any {
    // const timeCards = [
    //   new TimeCard(1, new Date(2018, 3, 16), new Date(2018, 3, 22), 'In Progress', [
    //     new Time(new Date(2018, 3, 23), 8, 1, 1)
    //   ]),
    //   new TimeCard(1, new Date(2018, 3, 23), new Date(2018, 3, 29), 'Submitted', [
    //     new Time(new Date(2018, 3, 23), 8, 1, 1)
    //   ])
    // ];
    // timeCards[0].id = 1;
    // timeCards[1].id = 2;
    // return timeCards;
    const that = this;
    return new Promise(resolve => {
      that.http.get(that.port + '/time/employee/' + userId)
      .map(res => res.json())
      .subscribe(data => {
          resolve({data: data, error: null});
        },
        error => {
          resolve({data: null, error: error});
        }
      );
    });
  }

  saveTimeCard(timeCard) {
    return;
  }

  deleteTimeCard(timeCardId) {
    return;
  }

  convertJsonToTimeCard (json) {
    const timeCard = new TimeCard(json.employee, new Date(json.startDate), new Date(json.endDate), json.status);
    _.each(json.times, function(time) {
      timeCard.times.push(new Time(time.date, time.hours, time.taskId, time.projectId));
    });
    return timeCard;
  }

}
