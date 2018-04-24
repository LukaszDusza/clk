import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainboardComponent } from '../mainboard/mainboard.component';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goLogin(){
    this.router.navigate([LoginComponent]);
  }

}
