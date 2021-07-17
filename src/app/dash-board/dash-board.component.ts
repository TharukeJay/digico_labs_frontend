import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../service/service.service";

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  orderDetails:any;
  constructor(private service:ServiceService) { }

  ngOnInit(): void {
    this.service.OrderView().subscribe((res) => {

      console.log('new oneeeeee',res)
    })

  }

}
