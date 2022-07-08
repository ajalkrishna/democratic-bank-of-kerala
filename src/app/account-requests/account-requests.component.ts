import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-account-requests',
  templateUrl: './account-requests.component.html',
  styleUrls: ['./account-requests.component.scss']
})
export class AccountRequestsComponent implements OnInit {

  requestData: any
  constructor(private admin: AdminService, private route: Router) { }

  ngOnInit(): void {
    this.admin.getAccountRequests().subscribe(res => {
      this.requestData = res.payload['accountRequests']
    })
  }
  validate(account) {
    this.admin.accountForValidation.next(account)
    this.route.navigateByUrl('admin/validation')
  }

}
