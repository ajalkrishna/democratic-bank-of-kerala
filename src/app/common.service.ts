import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  accountNo:number
  constructor(private hc: HttpClient) { }

  // validate Login Creds
  validateUser(loginObj): Observable<any> {
    return this.hc.post('http://localhost:5000/user/login', loginObj)
  }
  // existance of accountNo
  checkExistance(accountObj): Observable<any> {
    return this.hc.post('http://localhost:5000/user/get-user', accountObj)
  }
  // submit request
  submitRequest(requestObj): Observable<any> {
    return this.hc.post('http://localhost:5000/user/create-request', requestObj)
  }
  // getall requests
  getAllRequests():Observable<any>{
    return this.hc.get('http://localhost:5000/admin/all-requests')
  }

}
