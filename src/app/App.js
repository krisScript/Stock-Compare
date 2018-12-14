import getData from './getData/getData';
import setChart from './setChart';
import utilities from './utilities/utilities';
import displayError from './displayError/displayError';
class App {
  constructor() {
    this.getData = getData;
    this.setChart = setChart;
    this.extractData = utilities.extractData;
    this.stockForm = document.querySelector('.search-form');
    this.stockTableBody = document.querySelector('.stock-table-body');
    this.btnsSection = document.querySelector('.btns-section');
    this.displayError = displayError;
    this.colors = [];
    this.startingStocks = ['goog', 'fb', 'amzn', 'msft'];
  }
  getStocks(...stocks) {
    const url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stocks}&types=quote&range=1m&last=5`;
    return getData(url).then(data => {
      const procesessedData = this.extractData(data);
      return procesessedData;
    });
  }
  getColors(labels) {
    labels.forEach(label => {
      this.colors = [...this.colors, utilities.getRandomColor()];
    });
  }
  init() {
    this.getStocks(this.startingStocks)
      .then(data => {
        this.setData(data);
        this.chartType = 'bar';
        this.getColors(this.labels);
        this.chart = this.setChart(
          this.chartType,
          this.labels,
          this.latestPrices,
          this.colors
        );
        this.addToTable(
          this.labels,
          this.latestPrices,
          this.lowPrices,
          this.openPrices,
          this.highPrices
        );
      })
      .catch(error => displayError('Sorry there was an error!'));
  }
  setData(data) {
    Object.entries(data).forEach(entry => {
      this[entry[0]] = entry[1];
    });
  }
  addToTable(labels, latestPrices, lowPrices, openPrices, highPrices) {
    labels.forEach((label, index) => {
      const tableData = [
        label,
        latestPrices[index],
        lowPrices[index],
        openPrices[index],
        highPrices[index]
      ];
      const stockTr = utilities.createTableTr(tableData);
      this.createStockButton(label, stockTr);
      this.stockTableBody.appendChild(stockTr);
    });
  }
  createStockButton(label, stockTr) {
    const btn = document.createElement('button');
    btn.textContent = `Remove ${label}`;
    btn.addEventListener('click', e => {
      btn.remove();
      stockTr.remove();
      this.removeFromChart(label);
    });
    this.btnsSection.appendChild(btn);
  }
  updateChart() {
    this.chart.config.data.labels = [...this.labels];
    this.chart.config.data.datasets[0].data = [...this.latestPrices];
    this.chart.config.data.datasets[0].backgroundColor = [...this.colors];
    this.chart.update();
  }
  removeFromChart(targetLable) {
    const labelIndex = this.labels.indexOf(targetLable);
    this.labels = this.labels.filter(label => label !== targetLable);
    this.latestPrices = this.latestPrices.filter(
      (data, index) => index !== labelIndex
    );
    this.updateChart();
  }
  addToChart(labels, data) {
    this.labels = [...this.labels.concat(labels)];
    this.latestPrices = [...this.latestPrices.concat(data)];
    this.updateChart();
  }
  searchForStock() {
    this.stockForm.addEventListener('submit', e => {
      e.preventDefault();
      const labels = e.target.elements.labels.value;
      const labelsArr = labels.split(',');
      const notDuplicateLabels = labelsArr.map(label => {
        if (this.labels.includes(label.toUpperCase())) {
          displayError(
            `${label.toUpperCase()} is already displayed!`,
            'duplication'
          );
        } else {
          return label.toUpperCase();
        }
      });
      const url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${notDuplicateLabels}&types=quote&range=1m&last=5`;
      this.getData(url)
        .then(data => {
          const dataLabels = Object.keys(data);
          notDuplicateLabels.forEach(label => {
            if (label === undefined) {
            } else {
              if (!dataLabels.includes(label)) {
                displayError(`${label} wasn't found!`, 'duplication');
              }
            }
          });
          const procesessedData = this.extractData(data);
          this.getColors(procesessedData.labels);
          this.addToChart(procesessedData.labels, procesessedData.latestPrices);
          this.addToTable(
            procesessedData.labels,
            procesessedData.latestPrices,
            procesessedData.lowPrices,
            procesessedData.openPrices,
            procesessedData.highPrices
          );
          e.target.reset();
        })
        .catch(error => displayError('Sorry there was an error!'));
    });
  }
}
export default App;
