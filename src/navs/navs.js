import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import AlarmScreen from '../screens/AlarmScreen'
import SetNewAlarmScreen from '../screens/SetNewAlarmScreen'

const Stack = createNativeStackNavigator();

export default function Navigations() {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Alarm"
          component={AlarmScreen}
          options={{
            headerShown: false
          }}
        />
         <Stack.Screen
          name="Set New Alarm"
          component={SetNewAlarmScreen}
          options={{
            headerShown: true
          }}
        />
      </Stack.Navigator>
    )
  }