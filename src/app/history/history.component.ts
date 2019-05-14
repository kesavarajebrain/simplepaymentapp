import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../register.service';

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

  constructor(private _register : RegisterService) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser')).firstname;
    this.loggedUserId = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getSentMoney();
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
