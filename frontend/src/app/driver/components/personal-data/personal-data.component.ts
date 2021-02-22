import {Component, OnInit} from '@angular/core';
import {Driver} from 'src/app/shared/model/Driver';
import {LoginService} from '../../services/login.service';


@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

  public driver: Driver;


  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.driver = this.loginService.getDriverInfo();
  }
}
