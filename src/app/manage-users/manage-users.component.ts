import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  allUsers: {};
  user: User;
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    const that = this;
    this.user = JSON.parse(localStorage.getItem('timeAndAdminUser'));
    this.allUsers = this.userService.getAllUsers();
    /*
    this.timeCardService.getActiveTimeCardsForUser(this.user.loginId).then(function(timeCards) {
      that.userTimeCards = timeCards.data;
      that.setDateRanges();
    });
     */
  }

  async onSubmit(): Promise<any> {
    const that = this;
    /*
    if (!this.selectedDateRange) { return null; }
    this.timeCardService.createTimeCard(this.selectedDateRange.startDate,
      this.selectedDateRange.endDate, this.user.loginId).then(function(timeCard) {
      that.router.navigate(['time-card/' + timeCard.data.id]).catch();
    });
    */
  }

}
