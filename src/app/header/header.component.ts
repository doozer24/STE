import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(){
    return localStorage.getItem('timeAndAdminUser');
  }

}
