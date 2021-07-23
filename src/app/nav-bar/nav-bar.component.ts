import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  logged: boolean | undefined;
  constructor(private router: Router) { }

  ngOnInit(): void {

    this.logged = !!localStorage.getItem('logged');
    console.log('loging',this.logged);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);

  }

}
