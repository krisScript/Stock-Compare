import puppeteer from 'puppeteer';
describe('index', () => {
  let page;
  let testData;
  beforeAll(async () => {
    jest.setTimeout(30000);
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      args: ['--windows-size=1920,1080']
    });
    testData = {
      TSLA: {
        quote: {
          latestPrice: 1200,
          low: 1000,
          high: 1200,
          opem: 1050
        }
      }
    };
    page = await browser.newPage();
    await page.goto('http://localhost:1234/');
    await page.setRequestInterception(true);
    //Puppeteer dosnt intercept the first request
    //I'm currently trying to resolve the issue
    //Once it's resolved i will continue with testing the app
    await page.on('request', request => {
      request.respond({
        content: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(testData)
      });
    });
  });
  afterAll(() => {
    t;
    browser.close();
  });
  it('should have title "Stock Compare"', async () => {
    const title = await page.title();
    expect(title).toMatch('Stock Compare');
  });
  describe('searching for stock data', () => {
    let card;
    let modal;
    beforeAll(async () => {
      await page.waitForSelector('.search-form');
      await page.type('input[name=labels]', 'tsla');
      await page.$eval('.search-btn', btn => btn.click());
    });
    it('tbody should have 5 children', async () => {
      const tbodyChildElementCount = await page.$eval(
        'tbody',
        element => element.childElementCount
      );
      expect(tbodyChildElementCount).toBe(5);
    });
    describe('removing stock from chart and table', () => {
      beforeAll(async () => {
        await page.evaluate(() => {
          Array.from(document.querySelectorAll('button'))
            .filter(element => element.textContent === 'Remove GOOG')[0]
            .click();
        });
      });
      it('tbody should have 4 children', async () => {
        const tbodyChildElementCount = await page.$eval(
          'tbody',
          element => element.childElementCount
        );
        expect(tbodyChildElementCount).toBe(4);
      });
      it('button with "Remove GOOG text content shouldnt exist"', async () => {
        const googBTn = await page.evaluate(() => {
          Array.from(document.querySelectorAll('button')).filter(
            element => element.textContent === 'Remove GOOG'
          )[0];
        });
        expect(googBTn).toBeFalsy();
      });
    });
  });
});
