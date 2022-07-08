import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userData:any
  constructor(private user:UserService) { }

  ngOnInit(): void {
    this.userData=this.user.accountHolder.getValue()
  }

}
