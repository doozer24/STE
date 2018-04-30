import { browser, by, element } from 'protractor';

export class TimeCard {

    private hours = {
        monday: 8,
        tuesday: 8,
        wednesday: 8,
        thursday: 8,
        friday: 8,
        saturday: 8,
        sunday: 8
    };

    fillTimeFields(hours: any = this.hours) {
        element(by.css('[id="username"]')).sendKeys(hours.monday);
        element(by.css('[id="password"]')).sendKeys(hours.tuesday);
        element(by.css('[id="login"]')).click();
    }

    

}