import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss']
})
export class ConfirmationPageComponent implements OnInit {
  user:any
  accountNo:number
  pin:number
  constructor(private admin:AdminService,private route:Router) { }

  ngOnInit(): void {
    this.user = this.admin.userFormData.getValue()
    // this.user = JSON.parse(this.formData.get('data'))
  }

  confirm(){
    this.user.accountNo = this.accountNo
    this.user.pin = this.pin
    // this.formData.delete('data')
    // this.formData.set('data',JSON.stringify(this.user))
    this.admin.openAccount(this.user).subscribe({
      next:(res)=>{
        alert(res.message)
        if(res.result=='success'){
          this.route.navigateByUrl('admin/open-account')
        }
      },
      error:(err)=>alert('something went wrong')
    })
  }
}
