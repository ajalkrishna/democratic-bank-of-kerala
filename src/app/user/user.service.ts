import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private hc:HttpClient) { }
  // user bahaviour sub
  accountHolder = new BehaviorSubject(null)

  // get user data using account No
  getAccountDetails(accountObj):Observable<any>{
    return this.hc.post('http://localhost:5000/user/get-account',accountObj)
  }
}
