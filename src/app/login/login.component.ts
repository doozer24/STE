import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = {
    username: '',
    password: ''
  };
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  async onSubmit() {
    const response = await this.userService.login(this.login.username, this.login.password);
    if (response.error) {
      this.errorMessage = 'There was an error logging in.';
    } else {
      this.router.navigate(['/']);
    }
  }

}
