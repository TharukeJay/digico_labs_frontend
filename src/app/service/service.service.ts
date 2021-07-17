import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from '../models/User';
import {login} from "../models/login";
import { Orders } from '../models/Orders';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  resourceBaseUrl = 'http://localhost:8080'

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  registerUser(registerUserDetails: User) {
    return this.httpClient.post(this.resourceBaseUrl + '/api/register', registerUserDetails
    )
  }

  LoginUser(loginRequest: login) {

    return this.httpClient.post(this.resourceBaseUrl + '/api/login', loginRequest
    )
  }

  OrderPurchase(orders: Orders){
    return this.httpClient.post(this.resourceBaseUrl + '/api/'+localStorage.getItem('userId')+'/saveOrder', orders
    )
  }

  OrderView(){
    return this.httpClient.get(this.resourceBaseUrl + '/api/'+localStorage.getItem('userId')+'/getAllOrders'
    )
  }

}
