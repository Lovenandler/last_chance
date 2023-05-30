import { createStore } from 'redux';
import mainAdapter from './adapter';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  mainAdapter,
  composeWithDevTools()
);

export default store;
