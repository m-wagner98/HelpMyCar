import {Component, Input, OnInit} from '@angular/core';
import {Value} from 'src/app/shared/model/ApiResponse';
import {ControlMessageService} from '../../services/controlMessage.service';

@Component({
  selector: 'app-check-control-message',
  templateUrl: './check-control-message.component.html',
  styleUrls: ['./check-control-message.component.scss']
})
export class CheckControlMessageComponent implements OnInit {
  public value: number;
  public icon: string;
  public title: string;
  public message: string;

  constructor(private controlMessageService: ControlMessageService) {
  }

  @Input('checkControlMessage') set _name(checkControlMessage: Value) {
    this.value = checkControlMessage.value;
    this.message = checkControlMessage.message;
    this.getControlSign();
  }

  ngOnInit(): void {
  }

  getControlSign() {
    this.title = this.controlMessageService.getControlTitle(this.value);
    this.icon = this.controlMessageService.getCheckControlIcon(this.value);
  }

}
