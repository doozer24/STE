import { AppPage } from './app.po';
import {tryCatch} from 'rxjs/util/tryCatch';

describe('sevis-challenge-frontend App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Sevis Frontend Hello World',page.toString());
  });
});
