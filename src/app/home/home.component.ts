import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  timeCards = [
    {dateRange: '4/23-4/28', hours: 12, status: 'Not Submitted', id: 1}
  ];
  constructor() { }

  ngOnInit() {
  }

}
