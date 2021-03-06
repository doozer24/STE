import { LoginPage } from './login.po';
import { LoggedInHome } from './home.po';
import { tryCatch } from 'rxjs/util/tryCatch';
import { browser, by, element } from 'protractor';
import {} from 'jasmine';

describe('HOME: When logged in to home page', () => {
  let loginPage: LoginPage;
  let home: LoggedInHome;

  const invalidCredentials = {
    username: 'invalidname',
    password: 'invalidpassword'
  };

  beforeEach(() => {
    home = new LoggedInHome();
    loginPage = new LoginPage();

  });

  // it('when the user clicks Logout button they should be logged out and redirected to login page', () => {
  //   loginPage.navigateTo();
  //   loginPage.fillLoginFields();
  //   home.navigateTo();
  //   home.logOut();
  //   expect(loginPage.getPageTitle()).toEqual('Log In');
  // });

  // it('when user clicks on Create Time Card button they should be directed the Create Time Card page', () => {
  //   expect(home.createTimeCardButtonFromHomeScreen()).toEqual(browser.get('/create-time-card'));
  // });
});

