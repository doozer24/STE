import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    // return element(by.css('div')).getText();
    return element(by.css('div')).getText();
  }
}
