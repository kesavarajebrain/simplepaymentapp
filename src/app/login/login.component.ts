import { Component, OnInit } from '@angular/core';
import {FormsModule}  from '@angular/forms';
import {RegisterService} from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {};
  errormsg : any;

  constructor(private _register : RegisterService , private router: Router) { }

  ngOnInit() {
  }

  login(){
    console.log(this.user);
    this._register.loginuser(this.user).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        localStorage.setItem('payload', JSON.stringify(res.payload));
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      err => {
        console.log(err);
        if (err.statusText == 'Unauthorized') {
          this.errormsg = 'Please enter registered phone number!';
        }
      }
    );
  }

}
