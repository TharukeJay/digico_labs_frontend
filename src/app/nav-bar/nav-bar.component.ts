import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  logged: boolean | undefined;
  constructor() { }

  ngOnInit(): void {
    this.logged = false;
    if (sessionStorage.getItem('logged') !== null && sessionStorage.getItem('logged')) {
      this.logged = true;
    }
  }


}
