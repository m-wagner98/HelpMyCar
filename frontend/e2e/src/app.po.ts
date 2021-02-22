import {browser, by, element} from 'protractor';
import {groupBy} from 'rxjs/operators';
import {GlobalConstants} from '../../src/app/shared/GlobalConstants';

export class AppPage {
  navigateTo() {
    return browser.get(GlobalConstants.frontendPath);
  }

  getAssistanceOpDButton() {
    return element(by.css('.mat-focus-indicator:nth-child(1)'));
  }

  getDriverButton(){
    return element(by.css('button:nth-of-type(2)>span'));
  }

  getAppHeadline(){
    return element(by.css('h2'));
  }

  getAppHeaderMenuIcon(){
    return element(by.xpath('//mat-icon[.=\'menu\']'));
  }

  getDriverLogInMatCardTitle(){
    return element(by.css('.mat-card-title'));
  }

  getLoginInputUsername(){
    return element(by.xpath('//label[@class=\'ng-tns-c142-0\']/input[@class=\'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored\']'));
  }

  getLoginInputPW(){
    return element(by.xpath('//label[@class=\'ng-tns-c142-1\']/input[@class=\'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored\']'));
  }

  getLoginButton(){
    return element(by.css('button>span'));
  }

  getSendHelpRequestButton(){
    return element(by.css('#help-request'));
  }

  getMyCarDataButton(){
    return element(by.css('#preview'));
  }

  getVINCarouselControlLeft(){
    return element(by.css('.carousel-control-prev'));
  }

  getVINCarouselControlRight(){
    return element(by.css('.carousel-control-next'));
  }

  getPersonalMenuButton(){
    return element(by.css('div.carousel-item .mat-button-wrapper'));
  }

  getSelectedVINButton(){
    return element(by.css('div.carousel-item .mat-button-wrapper'));
  }

  getMatDialogContent(){
    return element(by.css('.mat-dialog-content'));
  }

  getMatDialogYesButton(){
    return element(by.css('div.mat-dialog-actions > button:nth-of-type(1) > .mat-button-wrapper'));
  }

  getRequestIcon(){
    return element(by.css('.icon'));
  }

  getRequestStatusText(){
    return element(by.css('p'));
  }

  getRequestStatusMyCarDataButton(){
    return element(by.css('.mat-button-wrapper'));
  }

  getRequestStatusChatButton(){
    return element(by.css('#chat'));
  }

  getDriverChatInput(){
    return element(by.css('.cdk-textarea-autosize'));
  }

  getDriverChatSendButton(){
    return element(by.xpath('//mat-icon[@class=\'mat-icon notranslate pointer material-icons mat-icon-no-color ng-tns-c142-7\']'));
  }

  getAppGoBackButton(){
    return element(by.xpath('//mat-icon[@class=\'mat-icon notranslate pointer material-icons mat-icon-no-color ng-star-inserted\']'));
  }

  getAODSearchIcon(){
    return element(by.css('.search-icon'));
  }

  getHelpRequestBox() {
    return element(by.css('app-request>div:nth-of-type(1)>div:nth-of-type(2)'));
  }

  getStatusOpenCircle() {
    return element(by.css('div#status-open > .circle'));
  }

  getStatusInProgressCircle(){
    return element(by.css('div#in-progress > .circle'));
  }

  getStatusServiceVehicleOnWayCircle(){
    return element(by.css('div.progress-wrapper > mat-icon:nth-of-type(5)'));
  }

  getStatusClosedCircle(){
    return element(by.css('div#closed > .circle'));
  }

  getProgressComponent() {
    return element(by.css('.progress-wrapper'));
  }

  getRequestInProgressCircle() {
    return element(by.css('mat-icon:nth-of-type(3)'));
  }

  getAODAppDriverInfoPanel(){
    return element(by.xpath('//mat-panel-title[@class=\'mat-expansion-panel-header-title ng-tns-c216-2\']'));
  }

  getAODDTCPanel(){
    return element(by.xpath('//p[.=\'Trouble codes:\']'));
  }

  getAODCarVisualizationPanel() {
    return element(by.css('[src=\'assets/Visualisierung.png\']'));
  }

  getAODMap(){
    return element(by.id('map'));
  }

  getAODServiceVehicleListPanel(){
    return element(by.css('app-service-vehicle-list>mat-card'));
  }

  getAODChat(){
    return element(by.css('app-chat'));
  }

  getAODChatArrowIcon(){
    return element(by.css('app-chat>div:nth-of-type(2)>mat-icon'));
  }

  getAODChatMessage(){
    return element(by.css('div#chat-box > mat-card:nth-of-type(1) > .mat-card-content'));
  }

  getAODFirstServiceVehicle(){
    return element(by.xpath('//span[.=\'V1RTUALV1N0000001, available:true\']'));
  }

  getAODConfirmServiceVehicleButton(){
    return element(by.css('app-confirm-service-vehicle>div:nth-of-type(2)>button:nth-of-type(1)'));
  }

  getAODServiceVehicleListPanelText(){
    return element(by.css('app-service-vehicle-list>mat-card>p'));
  }

  getAODMechanicArrivedButton(){
    return element(by.buttonText('Mechanic Arrived!'));
  }
}
