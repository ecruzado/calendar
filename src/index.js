import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const title = 'Initial setup';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
module.hot.accept();