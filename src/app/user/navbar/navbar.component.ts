import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private route:Router,private user:UserService) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('token')
    this.user.accountHolder.next(null)
    this.route.navigateByUrl('login')
  }

}
