import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';

const LoadingSpinner = () => {
  return (
    <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
      <ActivityIndicator color="#fb5e39"  style={{transform: [{scale: 2.5}]}} />
      <Text style={{fontSize: 10, fontWeight: 600, paddingTop: 30}}>
        Loading....
      </Text>
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({});
