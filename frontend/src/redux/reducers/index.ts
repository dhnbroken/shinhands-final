import { combineReducers } from 'redux';
import authReducer from './authReducer';
import messageReducer from './messageReducer';
import userReducer from './userReducer';
import shoesReducer from './shoesReducer';

export default combineReducers({
  authReducer,
  messageReducer,
  userReducer,
  shoesReducer,
});
