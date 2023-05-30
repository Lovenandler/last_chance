import { combineReducers } from 'redux';
import mainReducer from './reducers/mainReducer';
import callReducer from './reducers/callReducer';

export default combineReducers({
  dashboard: mainReducer,
  call: callReducer
});
