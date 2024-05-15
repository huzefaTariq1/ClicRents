import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFormikContext } from 'formik'
import ErrorMessage from './ErrorMessage'
import CustomDatePicker from './CustomDatePicker'




const AppFormDatePicker = ({name}) => {
    const { errors, setFieldValue, touched, values } = useFormikContext();

    const handleAdd = (date) => {
        setFieldValue(name,date);
    };
  return (
  <>
  <CustomDatePicker onChangeDate={handleAdd}/>
  <ErrorMessage error={errors[name]} visible={touched[name]} />
  </>
  )
}

export default AppFormDatePicker

const styles = StyleSheet.create({})