import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlMessageService {

  constructor() {
  }

  getCheckControlIcon(value: number): string {
    const controlSign = 'assets/check_control_message_icons';
    switch (value) {
      case 400:
        return controlSign + '/batteryOn.svg';
      case 123:
      case 200:
      case 600:
        return controlSign + '/brakePadOn.svg';
      case 42:
        return controlSign + '/airbagOn.svg';
      case 50:
      case 10:
        return controlSign + '/refuelOn.svg';
      case 500:
        return controlSign + '/motorOn.svg';
      case 250:
        return controlSign + '/overheatingOn.svg';
    }
  }

  getControlTitle(value: number): string {
    switch (value) {
      case 400:
        return 'Battery warning';
      case 123:
      case 200:
      case 600:
        return 'Brake pad warning';
      case 42:
        return 'Airbag warning';
      case 50:
      case 10:
        return 'Fuel level warning';
      case 500:
        return 'Engine Warning';
      case 250:
        return 'Coolant Temperature Warning';
    }
  }
}
