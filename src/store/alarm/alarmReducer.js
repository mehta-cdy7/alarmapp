import Moment from 'moment';
import * as alarmActionsTypes from './alarmActions';

const initialState = {
  alarms: [],
};

const alarmReducer = (state = initialState, action) => {
  switch (action.type) {
    case alarmActionsTypes.ADD_ALARM:
      Moment.locale('en')
      const payload = action.payload;
      const time = Moment(payload.data.value).format('hh:mm A');
      const date = Moment(payload.data.value).format('d/M/YY');
      console.log(time);
      const alarm = {
        alarmNotifData: payload,
        value: payload.data.value,
        time: time,
        date: date,
      };
      return {...state, alarms: [...state.alarms ,alarm ]};
    default:
      return state;
  }
};

export default alarmReducer;