import { Component, OnInit } from '@angular/core';
import {FormsModule}  from '@angular/forms';
import {RegisterService} from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: any = {};
  successMsg:any;

  constructor(private _register : RegisterService ,  private router: Router) { }

  ngOnInit() {
  }

  register(){
    console.log(this.user)
    this._register.registeruser(this.user).subscribe(
      res => {
        console.log(res);
        this.successMsg = 'Register successfully! Please Login';
        setTimeout(() => {
          this.successMsg = '';
          this.router.navigate(['/login']);
        }, 3000);
      },
      err => {
        console.log(err);
      }
    );
  }
}
