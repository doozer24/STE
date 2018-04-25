import { Component, OnInit } from '@angular/core';
import { TimeCardService } from '../services/time-card.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  timeCards;
  userProjects;
  constructor(private timeCardService: TimeCardService) { }

  async ngOnInit() {
    this.timeCards = await this.timeCardService.getActiveTimeCardsForUser("userId");
  }

}
