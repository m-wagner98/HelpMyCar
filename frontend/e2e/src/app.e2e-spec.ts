import {AppPage} from './app.po';
import {browser, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  function driverLogIn(){
    page.navigateTo();
    page.getDriverButton().click();
    page.getLoginInputUsername().sendKeys('juliaBecker');
    page.getLoginInputPW().sendKeys('lol');
    page.getLoginButton().click();
  }

  beforeEach(() => {
    page = new AppPage();
    browser.driver.manage().window().setSize(1280, 1024);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('should display the buttons for selecting an application', () => {
    page.navigateTo();
    expect(page.getAssistanceOpDButton().getText()).toEqual('Assistance Operator dashboard');
    expect(page.getDriverButton().getText()).toEqual('Driver');
  });

  it('should display driver login screen ',  () => {
    page.getDriverButton().click();
    expect(page.getAppHeadline().getText()).toEqual('HelpMyCar');
    expect(page.getDriverLogInMatCardTitle().getText()).toEqual('Login');
    expect(page.getLoginInputUsername().isDisplayed()).toBe(true);
    expect(page.getLoginInputPW().isDisplayed()).toBe(true);
    expect(page.getLoginButton().getText()).toEqual('Login');
  });

  it('should display driver start page component after login',  () => {
    page.navigateTo();
    page.getDriverButton().click();
    page.getLoginInputUsername().sendKeys('juliaBecker');
    page.getLoginInputPW().sendKeys('lol');
    page.getLoginButton().click();
    // logged in
    expect(page.getAppHeaderMenuIcon().isDisplayed()).toBe(true);
    expect(page.getAppHeadline().getText()).toEqual('HelpMyCar');
    expect(page.getSendHelpRequestButton().isDisplayed()).toBe(true);
    expect(page.getMyCarDataButton().isDisplayed()).toBe(true);
    expect(page.getVINCarouselControlLeft().isDisplayed()).toBe(true);
    expect(page.getVINCarouselControlRight().isDisplayed()).toBe(true);
    expect(page.getPersonalMenuButton().isDisplayed()).toBe(true);
    expect(page.getSelectedVINButton().isDisplayed()).toBe(true);
  });

  it('should display everything properly when sending help request and opening chat',  () => {
    // login
    driverLogIn();
    // check displayed elements
    page.getSendHelpRequestButton().click();
    expect(page.getMatDialogContent().isDisplayed()).toBe(true);
    page.getMatDialogYesButton().click();
    expect(page.getRequestIcon().isDisplayed()).toBe(true);
    expect(page.getRequestStatusText().getText()).toEqual('Request in progress');
    expect(page.getRequestStatusMyCarDataButton().isDisplayed()).toBe(true);
    expect(page.getRequestStatusChatButton().isDisplayed()).toBe(true);
    page.getRequestStatusChatButton().click();
    expect(page.getDriverChatInput().isDisplayed()).toBe(true);
    expect(page.getAppGoBackButton().isDisplayed()).toBe(true);
    page.getDriverChatInput().sendKeys('Sooos');
    page.getDriverChatSendButton().click();
    page.getAppGoBackButton().click();
    // switch to assistant operator
    page.navigateTo();
    page.getAssistanceOpDButton().click();
    // check displayed components
    expect(page.getAODSearchIcon().isDisplayed()).toBe(true);
    expect(page.getHelpRequestBox().isDisplayed()).toBe(true);
    expect(page.getStatusOpenCircle().isDisplayed()).toBe(true);
    expect(page.getStatusInProgressCircle().isDisplayed()).toBe(true);
    expect(page.getStatusClosedCircle().isDisplayed()).toBe(true);
    // open detail view
    page.getHelpRequestBox().click();
    expect(page.getAppHeadline().getText()).toEqual('HelpMyCar');
    expect(page.getProgressComponent().isDisplayed()).toBe(true);
    expect(page.getRequestInProgressCircle().getAttribute('id')).toEqual('highlighted');
    expect(page.getAODAppDriverInfoPanel().getText()).toContain('Julia Becker');
    expect(page.getAODDTCPanel().getText()).toContain('Trouble codes');
    expect(page.getAODCarVisualizationPanel().isDisplayed()).toBe(true);
    expect(page.getAODServiceVehicleListPanel().isDisplayed()).toBe(true);
    expect(page.getAODChat().isDisplayed()).toBe(true);
    // Open chat
    page.getAODChatArrowIcon().click();
    expect(page.getAODChatMessage().getText()).toEqual('Sooos');
    page.getAODChatArrowIcon().click();
    // Send Service Vehicle
    page.getAODFirstServiceVehicle().click();
    page.getAODConfirmServiceVehicleButton().click();
    expect(page.getAODServiceVehicleListPanelText().getText()).toContain('Sent vehicle:');
    // Go back to driver app
    driverLogIn();
    expect(page.getRequestStatusText().getText()).toEqual('Mechanic on their way');
    // go to dashboard and update status
    page.navigateTo();
    page.getAssistanceOpDButton().click();
    page.getHelpRequestBox().click();
    page.getAODMechanicArrivedButton().click();
  });
});
