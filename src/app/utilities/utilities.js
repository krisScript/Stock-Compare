const createTableTr = data => {
  const tableTr = document.createElement('tr');
  data.forEach(element => {
    const td = document.createElement('td');
    td.textContent = element;
    tableTr.appendChild(td);
  });
  return tableTr;
};
const extractData = data => {
  const labels = [];
  const latestPrices = [];
  const lowPrices = [];
  const openPrices = [];
  const highPrices = [];
  Object.entries(data).forEach(company => {
    labels.push(company[0]);
    const { latestPrice } = company[1].quote;
    const { low } = company[1].quote;
    const { open } = company[1].quote;
    const { high } = company[1].quote;
    latestPrices.push(latestPrice);
    lowPrices.push(low);
    openPrices.push(open);
    highPrices.push(high);
  });
  return {
    labels,
    latestPrices,
    lowPrices,
    openPrices,
    highPrices
  };
};
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
const getRandomColor = () => {
  return `rgba(${getRandomInt(1, 250)}, ${getRandomInt(1, 250)},${getRandomInt(
    1,
    250
  )}, 0.2)`;
};
const utilities = {
  createTableTr,
  getRandomInt,
  getRandomColor,
  extractData
};
export default utilities;
