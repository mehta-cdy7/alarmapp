export const ADD_ALARM = 'ADD_ALARM';


export const addAlarm = (_data_)=> {
  return {   
     type: ADD_ALARM,
     payload: _data_,
  };
}