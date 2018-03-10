import React from 'react';
import ReactDOM from 'react-dom';

const title = 'Initial setup';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);
module.hot.accept();