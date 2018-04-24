import { Component, OnInit } from '@angular/core';
import { TimeCardService } from '../services/time-card.service';

@Component({
  selector: 'app-create-time-card',
  templateUrl: './create-time-card.component.html',
  styleUrls: ['./create-time-card.component.css']
})
export class CreateTimeCardComponent implements OnInit {

  constructor(private timeCardService: TimeCardService) { }

  ngOnInit() {
  }

  async onSubmit() {
    const timeCard = await this.timeCardService.createTimeCard();
  }

}
