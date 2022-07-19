import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View , Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import {addAlarm} from '../store/alarm/alarmActions'
import { connect } from 'react-redux';
import AlarmItem from '../components/AlarmItem';
import ReactNativeAN from 'react-native-alarm-notification'
import { NativeEventEmitter, NativeModules } from 'react-native';

const AlarmScreen = (props) => {
  const {navigation:{navigate} , alarmState} = props
  const {alarms} = alarmState

  useEffect(() => {
    if(Platform.OS =='ios'){
      checkIOSPermissions();
    }
  }, [])
  

  const handleScheduleAlarm = async(item)=>{
    const {alarmNotifData} = item
    const {fire_date}  =alarmNotifData
    ReactNativeAN.scheduleAlarm(alarmNotifData)
  }

  const checkIOSPermissions = ()=>{
    // check if notification permissions has been granted for iOS
    ReactNativeAN.checkPermissions((permissions) => {
      console.log(permissions);
    });

    // Request iOS permissions
    ReactNativeAN.requestPermissions({
      alert: true,
      badge: true,
      sound: true,
    }).then(
      (data) => {
        console.log('RnAlarmNotification.requestPermissions', data);
      },
      (data) => {
        console.log('RnAlarmNotification.requestPermissions failed', data);
      }
    );
  }

  const { RNAlarmNotification } = NativeModules;
  const RNAlarmEmitter = new NativeEventEmitter(RNAlarmNotification);

  const openedSubscription = RNAlarmEmitter.addListener('OnNotificationOpened' , (data)=>{
   
    const res = JSON.parse(data);
    const id = parseInt(res.id)
    Alert.alert(
      "Alarm",
      "Dismiss Alarm",
      [
        { text: "OK", onPress: () => {
          ReactNativeAN.stopAlarmSound();
          ReactNativeAN.removeFiredNotification(id);
          ReactNativeAN.removeAllFiredNotifications();
        } 
      }
      ]
    );

  })
  
  return (
    <View style={{ flex:1}}>   
        
        <View style={{flexDirection:"row"  , alignItems:'center' , justifyContent:"center"}}>
            <Text style = {{fontWeight:'bold' , fontSize:20 , flex:1 , textAlign:'center' , marginVertical:10}}>Alarms</Text>
            <TouchableOpacity style={{borderWidth:1 , borderRadius:4 , marginRight:20 , padding:4  }} onPress={()=>navigate('Set New Alarm')}>
              <Text> ADD+ </Text>
            </TouchableOpacity>
        </View>

        <FlatList
            style={{marginHorizontal: 10}}
            data={alarms}
            renderItem={({index, item}) => (
               <AlarmItem 
                  item={item} 
                  handleAlarm={(item)=>{
                    handleScheduleAlarm(item)
                  }}
               />
            )}
            keyExtractor={(item, index) => index.toString()}
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
})(AlarmScreen);

const styles = StyleSheet.create({})