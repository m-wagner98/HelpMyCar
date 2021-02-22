import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AssistanceOperatorComponent} from './assistance-operator/assistance-operator.component';

import {DriverComponent} from './driver/driver.component';
import {LoginComponent} from './driver/components/login/login.component';
import {StartPageComponent} from './driver/components/start-page/start-page.component';
import {DriverStatusComponent} from './driver/components/driver-status/driver-status.component';

import {MenueComponent} from './driver/components/menu/menue.component';
import {PersonalDataComponent} from './driver/components/personal-data/personal-data.component';
import {PrivacyServiceComponent} from './driver/components/privacy-service/privacy-service.component';
import {CarAnalysisComponent} from './driver/components/car-analysis/car-analysis.component';
import {HelpComponent} from './driver/components/help/help.component';
import {DriverChatComponent} from './driver/components/driver-chat/driver-chat.component';
import {NavigationComponent} from './shared/components/navigation/navigation.component';

const routes: Routes = [
  {
    path: 'assistance-operator', component: AssistanceOperatorComponent, children: [
      {path: 'request/:id', component: AssistanceOperatorComponent},
    ]
  },
  {
    path: 'driver', component: DriverComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'start-page', component: StartPageComponent},
      {path: 'status', component: DriverStatusComponent},

      {path: 'menue', component: MenueComponent},
      {path: 'personal-data', component: PersonalDataComponent},
      {path: 'privacy-service', component: PrivacyServiceComponent},
      {path: 'help', component: HelpComponent},

      {path: 'car-analysis', component: CarAnalysisComponent},
      {path: 'chat', component: DriverChatComponent},
      {path: '**', component: LoginComponent}
    ]
  },
  {path: '', component: NavigationComponent},
  {path: '**', component: NavigationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
