import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import CustomImagePicker from './CustomImagePicker';

const AppFormImagePicker = ({name,title}) => {
    console.log("titel in form",title)
    const { errors, setFieldValue, touched, values } = useFormikContext();
    const imageUris = values[name];
  
    const handleAdd = (uri) => {
      setFieldValue(name, uri);
    };
  return (
 <>
 <CustomImagePicker onChangeImage={handleAdd} imageUrl={imageUris} title={title}  />
 <ErrorMessage error={errors[name]} visible={touched[name]} />
 </>
  )
}

export default AppFormImagePicker

const styles = StyleSheet.create({})