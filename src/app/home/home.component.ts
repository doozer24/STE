import { Component, OnInit } from '@angular/core';
import { TimeCardService } from '../services/time-card.service';
import { ProjectService } from '../services/project.service';
import { User } from '../models/user';
import { Project } from '../models/project';
import { TimeCard } from '../models/time-card';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  timeCards: Array<TimeCard>;
  userProjects: Array<Project>;
  user: User;
  userId: string;
  constructor(private timeCardService: TimeCardService, private userService: UserService) { }

  async ngOnInit() {
    const that = this;
    this.user = JSON.parse(localStorage.getItem('timeAndAdminUser'));
    this.timeCardService.getActiveTimeCardsForUser(this.user.loginId).then(function(timeCards) {
      this.timeCards = timeCards.data;
    });
  }

}
