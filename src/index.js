import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './css/style.scss';

const title = 'Initial setup';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
module.hot.accept();