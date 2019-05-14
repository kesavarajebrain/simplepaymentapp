import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private _registerUrl = 'http://localhost:5000/api/register';
  private _loginUrl = 'http://localhost:5000/api/login';
  private _getUsersUrl = 'http://localhost:5000/api/getallusers';
  private _sendAmountUrl = 'http://localhost:5000/api/sendamount';
  private _getSentPaymentsUrl = 'http://localhost:5000/api/getsentpayments'

  constructor(private http: HttpClient) { }

  registeruser(data){
    return this.http.post<any>(this._registerUrl , data);
  }

  loginuser(data){
    return this.http.post<any>(this._loginUrl , data);
  }

  getAllUsers(){
    return this.http.get<any>(this._getUsersUrl);
  }

  sendmoney(data){
    return this.http.post<any>(this._sendAmountUrl , data);
  }

  getSentAmounts(){
    return this.http.get<any>(this._getSentPaymentsUrl);
  }
}
