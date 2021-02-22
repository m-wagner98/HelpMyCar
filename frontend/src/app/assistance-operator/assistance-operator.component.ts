import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {HelpRequest} from '../shared/model/HelpRequest';
import {HelpRequestInformationService} from './services/help-request-information.service';
import {StatusService} from '../shared/services/status.service';
import {ChatService} from '../shared/services/chat.service';
import {Title} from '@angular/platform-browser';
import {FocusMonitor} from '@angular/cdk/a11y';
import {GlobalConstants} from '../shared/GlobalConstants';

@Component({
  selector: 'app-assistance-operator',
  templateUrl: './assistance-operator.component.html',
  styleUrls: ['./assistance-operator.component.scss']
})
export class AssistanceOperatorComponent implements OnInit {

  public requestOpen = false;
  public id: number;

  constructor(
    private router: Router,
    private helpRequestInformationService: HelpRequestInformationService,
    private statusService: StatusService,
    private chatService: ChatService,
    private titleService: Title,
    private monitor: FocusMonitor
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Dashboard');
    // init check
    this.checkIfRequestOpen();
    // check if url changed
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.checkIfRequestOpen();
      }
    });
    this.chatService.listenForChanges();
    this.statusService.listenForChanges();
    this.monitor.stopMonitoring(document.getElementById('detailed-view'));
  }

  checkIfRequestOpen(): void {
    if (window.location.href.localeCompare(GlobalConstants.frontendPath + '/assistance-operator') !== 0) {
      this.id = +window.location.href.split('/').pop();
      const helpRequest: HelpRequest = this.helpRequestInformationService.getRequest(this.id);
      if (helpRequest !== undefined) {
        this.requestOpen = true;
      } else {
        this.router.navigate(['../', 'assistance-operator']);
      }
    }
  }
}
