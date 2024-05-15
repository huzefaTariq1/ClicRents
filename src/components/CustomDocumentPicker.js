import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppButton from './AppButton'
import DocumentPicker from 'react-native-document-picker'

const CustomDocumentPicker = () => {

    const selectDoc=async()=>{
        try {
            console.log("inside")
         const doc=await DocumentPicker.pick({
            type:[DocumentPicker.types.images]
         });
         console.log(doc)
        } catch (error) {
            if (DocumentPicker.isCancel(error))
            console.log("user canceled",error)
        else
        console.log(error)
        }
    }

  return (
    <View>
       <AppButton title="doc" onPress={selectDoc}/>
      <Text>CustomDocumentPicker</Text>
    </View>
  )
}

export default CustomDocumentPicker

const styles = StyleSheet.create({})