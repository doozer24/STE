import { browser, by, element } from 'protractor';

export class LoggedInHome {
    navigateTo(){
      return browser.get('/');
    }
  
    logOut(){
      return element(by.css('a[href="#"]')).click();
    }
  
    getWelcomeMessage(){
      return element(by.css('[class="page-subheader"]')).getText();
    }

    createTimeCardButtonFromHomeScreen(){
        return element(by.css('[type="submit"]')).click();
    }
  
}