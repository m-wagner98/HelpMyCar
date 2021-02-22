import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-reset-application',
  templateUrl: './confirm-reset-application.component.html',
  styleUrls: ['./confirm-reset-application.component.scss']
})
export class ConfirmResetApplicationComponent implements OnInit {

  @Output() resetApplicationEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private dialogRef: MatDialogRef<ConfirmResetApplicationComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  resetApplication() {
    this.resetApplicationEvent.emit();
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

}
