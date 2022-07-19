import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import TimePicker from '../components/TimePicker'
import moment from 'moment';
import ReactNativeAN from 'react-native-alarm-notification';
import {addAlarm} from '../store/alarm/alarmActions'
import { connect } from 'react-redux';

const SetNewAlarmScreen = (props) => {

  const { navigation: {goBack} , addAlarm}  = props

  const [alarmTime, setAlarmTime] = useState(new Date())
  const [alarmTitle, setAlarmTitle] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const showTimePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
     setTimeFormat(date)
     hideTimePicker()
  };


  const setTimeFormat = (date)=>{
    setAlarmTime(date)
  }

  const handleOnSave = ()=>{
    var currentTime = Date.now();
    if (alarmTime.getTime() < currentTime) {
      Alert.alert('please choose future time');
      hideTimePicker();
      return;
    }

    const fireDate = ReactNativeAN.parseDate(alarmTime);

    const alarmNotifData = {
      id: Math.floor(Math.random() * 1000) + 1, 
      title: alarmTitle != '' ?  alarmTitle : 'Alarm Title', 
      message: 'My Notification Message', 
      channel: 'alarm-channel', 
      ticker: 'My Notification Ticker',
      auto_cancel: false, 
      vibrate: true,
      vibration: 100,
      small_icon: 'ic_launcher',
      large_icon: 'ic_launcher',
      play_sound: true,
      sound_name: 'channel1.mp3', 
      color: 'red',
      schedule_once: true, 
      tag: 'some_tag',
      fire_date: fireDate, 
      data: { value: alarmTime },
    };

    addAlarm(alarmNotifData);
    goBack();
  }

 

  return (
    <View style={styles.container}>

       <TouchableOpacity style={styles.timeStyle} onPress={showTimePicker}>
          <Text style={{fontWeight:'bold' , fontSize:40}}>{moment(alarmTime).format('hh:mm')}</Text>
          <Text style={{textTransform:"uppercase" , fontSize:16 , alignItems:'center'}}> 
            <Text style={moment(alarmTime).format('a')== 'am' ? styles.meridiemStyle:null}>AM </Text> | 
            <Text style={moment(alarmTime).format('a')== 'pm' ? styles.meridiemStyle:null}> PM</Text>
          </Text>
        </TouchableOpacity>

        <Text style={{color:'grey' , marginVertical:2}}>Alarm Name</Text>
        <TextInput 
          placeholder='enter alarm title' 
          style={styles.textStyle}
          maxLength={30}
          value={alarmTitle}
          onChangeText={setAlarmTitle}
        />

        <View style={{flexDirection:'row' , justifyContent:'space-between', marginTop:20 ,marginBottom:30}}>
          <Text style={styles.textStyle}>Sound</Text>
          <Text style={styles.textStyle}>Default</Text>
        </View>

        <Button
          title='SAVE'
          onPress={handleOnSave}
          color="#841584"
        />
        
        <TimePicker
          isVisible={isDatePickerVisible}
          onCancel={hideTimePicker}
          onConfirm={handleConfirm}
        />
    </View>
  )
}


function mapToStateProps(state) {
  const alarmState = state.alarmReducer;
  return {
    alarmState
  };
}

export default connect(mapToStateProps, {
  addAlarm,
})(SetNewAlarmScreen);

const styles = StyleSheet.create({

  container:{
    backgroundColor:'white',
    flex:1,
    margin:8, 
    padding:4,
  },  
  timeStyle:{
    alignItems:'center',
    justifyContent:'center',
    margin:10, padding:10,
  },
  textStyle:{
    fontSize:16,
    color:'black'
  },
  saveBtnStyle:{
    marginTop:100,
    backgroundColor:'red'
  },
  meridiemStyle:{
    fontWeight:'bold',
    fontSize:16
  }
})