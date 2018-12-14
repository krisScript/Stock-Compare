const getData = () => {
  return Promise.resolve(
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
};
export default getData;