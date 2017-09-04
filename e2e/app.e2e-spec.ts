import { SandboxPage } from './app.po';

describe('sandbox App', () => {
  let page: SandboxPage;

  beforeEach(() => {
    page = new SandboxPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
