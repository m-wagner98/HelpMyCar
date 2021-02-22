import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() criteriaEvent = new EventEmitter<string>();
  formClass = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  change(value: string) {
    this.criteriaEvent.emit(value);
  }
}
