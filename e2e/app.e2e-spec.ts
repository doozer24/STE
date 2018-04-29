import { LoginPage, LoggedInHome, CreateTimeCard} from './app.po';
import {tryCatch} from 'rxjs/util/tryCatch';
import { browser, by, element } from 'protractor';

describe('Login page', () => {
  let loginPage: LoginPage;
  let home: LoggedInHome;
  let createTimeCard: CreateTimeCard;

  const invalidCredentials = {
    username: 'invalidname',
    password: 'invalidpassword'
  };

  beforeEach(() => {
    loginPage = new LoginPage();
    home = new LoggedInHome();
    createTimeCard = new CreateTimeCard();
  });

  it('when the user trys to login with invalid credentials they should stay on “login page" and see error notification', () => {
    loginPage.navigateTo();
    loginPage.fillLoginFields(invalidCredentials);
    expect(loginPage.getPageTitle()).toEqual('Log In');
    expect(loginPage.getErrorMessage()).toEqual('There was an error logging in.');
  });

  it('when login is successful the user should redirect to welcome page', () => {
    loginPage.navigateTo();
    loginPage.fillLoginFields();
    expect(home.getWelcomeMessage()).toEqual('Welcome John Doe');
  });

  it('when the user clicks Logout button they should be logged out and redirected to login page', () => {
    home.navigateTo();
    home.logOut()
    expect(loginPage.getPageTitle()).toEqual('Log In');
  });



});
