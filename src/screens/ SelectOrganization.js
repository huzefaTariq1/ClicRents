/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AppButton from '../components/AppButton';
import {useSelector} from 'react-redux';
import AppText from '../components/AppText';
import CustumDropDown from '../components/CustumDropDown';
import {getTranslation} from '../helpers/TranslationUtils';

const SelectOrganization = ({navigation, handelOrganization}) => {
  const {token, organization, customerId} = useSelector(state => state.user);

  const [selectedOrganization, setSelctedOrganion] = useState(
    organization[0] || null,
  );

  const [error, setError] = useState(false);

  const handleSelectOrganization = item => {
    setError(false);
    setSelctedOrganion(item);
  };

  const handleStart = () => {
    if (!selectedOrganization) {
      return setError(true);
    }
    handelOrganization(selectedOrganization);
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
      }}>
      <AppText style={styles.heading}>
        {getTranslation(
          'Select Your Organization',
          'Select Your Organization',
          'Select Your Organization',
        )}
      </AppText>

      <View style={{paddingVertical: 10}}>
        <CustumDropDown
          //title="CR-Select Organization"
          label="organizationName"
          values="customerId"
          value={organization[0]} // Set the default value
          data={organization}
          handleSelect={handleSelectOrganization}
        />
      </View>

      {error && (
        <AppText style={{color: 'red', marginBottom: 4}}>
          Organization is required
        </AppText>
      )}

      <AppText style={styles.heading}>
        {getTranslation(
          'You Can Change Your Organization Later',
          'You Can Change Your Organization Later',
          'You Can Change Your Organization Later',
        )}
      </AppText>
      <AppButton
        title={getTranslation('Start', 'Start', 'Start')}
        onPress={() => handleStart()}
      />
    </View>
  );
};

export default SelectOrganization;

const styles = StyleSheet.create({
  heading: {
    fontSize: 12,
    textAlign: 'center',
  },
});
