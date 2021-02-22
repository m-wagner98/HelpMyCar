import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule} from '@agm/core';
// Material design imports
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// Assistance Operator Components
import {AssistanceOperatorComponent} from './assistance-operator/assistance-operator.component';
import {RequestListComponent} from './assistance-operator/components/request-list/request-list.component';
import {RequestComponent, StatusColor} from './assistance-operator/components/request/request.component';
import {FilterComponent} from './assistance-operator/components/filter/filter.component';
import {SearchComponent} from './assistance-operator/components/search/search.component';
import {DriverInformationComponent} from './assistance-operator/components/driver-information/driver-information.component';
import {StatusComponent} from './assistance-operator/components/status/status.component';
import {CarVisualizationComponent} from './assistance-operator/components/car-visualization/car-visualization.component';
import {DiagnosticTroubleCodeComponent} from './assistance-operator/components/diagnostic-trouble-code/diagnostic-trouble-code.component';
import {MapComponent} from './assistance-operator/components/map/map.component';
import {ServiceVehicleListComponent} from './assistance-operator/components/service-vehicle-list/service-vehicle-list.component';
import {ServiceVehicleComponent} from './assistance-operator/components/service-vehicle/service-vehicle.component';
// Driver Components
import {StartPageComponent} from './driver/components/start-page/start-page.component';
import {DriverComponent} from './driver/driver.component';
import {LoginComponent} from './driver/components/login/login.component';
import {ConfirmRequestComponent} from './driver/components/confirm-request/confirm-request.component';
import {ConfirmServiceVehicleComponent} from './assistance-operator/components/confirm-service-vehicle/confirm-service-vehicle.component';
import {DriverStatusComponent} from './driver/components/driver-status/driver-status.component';


import {MenueComponent} from './driver/components/menu/menue.component';
import {PersonalDataComponent} from './driver/components/personal-data/personal-data.component';
import {DriverInfoComponent} from './driver/components/driver-info/driver-info.component';
import {MyCarComponent} from './driver/components/my-car/my-car.component';
import {CarAnalysisComponent} from './driver/components/car-analysis/car-analysis.component';
import {PrivacyServiceComponent} from './driver/components/privacy-service/privacy-service.component';
import {HelpComponent} from './driver/components/help/help.component';
import {DriverChatComponent} from './driver/components/driver-chat/driver-chat.component';
import {PersonalMenuComponent} from './driver/components/personal-menu/personal-menu.component';
import {ChatComponent} from './assistance-operator/components/chat/chat.component';
import {FilterPipe} from './assistance-operator/components/filter/filter.pipe';
import {CheckControlMessageListComponent} from './driver/components/check-control-message-list/check-control-message-list.component';
import {CheckControlMessageComponent} from './driver/components/check-control-message/check-control-message.component';
import {FilterServiceVehiclesPipe} from './assistance-operator/components/service-vehicle-list/filter-service-vehicles.pipe';
import {DiagnosticTroubleCodeListComponent} from './assistance-operator/components/diagnostic-trouble-code-list/diagnostic-trouble-code-list.component';
import {ReverseGeocodePipe} from './driver/components/start-page/reverse-geocode.pipe';
import {CheckControlMessageListAodComponent} from './assistance-operator/components/check-control-message-list-aod/check-control-message-list-aod.component';
import {ConfirmResetApplicationComponent} from './assistance-operator/components/confirm-reset-application/confirm-reset-application.component';
import {DriverCarVisualizationComponent} from './driver/components/driver-car-visualization/driver-car-visualization.component';
import {NavigationComponent} from './shared/components/navigation/navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StartPageComponent,
    DriverComponent,
    AssistanceOperatorComponent,
    ConfirmRequestComponent,
    DriverStatusComponent,
    RequestListComponent,
    RequestComponent,
    MenueComponent,
    PersonalDataComponent,
    DriverInfoComponent,
    MyCarComponent,
    CarAnalysisComponent,
    FilterComponent,
    SearchComponent,
    DriverInformationComponent,
    StatusComponent,
    CarVisualizationComponent,
    DiagnosticTroubleCodeComponent,
    MapComponent,
    ServiceVehicleListComponent,
    ServiceVehicleComponent,
    PrivacyServiceComponent,
    HelpComponent,
    ConfirmServiceVehicleComponent,
    DriverChatComponent,
    StatusColor,
    PersonalMenuComponent,
    ChatComponent,
    FilterPipe,
    CheckControlMessageListComponent,
    CheckControlMessageComponent,
    FilterServiceVehiclesPipe,
    DiagnosticTroubleCodeListComponent,
    ReverseGeocodePipe,
    CheckControlMessageListAodComponent,
    ConfirmResetApplicationComponent,
    DriverCarVisualizationComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatMenuModule,
    NgbModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatTabsModule,
    AgmCoreModule.forRoot({
      apiKey: 'Googlemaps Api Key'
    }),
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
