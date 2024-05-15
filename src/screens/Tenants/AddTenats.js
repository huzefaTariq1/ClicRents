import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getTranslation } from '../../helpers/TranslationUtils';
import TopBar from '../../components/TopBar';
import AppForm from '../../components/AppForm';
import AppFormField from '../../components/AppFormField';
import SubmitButton from '../../components/SubmitButton';
import * as Yup from 'yup';
//import React from 'react';
import React, { useState } from 'react'
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'
import CustomDatePicker from '../../components/CustomDatePicker';
import AppFormDatePicker from '../../components/AppFormDatePicker';
import CheckBox from '@react-native-community/checkbox';
import AppText from '../../components/AppText';
import CustomImagePicker from '../../components/CustomImagePicker';
import AppFormImagePicker from '../../components/AppFormImagePicker';
import CustomDocumentPicker from '../../components/CustomDocumentPicker';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label(getTranslation("First Name", "First Name", "First Name")),
  lastName: Yup.string().required().label(getTranslation("Last Name", "Last Name", "Last Name")),
  idCard: Yup.string().required().label(getTranslation("Id Card", "Id Card", "Id Card")),
  email: Yup.string().required().email().label('Email'),
  date: Yup.string().required().label('date'),
  frontIdCardSide: Yup.mixed().required("Front IdCard Side is required"),
  backIdCardSide: Yup.mixed().required("Back IdCard Side is required"),
});

const AddTenants = () => {
  // const [date, setDate] = useState(new Date())
  // const [open, setOpen] = useState(false)
  // console.log("data picker", date)
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  return (
    <SafeAreaView>
      <TopBar route={getTranslation("Home", "Home", "Home") + " / " + getTranslation("Add Tenants", "Add Tenants", "Add Tenants")} />
      <View style={{ paddingHorizontal: 10 }}>
        <ScrollView >

          {/* <AppForm
            initialValues={{
              firstName: '',
              lastName: '',
              idCard: '',
              telephone: '',
              email: '',
              date: '',
              birthTown: '',
              frontIdCardSide: "",
              backIdCardSide: '',
            }}
            onSubmit={values => console.log(values)}
            validationSchema={validationSchema}>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              name="firstName"
              placeholder={getTranslation("First Name", "First Name", "First Name")}
            />

            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              name="lastName"
              placeholder={getTranslation("Last Name", "Last Name", "Last Name")}
            />

            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              name="idCard"
              placeholder={getTranslation("Id Card", "Id Card", "Id Card")}
            />

            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              name="email"
              placeholder={getTranslation("Email", "Email", "Email")}
              textContentType="emailAddress"
            />



            <AppFormDatePicker name="date" />

            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              name="birthTown"
              placeholder={getTranslation("Birth Town", "Birth Town", "Birth Town")}
            />

            <View style={{ flexDirection: "row", alignItems: "center" }}>

              <AppText style={{ paddingRight: 10 }}>{getTranslation("Enable Auto Reminder", "Enable Auto Reminder", "Enable Auto Reminder")}</AppText>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                boxType='square'
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />
            </View>


            <View>
              <AppFormImagePicker name="frontIdCardSide" title="Front" />
              <AppFormImagePicker name="backIdCardSide" title="Back" />
            </View>


            <SubmitButton title="Cr-Add" />
          </AppForm> */}
          <CustomDocumentPicker/>
        </ScrollView>



      </View>
    </SafeAreaView>
  );
};

export default AddTenants;

const styles = StyleSheet.create({});
