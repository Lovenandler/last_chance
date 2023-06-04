import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import storage from './storage/storage';
import App from './App';
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storage}>
      <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
