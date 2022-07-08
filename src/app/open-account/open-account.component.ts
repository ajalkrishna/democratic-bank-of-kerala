import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin/admin.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-open-account',
  templateUrl: './open-account.component.html',
  styleUrls: ['./open-account.component.scss']
})
export class OpenAccountComponent implements OnInit {

  newAccount:any
  genderTypes:string[]=['Female','Male','Others']
  optedGender:string
  accountHolder:any
  aadharFile:File
  userPic:File
  constructor( private admin: AdminService, private common: CommonService,private fb:FormBuilder,private route:Router) { }

  ngOnInit(): void {
    this.newAccount=this.fb.group({
      firstname:['',Validators.required],
      lastname:[''],
      aadharNo:['',Validators.required],
      email:['',Validators.required],
      balance:['',Validators.required],
      address:this.fb.group({
        houseName:['',Validators.required],
        street:['',Validators.required],
        pincode:['',Validators.required]
      })
    })
  }
  getAddress(){
    return this.newAccount.get('address')
  }
  aadharProof(aadhar){
    this.aadharFile=aadhar.files[0]
  }
  photoSelected(userPic){
    this.userPic=userPic.files[0]
  }

  submitForm(){
    this.accountHolder = this.newAccount.value
    this.accountHolder.gender = this.optedGender
    // let formData = new FormData()
    // formData.append('data',JSON.stringify(this.accountHolder))
    // formData.append('aadharPic',this.aadharFile)
    // formData.append('userPic',this.userPic)
    this.admin.userFormData.next(this.accountHolder)

    // this.admin.accountDetails.next(this.accountHolder)
    this.route.navigateByUrl('admin/confirmation-page')
  }
  genderOpted(event){
    this.optedGender = event.target.value
  }

}

