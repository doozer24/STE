import { CreateTimeCard } from './create-time-card.po';
import { LoggedInHome } from './home.po';
import { LoginPage } from './login.po';
import {tryCatch} from 'rxjs/util/tryCatch';
import { browser, by, element } from 'protractor';
import {} from 'jasmine';

describe('When on the Create Time Card page', () => {
    let createTimeCard: CreateTimeCard;
    let home: LoggedInHome;
    let loginPage: LoginPage;


beforeEach(() => {
    createTimeCard = new CreateTimeCard();
    home = new LoggedInHome();
    loginPage = new LoginPage();

  });


// it('when the user clicks Logout button they should be logged out and redirected to login page', () => {
//     home.navigateTo();
//     home.logOut();
//     expect(loginPage.getPageTitle()).toEqual('Log In');
//   });

it('when logged in user clicks on dropdown, they can can select a date range, click the "Create Time Card" button, and be taken to their newly created time card', () => {
    //createTimeCard.timeCardDateRangeSelectDropdown();
    createTimeCard.navigateToCreatedTimeCard();
    createTimeCard.createTimeCardButton();
    expect(createTimeCard.navigateToCreatedTimeCard()).toEqual(browser.get('/time-card/1'));
  });

});
