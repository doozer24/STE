import { TimeCard } from './time-card.po';
import { CreateTimeCard } from './create-time-card.po';
import { LoggedInHome } from './home.po';
import { LoginPage } from './login.po';
import {tryCatch} from 'rxjs/util/tryCatch';
import { browser, by, element } from 'protractor';
import {} from 'jasmine';

describe('When on the Create Time Card page', () => {
    let timeCard: TimeCard;
    let createTimeCard: CreateTimeCard;
    let home: LoggedInHome;
    let loginPage: LoginPage;

beforeEach(() => {
    timeCard = new TimeCard();
    createTimeCard = new CreateTimeCard();
    home = new LoggedInHome();
    loginPage = new LoginPage();
  });


});