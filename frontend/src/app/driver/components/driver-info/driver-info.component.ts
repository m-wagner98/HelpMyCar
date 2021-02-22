import {Driver} from 'src/app/shared/model/Driver';
import {Component, OnInit} from '@angular/core';
import {LoginService} from './../../services/login.service';


@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.scss']
})
export class DriverInfoComponent implements OnInit {
  public driver: Driver;


  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.driver = this.loginService.getDriverInfo();
  }

}
