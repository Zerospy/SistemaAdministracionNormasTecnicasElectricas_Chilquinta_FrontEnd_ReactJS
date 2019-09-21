import '@fortawesome/fontawesome-free/css/all.css';
/* GRID*/
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import 'ag-grid/dist/styles/ag-theme-bootstrap.css';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import App from 'App';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();