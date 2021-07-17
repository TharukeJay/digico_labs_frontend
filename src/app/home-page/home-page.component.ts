import {Component, OnInit} from '@angular/core';
import {Orders, packageNested} from "../models/Orders";
import {Router} from "@angular/router";
import {ServiceService} from "../service/service.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  e: any;
  qtyP1: any;
  qtyP2: any;
  qtyP3: any;
  subTotalP1: any;
  subTotalP2: any;
  subTotalP3: any;
  Total: any = 0;
  // PackageDetails:any=[];
  PackageDetails: Array<packageNested> = [];

  constructor(private router: Router,private service:ServiceService) {
  }

  ngOnInit(): void {
  }

  getAlbumId() {

  }

  calculateP1() {
    this.subTotalP1 = this.qtyP1 * 250
  }

  calculateP2() {
    this.subTotalP2 = this.qtyP2 * 350
  }

  calculateP3() {
    this.subTotalP3 = this.qtyP3 * 500
  }

  pakage1(e: any) {
    if (e.target.checked) {
      this.Total += this.subTotalP1
      const item = new packageNested();
      item.packageType = '1'
      item.qty = this.qtyP1
      item.subTotal = this.subTotalP1
      this.PackageDetails.push(item)
    } else {
      this.Total += this.subTotalP1
    }

  }

  pakage2(e: any) {
    if (e.target.checked) {
      this.Total += this.subTotalP2
      const item = new packageNested();
      item.packageType = '2'
      item.qty = this.qtyP2
      item.subTotal = this.subTotalP2
      this.PackageDetails.push(item)
    } else {
      this.Total += this.subTotalP2
    }

  }

  pakage3(e: any) {
    if (e.target.checked) {
      this.Total += this.subTotalP3
      const item = new packageNested();
      item.packageType = '3'
      item.qty = this.qtyP3
      item.subTotal = this.subTotalP3
      this.PackageDetails.push(item)
    } else {
      this.Total += this.subTotalP3
    }

  }

  // @ts-ignore
  placeOrder() {
    console.log('list====>', this.PackageDetails);
    const orders = new Orders();
    orders.packageData = this.PackageDetails;
    orders.total = this.Total;

    if (localStorage.getItem('logged')){
      this.service.OrderPurchase(orders).subscribe(res => {
        console.log('res==>',res);
      });
      this.router.navigate(['/dash']);
    } else {
      localStorage.setItem('Orders', JSON.stringify(orders));
      this.router.navigate(['/register']);
      return null;
    }
  }

}
