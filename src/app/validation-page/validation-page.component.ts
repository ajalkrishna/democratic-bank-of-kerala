import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-validation-page',
  templateUrl: './validation-page.component.html',
  styleUrls: ['./validation-page.component.scss']
})
export class ValidationPageComponent implements OnInit {
  userRegisteredData:any

  constructor(private admin:AdminService) { }

  ngOnInit(): void {
    this.userRegisteredData= this.admin.accountForValidation.getValue()
  }

}
