import { LoginPage } from './login.po';
import { LoggedInHome } from './home.po';
import {tryCatch} from 'rxjs/util/tryCatch';
import { browser, by, element } from 'protractor';
import {} from 'jasmine';

describe('LOGIN: On Login page', () => {
  let loginPage: LoginPage;
  let home: LoggedInHome;

  const invalidCredentials = {
    username: 'invalidname',
    password: 'invalidpassword'
  };

  beforeEach(() => {
    loginPage = new LoginPage();
    home = new LoggedInHome();
  });

  afterEach(function() {
    loginPage.navigateTo();
});

  it('when the user trys to login with invalid credentials they should stay on “login page" and see error notification', () => {
    loginPage.navigateTo();
    loginPage.fillLoginFields(invalidCredentials);
    expect(loginPage.getPageTitle()).toEqual('Log In');
    expect(loginPage.getErrorMessage()).toEqual('There was an error logging in.');
  });

  it('when login is successful the user should be redirected to welcome page', () => {
    loginPage.fillLoginFields();
    expect(home.navigateTo()).toEqual(browser.get('/'));
  });

});
