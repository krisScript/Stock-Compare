import utilities from './utilities';
describe('utilities', () => {
  describe('getRandomInt', () => {
    it('should be greater than 0', () => {
      expect(utilities.getRandomInt(1, 250)).toBeGreaterThan(0);
    });
    it('should be less than 251', () => {
      expect(utilities.getRandomInt(1, 250)).toBeLessThan(251);
    });
  });
  describe('createTableTr', () => {
    const label = 'AMZN';
    const latestPrice = 1643.24;
    const lowPrice = 1619.6;
    const openPrice = 1677.47;
    const highPrice = 1679.468;
    const testData = [label, latestPrice, lowPrice, openPrice, highPrice];
    const tableTr = utilities.createTableTr(testData);
    it('should have 5 children', () => {
      expect(tableTr.childElementCount).toBe(5);
    });
    it('should have TR Tag name ', () => {
      expect(tableTr.tagName).toMatch('TR');
    });
  });
  describe('extractData', () => {
    const testData = {
      AMZN: {
        quote: {
          latestPrice: 1643.24,
          high: 1679.468,
          low: 1619.6,
          open: 1677.47
        }
      }
    };
    it('should extract data from testData', () => {
      expect(utilities.extractData(testData)).toEqual({
        highPrices: [1679.468],
        labels: ['AMZN'],
        latestPrices: [1643.24],
        lowPrices: [1619.6],
        openPrices: [1677.47]
      });
    });
  });
});
