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
  totalAmount :any = 0;
  public money: any = {};
  allsentAmounts = [];
  mypayments = [];
  wholeAmount = [];
  sendAmtLength :any;

  constructor(private router: Router , private _register : RegisterService ) {
    this.money.sendto = '';
   }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser')).firstname;
    this.loggedUserId = JSON.parse(localStorage.getItem('currentUser'))._id;
    console.log(this.loggedUserId)
    this.allUsers();
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
    for (let i = 0; i < this.totalUsers.length; i++) {
          if (this.money.sendto == this.totalUsers[i]._id) {
            this.money.receivername = this.totalUsers[i].firstname;
          }
        }
    this.money.sendername = this.loggedUser;
    this.money.senderId = this.loggedUserId;
    this.money.date = new Date();
    this.money.status = "Amount Debited"
    console.log(this.money);
    this._register.sendmoney(this.money).subscribe(
      res => {
        console.log(res);
        this.successMsg = 'Amount sent successfully!';
        setTimeout(() => {
          this.successMsg = '';
          document.getElementById("closemodal").click();
          this.router.navigateByUrl('/dummy', { skipLocationChange: true });
          setTimeout(() => this.router.navigate(['/history']),100);
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
            j++;
            console.log(this.mypayments.length);
          }
          this.sendAmtLength = this.mypayments.length;
        }
        for(let i = 0; i < this.mypayments.length; i++) {
          this.totalAmount = this.totalAmount + parseInt(this.mypayments[i].amount);
        }
          console.log(this.totalAmount);
      },
      err => {
        console.log(err);
      }
    );
  }
}
