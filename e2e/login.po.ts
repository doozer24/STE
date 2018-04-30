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
