import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import storage from './storage/storage';
import App from './App';
import "./index.css"
import { ProSidebarProvider } from "react-pro-sidebar";

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
