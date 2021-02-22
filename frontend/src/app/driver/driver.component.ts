import {Component, OnInit} from '@angular/core';
import {LoginService} from './services/login.service';
import {NavigationEnd, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Location} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {GlobalConstants} from '../shared/GlobalConstants';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  backButton = false;
  loginPage = true;

  constructor(
    private loginService: LoginService,
    private router: Router,
    public dialog: MatDialog,
    private location: Location,
    private titleService: Title
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Driver App');
    if (this.loginService.getDriverInfo() === undefined
      && window.location.href.localeCompare(GlobalConstants.frontendPath + '/driver/login') !== 0
    ) {
      this.router.navigate(['driver', 'login']);
    }
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.checkIfLogin();
        this.checkIfBackButton();
      }
    });
  }

  goBack() {
    this.location.back();
  }

  checkIfBackButton() {
    switch (window.location.href.split('/').pop()) {
      case 'personal-data' :
      case 'car-analysis' :
      case 'privacy-service' :
      case 'help' :
      case 'chat' :
        this.backButton = true;
        break;

      default :
        this.backButton = false;
        break;
    }
  }

  checkIfLogin() {
    switch (window.location.href.split('/').pop()) {
      case 'login' :
        this.loginPage = true;
        break;

      default :
        this.loginPage = false;
        break;
    }
  }

}


