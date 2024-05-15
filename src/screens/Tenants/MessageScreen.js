import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import AppText from '../../components/AppText';
import {CloseIcon} from '../../components/Icons';
import axiosInstance from '../../../axiosInstance';
import {API_URL,LOGIN_BASE_URL} from "@env"
import { getTranslation } from '../../helpers/TranslationUtils';

const MessageScreen = ({navigation, route}) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState();
  const [success, setSucess] = useState(false);
  const [inputError, setInputError] = useState(false);

  const [loading, setLoading] = useState(false);
  const detail = route.params;
  console.log('in message', detail.id);

  const handleButtonPress = buttonValue => {
    setInputError(false);
    setInputValue(prevValue => prevValue + ' [' + buttonValue + ']');
  };

  const handleSubmit = async () => {
    if (!inputValue) {
      setInputError(true);
      return;
    }
    try {
      setInputError(false);
      setLoading(true);
      const payload = {
        tenantId: detail.id,
        templateText: inputValue,
      };
      const response = await axiosInstance.post(
        `${API_URL}/Tenant/SendSMSReminderToTenant`,
        payload,
      );
      setLoading(false);
      setSucess(true);
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (error) {
      setLoading(false);
      setError(true);
      // console.error('error:', error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data);
        console.log('error resonse', error.response.data);
      }
    }

    // Perform action with the submitted input
    console.log('Submitted Input:', inputValue);
  };

  return (
    <>
    <SafeAreaView>

      <View
        style={{
          backgroundColor: '#1E293A',
          paddingVertical: 12,
          paddingHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <AppText style={{color: 'white'}}>{getTranslation("Sms Reminder","Sms Reminder","Sms Reminder")}</AppText>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CloseIcon />
        </TouchableOpacity>
      </View>

      <View style={{padding: 20}}>
        <AppText>{getTranslation("Reminder Text","Reminder Text","Reminder Text")}</AppText>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => handleButtonPress('CR-Name')}>
            <AppText>{getTranslation("Name","Name","Name")}</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttons}
            onPress={() => handleButtonPress('CR-Email')}>
            <AppText>{getTranslation("Emial","Emial","Emial")}</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttons}
            onPress={() => handleButtonPress('CR-DueAmount')}>
            <AppText>{getTranslation("Due Amount","Due Amount","Due Amount")}</AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => handleButtonPress('CR-Apartment')}>
            <AppText>{getTranslation("Apartment","Apartment","Apartment")}</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttons}
            onPress={() => handleButtonPress('CR-DueDate')}>
            <AppText>{getTranslation("Due Date","Due Date","Due Date")}</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttons}
            onPress={() => handleButtonPress('CR-Referenece')}>
            <AppText>{getTranslation("Reference","Reference","Reference")}</AppText>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          multiline
          numberOfLines={6}
          value={inputValue}
          onChangeText={setInputValue}
          textAlignVertical="top"
        />

        {loading && <ActivityIndicator size="large" />}

        {inputError && (
          <Text style={{paddingTop: 10, textAlign: 'center', color: 'red'}}>
            Message is required
          </Text>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={{color: 'white'}}>{getTranslation("Submit","Submit","Submit")}</Text>
        </TouchableOpacity>

        {error && (
          <Text style={{paddingTop: 10, textAlign: 'center', color: 'red'}}>
            {ErrorMessage}
          </Text>
        )}

        {success && (
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'green',
            }}>
            Reminder Sent
          </Text>
        )}
      </View>
    </SafeAreaView>
    </>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  buttons: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 3,
    padding: 6,
    paddingHorizontal: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#1E293A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
  },
});
