import { combineReducers } from 'redux';
import mainAdapter from './adapter/mainPageAdapter';
import callAdapter from './adapter/callAdapter';

export default combineReducers({
  dashboard: mainAdapter,
  call: callAdapter
});
