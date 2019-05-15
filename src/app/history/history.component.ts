import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../register.service';
import {FormsModule}  from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  loggedUser:any;
  loggedUserId:any;
  allsentAmounts = [];
  mypayments = [];
  errorMsg :any;
  myreceivedpayments = [];
  totalTrans =[];
  errorMsg1 :any;
  sendername :any;
  receivername :any;

  constructor(private _register : RegisterService) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser')).firstname;
    this.loggedUserId = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getSentMoney();
  }

  getSentMoney(){
      this.mypayments =[];
    this._register.getSentAmounts().subscribe(
      res => {
        console.log(res);
        this.allsentAmounts = res;
        this.errorMsg1 ='';
        this.errorMsg ='';
        let j = 0;
        for(let i = 0; i < this.allsentAmounts.length; i++){
          if( this.loggedUserId == this.allsentAmounts[i].senderId){
            this.mypayments[j] = this.allsentAmounts[i];
            this.receivername = this.mypayments[j].receivername;
            j++;
            console.log(this.mypayments);
          }
        }
        if(this.mypayments.length == 0){
          this.errorMsg = "No transactions available";
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  changeColor(){
  document.getElementById('paraTag').style.background = '#ff000052';
  document.getElementById('paraTag1').style.background = 'white';
}
changeColor1(){
  document.getElementById('paraTag1').style.background = '#ff000052';
  document.getElementById('paraTag').style.background = 'white';
}

  receivedMoney(){
    this.mypayments =[];
    this._register.getSentAmounts().subscribe(
      res => {
        console.log(res);
        this.allsentAmounts = res;
        this.errorMsg1 ='';
        this.errorMsg ='';
        let j = 0;
        for(let i = 0; i < this.allsentAmounts.length; i++){
          if( this.loggedUserId == this.allsentAmounts[i].sendto){
              console.log(this.allsentAmounts[i].sendto)
              console.log(this.loggedUserId == this.allsentAmounts[i].sendto)
            this.mypayments[j] = this.allsentAmounts[i];
          this.sendername = this.mypayments[j].sendername;
          console.log(this.sendername )
            j++;
            console.log(this.mypayments);
          }
        }
        if(this.mypayments.length == 0){
          this.errorMsg1 = "No credits transactions available";
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
