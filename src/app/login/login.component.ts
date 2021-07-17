import { Component, OnInit } from '@angular/core';
import {User} from "../models/User";
import {login} from "../models/login";
import {ToastrService} from "ngx-toastr";
import {ServiceService} from "../service/service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  password:any
  userName:any;
  constructor(private toastr: ToastrService,private service:ServiceService,private router: Router) { }

  ngOnInit(): void {
  }
  Login(){
    const checkInputFieldEmpty = this.checkInputFieldEmpty(this.userName, this.password);

    if (checkInputFieldEmpty) {
      return;
    }


    const loginRequest = new login();

    loginRequest.password= this.password;
    loginRequest.userName= this.userName;

    console.log("loginRequest",loginRequest);

    this.service.LoginUser(loginRequest).subscribe(res => {
      console.log('res==>',res);
      // localStorage.setItem('userId',res.user);
      // localStorage.setItem('logged',res.logged);
      // localStorage.setItem('isAdmin',res.isAdmin);
      this.router.navigate(['/dash']);
    });

  }
  // @ts-ignore
  checkInputFieldEmpty(userName: string,password: string) {


    if (userName === undefined) {
      this.toastr.error('Please fill the username');
      return true;
    }

    if (password === undefined) {
      this.toastr.error('Cannot continue without password');
      return true;
    }
  }
}
