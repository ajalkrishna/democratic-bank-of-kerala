import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../admin/admin.service';
import { CommonService } from '../common.service';


@Component({
  selector: 'app-user-request-form',
  templateUrl: './user-request-form.component.html',
  styleUrls: ['./user-request-form.component.scss']
})
export class UserRequestFormComponent implements OnInit {

  requestForm: any
  constructor(private fc: FormBuilder, private admin: AdminService,private common:CommonService) { }

  accountNo:number
  ngOnInit(): void {
    this.requestForm = this.fc.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      aadharNo: ['', Validators.required],
    })
    this.accountNo = this.common.accountNo
  }
  confirmRequest() {
    let request = this.requestForm.value
    this.admin.getAllUsers().subscribe({
      next: (res) => {
        let user = res.payload.find(user => user.username == request.username)
        if (user == undefined) {
          request.accountNo = this.accountNo
          request.status = 'Application Submitted'
          console.log(request)
          this.common.submitRequest(request).subscribe({
            next:(res)=>{
              alert(res.message)
            }
          })
          
        }
        else {
          alert('username is not available')
        }
      }
    })
  }

}


// <!-- "accountNo": 123456,
//     "username":"sunny",
//     "password":"sunny",
//     "email":"sunny@mail.com",
//     "aadharNo":147852369,
//     // "status": "Application Submitted" -->