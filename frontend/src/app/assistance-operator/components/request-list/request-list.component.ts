import {Component, OnInit} from '@angular/core';
import {HelpRequest} from 'src/app/shared/model/HelpRequest';
import {HelpRequestInformationService} from '../../services/help-request-information.service';
import {StatusService} from '../../../shared/services/status.service';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmResetApplicationComponent} from '../confirm-reset-application/confirm-reset-application.component';
import {dialogConfig} from '../../../shared/model/DialogConfig';

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter', [
        style({height: 0}),
        animate('100ms', style({height: 140}))],
      {optional: true}
    ),
    query(':leave',
      [animate('100ms', style({height: 0}))],
      {optional: true}
    )
  ])
]);

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
  animations: [listAnimation]
})
export class RequestListComponent implements OnInit {

  helpRequests: HelpRequest[] = [];
  criteria = '';
  showSearchbar = false;
  filter = '';
  search = '';
  selected = {};


  constructor(
    private helpRequestService: HelpRequestInformationService,
    private statusService: StatusService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.helpRequestService.loadHelpRequestListFromBackend();
    this.helpRequestService.listenForChanges();
    this.helpRequestService.getHelpRequestsObservable().subscribe(helpRequests => this.helpRequests = helpRequests);
  }

  /**
   * Updates the status of a HelpRequest to 'IN_PROGRESS' if it's on 'OPEN' and clicked on.
   * @param id position of the request in teh HelpRequest array.
   */
  onRequestSelected(id: number) {
    if (this.helpRequestService.getRequest(id).status === 'OPEN') {
      this.statusService.updateStatus(id);
    }
  }

  setSearch(value: string) {
    this.search = value;
    this.setCriteria();
  }

  setFilter(value: string) {
    this.filter = value;
    this.setCriteria();
  }

  setCriteria() {
    this.criteria = this.filter + ':' + this.search;
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmResetApplicationComponent, dialogConfig);
    // subscribe to the dialog event
    dialogRef.componentInstance.resetApplicationEvent.subscribe(() => {
      this.helpRequestService.resetApplication();
    });
  }
}

