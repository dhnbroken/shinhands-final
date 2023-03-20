import { combineReducers } from 'redux';
import authReducer from './authReducer';
import messageReducer from './messageReducer';
import userReducer from './userReducer';

export default combineReducers({
  authReducer,
  messageReducer,
  userReducer,
});
