import { StyleSheet, Switch, Text, View } from 'react-native'
import React from 'react'
import moment from 'moment'
import { useState } from 'react'

const AlarmItem = ({item , handleAlarm}) => {
    
    const  alarmTime = item.alarmNotifData.data.value
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        handleAlarm(item);
    }
    
    return (
    <View style={{flexDirection:'row', alignItems:'center', justifyContent:"space-between", padding:8,  marginVertical:8}}>
        
        <Text style={styles.timeStyle}>{moment(alarmTime).format('hh:mm a')}</Text>
        <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
        
    </View>
  )
}

export default AlarmItem

const styles = StyleSheet.create({
    timeStyle:{
        fontSize:24,
        fontWeight:'bold'
    }
})