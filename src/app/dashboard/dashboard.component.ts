import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule}  from '@angular/forms';
import {RegisterService} from '../register.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loggedUser :any;
  loggedUserId : any;
  exactUsers = [];
  totalUsers = [];
  successMsg :any;
  sendername:any;
  senderId:any;
  status:any;
  public money: any = {};
  allsentAmounts = [];
  mypayments = [];
  wholeAmount = [];

  constructor(private router: Router , private _register : RegisterService ) {
    this.money.sendto = '';
   }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser')).firstname;
    this.loggedUserId = JSON.parse(localStorage.getItem('currentUser'))._id;
    console.log(this.loggedUserId)
    this.getSentMoney();
  }

  logOut(){
    localStorage.removeItem('payload');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  allUsers(){
    this._register.getAllUsers().subscribe(
      res => {
        console.log(res);
        this.totalUsers = res;
        let j = 0;
        for(let i = 0; i <  this.totalUsers.length;i++){
          if(this.loggedUserId != this.totalUsers[i]._id){
            this.exactUsers[j] = this.totalUsers[i];
            j++;
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  sendAmount(){
    this.money.sendername = this.loggedUser; 
    this.money.senderId = this.loggedUserId; 
    this.money.status = "Amount Debited"
    console.log(this.money);
    this._register.sendmoney(this.money).subscribe(
      res => {
        console.log(res);
        this.successMsg = 'Amount sent successfully!';
        setTimeout(() => {
          this.successMsg = '';
        }, 3000);
      },
      err => {
        console.log(err);
      }
    );
  }

  getSentMoney(){
    this._register.getSentAmounts().subscribe(
      res => {
        console.log(res);
        this.allsentAmounts = res;
        let j = 0;
        for(let i = 0; i < this.allsentAmounts.length; i++){
          if( this.loggedUserId == this.allsentAmounts[i].senderId){
            this.mypayments[j] = this.allsentAmounts[i];
            this.wholeAmount.push = this.mypayments[j].amount;  
            j++; 
            console.log(this.wholeAmount)
            console.log(this.mypayments);
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
