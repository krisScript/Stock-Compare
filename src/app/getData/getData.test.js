import getData from './getData';
jest.mock('./getData');
describe('getData', () => {
  it('should fetch data', async () => {
    const data = await getData();
    expect(data).toEqual(
      {
        AMZN:{
          quote:{
            latestPrice:1000,
            low:1000,
            high:1200,
            opem:1050
          }
        },
        FB:{
          quote:{
            latestPrice:1200,
            low:1040,
            high:1200,
            opem:1450
          }
        },
        GOOG:{
          quote:{
            latestPrice:1200,
            low:1000,
            high:1200,
            opem:1050
          }
        },
        MSFT:{
          quote:{
            latestPrice:1000,
            low:1000,
            high:1200,
            opem:1050
          }
        }
      }
    );
  });
});
