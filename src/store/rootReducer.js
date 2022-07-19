import {combineReducers} from 'redux';
import alarmReducer from './alarm/alarmReducer';

const appReducer = combineReducers({
  alarmReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;