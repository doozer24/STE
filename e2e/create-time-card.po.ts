import { browser, by, element } from 'protractor';

export class CreateTimeCard {

    private credentials = {
        username: 'dummy',
        password: 'pass123'
      };

    navigateToCreatedTimeCard(){
      return browser.get('/create-time-card/1');
    }
  
    logOut(){
      return element(by.css('a[href="#"]')).click();
    }
  
    getWelcomeMessage(){
      return element(by.css('[class="page-subheader"]'));
    }

    timeCardDateRangeSelectDropdown(){
        //return element(by.name('gender')).element(by.cssContainingText('option', 'Male')).click();
        return element(by.css('option[value="range"]')).click();
    }    

    createTimeCardButton(){
        return element(by.css('[type="submit"]')).click();
    }

    cancelButton(){
        return element(by.css('[class="usa-button-secondary"]')).click();
    }
  
  }