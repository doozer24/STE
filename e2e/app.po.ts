import { browser, by, element } from 'protractor';

export class LoginPage {

  private credentials = {
    username: 'dummy',
    password: 'pass123'
  };

  navigateTo(){
    return browser.get('/login');
  }

  fillLoginFields(credentials: any = this.credentials) {
    element(by.css('[id="username"]')).sendKeys(credentials.username);
    element(by.css('[id="password"]')).sendKeys(credentials.password);
    element(by.css('[id="login"]')).click();
  }

  getPageTitle(){
    return element(by.css('legend')).getText();
  }

  getErrorMessage(){
    return element(by.css('[role="alert"]')).getText();
  }

}

export class LoggedInHome {
  navigateTo(){
    return browser.get('/');
  }

  logOut(){
    return element(by.css('a[href="#"]')).click();
  }

  getWelcomeMessage(){
    return element(by.css('[class="page-subheader"]'));
  }

  createTimeCardButton(){
    return element(by.css('[routerLink="/create-time-card"]')).click();
  }

}

export class CreateTimeCard {
  navigateTo(){
    return browser.get('/create-time-card');
  }

  logOut(){
    return element(by.css('a[href="#"]')).click();
  }

  getWelcomeMessage(){
    return element(by.css('[class="page-subheader"]'));
  }

  cancelButton(){
    return element(by.css('[class="usa-button-secondary"]'));
  }

}









