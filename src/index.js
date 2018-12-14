'use strict';
import './style/index.scss';
import Charts from 'chart.js';
import App from './app/App';
const app = new App();
app.init();
app.searchForStock();
