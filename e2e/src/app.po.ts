import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTextProcessorComponentTag() {
    return element(by.css('app-text-processor'));
  }
}
