import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() criteriaEvent = new EventEmitter<string>();
  showRing = new Array(4).fill(true);
  statusArray = ['OPEN', 'IN_PROGRESS', 'SERVICE_VEHICLE_ON_THE_WAY', 'CLOSED'];

  constructor() {
  }

  ngOnInit(): void {
  }

  onRingClicked(id: number) {
    this.showRing[id] = !this.showRing[id];
    let criteria = '';
    // build the criteria string
    this.statusArray.forEach((element, i) => {
      if (this.showRing[i]) {
        criteria += element + ';';
      }
    });
    // emit change with the last ';' sliced off
    this.criteriaEvent.emit(criteria.slice(0, -1));
  }
}
