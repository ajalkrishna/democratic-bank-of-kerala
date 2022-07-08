import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route: Router, private common: CommonService, private user: UserService) { }

  ngOnInit(): void {
  }

  loginForm = {
    username: "",
    password: ""
  }
  accountNo:number
  statusAccountNo:number
  requestStatus:string
  login() {
    this.common.validateUser(this.loginForm).subscribe({
      next: (res) => {
        if (res.message == 'login Success') {
          if (res.accountNo == 101010) {
            localStorage.setItem('token', res.token)
            this.route.navigateByUrl('admin')
          }
          else {
            // save token to the local storage
            localStorage.setItem('token', res.token)
            // update behaviour sub with user data
            let accountObj = {
              accountNo: res.accountNo
            }
            this.user.getAccountDetails(accountObj).subscribe({
              next: (res) => {
                this.user.accountHolder.next(res.payload)
                // navigate to user module
                this.route.navigateByUrl('user')
              }
            })

          }
        }
        else {
          alert(res.message)
        }
      },
      error: (err) => alert('something went wrong')
    })
  }

  validateAccountNo() {
    let accountObj = {
      accountNo: this.accountNo
    }
    this.user.getAccountDetails(accountObj).subscribe({
      next:(res)=>{
        if(res.message=='valid Account Number'){
          this.common.checkExistance(accountObj).subscribe({
            next:(res)=>{
              if(res.message=='valid Request'){
                // navigate to request form
                this.common.accountNo=this.accountNo
                this.route.navigateByUrl('request')
              }
              else{
                alert(res.message)
              }
            },
            error:(err)=>alert('something went wrong')
          })
        }
        else{
          alert(res.message)
        }
      },
      error:(err)=>alert('something went wrong')
    })
  }
  checkStatus(){
    this.common.getAllRequests().subscribe({
      next:(res)=>{
        let admin = res.payload[0].accountRequests
        let request = admin.find(request=>request.accountNo == this.statusAccountNo)
        if(request==undefined){
          this.requestStatus='No Request Found'
          
        }
        else{
          this.requestStatus=request.status
          
        }
        setTimeout(() => {
          this.requestStatus = undefined
        }, 3000);
      }
    })
  }
  

}
