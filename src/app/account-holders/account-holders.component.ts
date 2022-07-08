import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-account-holders',
  templateUrl: './account-holders.component.html',
  styleUrls: ['./account-holders.component.scss']
})
export class AccountHoldersComponent implements OnInit {

  accountHolders:any
  constructor(private admin:AdminService) { }

  ngOnInit(): void {
    this.admin.getAccountHolders().subscribe(res=>{
      this.accountHolders=res.payload
    })
  }

}
