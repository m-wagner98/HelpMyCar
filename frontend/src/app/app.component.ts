import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  showNavigation: boolean;

  constructor(
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('HelpMyCar');
  }

}
