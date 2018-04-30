import { Injectable } from '@angular/core';
import { TimeCard, Time } from '../models/time-card';
import { Http, Response } from '@angular/http';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';
import * as JSONBigInt from 'json-bigint-string';

@Injectable()
export class TimeCardService {

  constructor(private http: Http) { }

  async createTimeCard(startDate: Date, endDate: Date, loginId: string): Promise<any> {
    // const timeCard = new TimeCard(1, startDate, endDate, 'In Progress', [
    //   new Time(new Date(2018, 3, 23), 8, 1, 1)
    // ]);
    // timeCard.id = 1;
    // return timeCard;
    const that = this;
    return new Promise(resolve => {
      that.http.post(environment.timeRoute + '/create', {loginId: loginId, startDate: startDate, endDate: endDate})
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
      that.http.get(environment.timeRoute + '/id/' + id)
      .map(res => res.json())
      .subscribe(data => {
          resolve({data: that.convertJsonToTimeCard(data, id), error: null});
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
      that.http.get(environment.timeRoute + '/employee/' + userId)
      .map(res => {
        return JSONBigInt.parse(res['_body']);
      })
      .subscribe(data => {
          resolve({data: that.convertJsonToTimeCardArray(data), error: null});
        },
        error => {
          resolve({data: null, error: error});
        }
      );
    });
  }

  saveTimeCard(timeCard) {
    const that = this;
    return new Promise(resolve => {
      that.http.put(environment.timeRoute + '/id/' + timeCard.id, timeCard.time)
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

  deleteTimeCard(timeCardId) {
    return;
  }

  convertJsonToTimeCardArray(json) {
    const that = this;
    const response = [];
    _.each(json, function(tcJson) {
      response.push(that.convertJsonToTimeCard(tcJson));
    });
    return response;
  }

  convertJsonToTimeCard (json, id = null) {
    const timeCard = new TimeCard(id ? id : json.id, json.employee, new Date(json.startDate + ' EST'), new Date(json.endDate + ' EST'), json.status);
    _.each(json.time, function(time) {
      timeCard.time.push(new Time(new Date(time.date + ' EST'), parseInt(time.hours), parseInt(time.taskId), parseInt(time.projectId)));
    });
    return timeCard;
  }

}
