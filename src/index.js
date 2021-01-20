import ReactDOM from 'react-dom';
import React from 'react';
import HelloMessage from './HelloMessage';

ReactDOM.render(
  <HelloMessage name="Tayldsdsadsadsadsdsdsd" />,
  document.getElementById('app')
);


if (module.hot) {
  module.hot.accept();
}