import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import storage from './storage/storage';
import App from './App';
import { ProSidebarProvider } from "react-pro-sidebar";
//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storage}>
      <ProSidebarProvider>
      <App />
      </ProSidebarProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
