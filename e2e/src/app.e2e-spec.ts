import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display app-text-processor', () => {
    page.navigateTo();
    expect(page.getTextProcessorComponentTag()).toBeTruthy();
  });

});
