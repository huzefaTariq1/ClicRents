import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react'
import { CalendarIcon } from './Icons'
import AppText from './AppText'
import DatePicker from 'react-native-date-picker'

const CustomDatePicker = ({onChangeDate}) => {
    const [date, setDate] = useState(new Date())
    const [showDate,setShowDate]=useState()
    const [open, setOpen] = useState(false)
    console.log("showDate",showDate)

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
    
        return `${day}-${month}-${year}`;
      };
  return (
    <View>
     <TouchableOpacity style={{flexDirection:"row",alignItems:"center"}} onPress={() => setOpen(true)} >
      <CalendarIcon />
      {!showDate && 
      <AppText style={{paddingLeft:10}}>Date of Birth</AppText>
      }
      {showDate && 
      <AppText style={{paddingLeft:10}}>{formatDate(showDate)}</AppText>
      }
     </TouchableOpacity>
     <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            onConfirm={(date) => {
              setOpen(false)
              setDate(date)
              setShowDate(date)
              onChangeDate(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
    </View>
  )
}

export default CustomDatePicker

const styles = StyleSheet.create({})