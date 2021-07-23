import { Component, OnInit } from '@angular/core';
import {User} from "../models/User";

import {ToastrService} from "ngx-toastr";
import {ServiceService} from "../service/service.service";
import {Orders} from "../models/Orders";
import {elementAt} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    firstName:any;
    lastName:any;
    email:any;
    userName:any;
    address:any;
    password:any;
    rePassword:any;
    nicNumber:any;
    telephone:any;
    approve: boolean | undefined;
    constructor(private toastr: ToastrService,private service:ServiceService,private router: Router) { }

    ngOnInit(): void {
    }
    RegisterUser(){
        const checkInputFieldEmpty = this.checkInputFieldEmpty(this.firstName, this.lastName, this.email, this.userName, this.address, this.password,this.rePassword, this.nicNumber,this.telephone);

        if (checkInputFieldEmpty) {
            return;
        }


        const registerUserDetails = new User();
        registerUserDetails.firstName= this.firstName;
        registerUserDetails.lastName= this.lastName;
        registerUserDetails.email= this.email;
        registerUserDetails.address= this.address;
        registerUserDetails.password= this.password;
        registerUserDetails.userName= this.userName;
        registerUserDetails.nic= this.nicNumber;
        registerUserDetails.telephone= this.telephone;
        console.log("registerUserDetails",registerUserDetails);

        // this.shopService.registerUser(registerUserDetails);

        if(!this.approve){
            this.toastr.error('Please Approve the terms and conditions');
            return;
        }
        this.service.registerUser(registerUserDetails).subscribe(res => {
            console.log('res==>',res);
            localStorage.setItem('userId',res.user);
            localStorage.setItem('logged',res.logged);
            localStorage.setItem('isAdmin',res.isAdmin);
            if(localStorage.getItem('Orders') != null ){
                // this.service.OrderPurchase(localStorage.getItem('Orders')).subscribe(res => {
                //   console.log('res==>',res);
                // });
            }
            this.router.navigate(['/dash']);
        });

    }

    // @ts-ignore
    checkInputFieldEmpty(firstName: string, lastName: string, email: string, userName: string, address: string, password: string,rePassword: string,nicNumber: string, telephone: number) {
        const pattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        const nicPattern = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/m;
        const CharPattern = /^[A-Z]{1,10}$/;
        const capitalChar = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        console.log('address', address);
        if (firstName === undefined) {
            this.toastr.error('Please fill the first name');
            return true;
        }
        if (lastName === undefined) {
            this.toastr.error('Please fill the last name');
            return true;
        }
        if (email === undefined) {
            this.toastr.error('Please fill the Email');
            return true;
        }
        if (!email.match(pattern)) {
            this.toastr.error('Please enter a valid email address');
            return true;
        }
        if (userName === undefined) {
            this.toastr.error('Please fill the username');
            return true;
        }
        if (userName.length < 6) {
            this.toastr.error('Please Enter At Least 6 Characters');
            return true;
        }
        if (address === '' || address === undefined) {
            this.toastr.error('Please fill the address');
            return true;
        }
        if (password === '' || password === undefined) {
            this.toastr.error('Cannot continue without password');
            return true;
        }
        if (password.length < 8 && !password.match(CharPattern) &&  !password.match(capitalChar)) {
            this.toastr.error('Please Enter Secure Password');
            return true;
        }
        if (rePassword === undefined) {
            this.toastr.error('Cannot continue without confirm password');
            return true;
        }
        if (rePassword !== password) {
            this.toastr.error('Passwords do not match');
            return true;
        }
        if (nicNumber === undefined) {
            this.toastr.error('Cannot continue without NIC Number');
            return true;
        }
        if (!nicNumber.match(nicPattern)) {
            this.toastr.error('Please enter a valid NIC Number');
            return true;
        }

        if (telephone === undefined) {
            this.toastr.error('Cannot continue without Telephone Number');
            return true;
        }
        if (telephone.toString().charAt(0) != '0' || telephone.toString().length <10) {
            this.toastr.error('Cannot continue with This Phone Number');
            return true;
        }
    }
    toogleTag(e:any){
        if (e.target.checked) {
            this.approve = true
        }else {
            this.approve = false
        }

    }
}
