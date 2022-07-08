import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  cardIteration:any[]=[
    {
      heading:'Total Depositors',
      count:30000
    },
    {
      heading:'fund Available',
      count:5000000
    },
    {
      heading:'Net Banking Accounts',
      count:100
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
