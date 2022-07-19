import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimePicker = ({isVisible ,onConfirm , onCancel}) => {
    
  return (
         <DateTimePickerModal
          isVisible={isVisible}
          mode="time"
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
  )
}

export default TimePicker

const styles = StyleSheet.create({})