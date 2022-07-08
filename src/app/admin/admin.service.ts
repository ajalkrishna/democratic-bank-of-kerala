import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  accountDetails=new BehaviorSubject(null)
  userFormData = new BehaviorSubject(null)
  accountForValidation = new BehaviorSubject(null)
  constructor(private hc:HttpClient) { }

  // open account
  openAccount(formData):Observable<any>{
    return this.hc.post('http://localhost:5000/admin/open-account',formData)
  }
  // get netbanking-users
  getAllUsers():Observable<any>{
    return this.hc.get('http://localhost:5000/admin/all-users')
  }
  // get all requests
  getAccountRequests():Observable<any>{
    return this.hc.get('http://localhost:5000/admin/all-requests')
  }
  // getaccountholders
  getAccountHolders():Observable<any>{
    return this.hc.get('http://localhost:5000/admin/account-holders')
  }
}
