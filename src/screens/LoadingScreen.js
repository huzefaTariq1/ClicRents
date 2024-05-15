import {StyleSheet, Text, View, ActivityIndicator,DevSettings} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation,useRoute} from '@react-navigation/native';

const LoadingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();



  useEffect(() => {
    setTimeout(() => {

 
      navigation.goBack();
    }, 3000);
  }, []);
  return (
    <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
      <ActivityIndicator color="#fb5e39"  style={{transform: [{scale: 2.5}]}} />
      <Text style={{fontSize: 10, fontWeight: 600, paddingTop: 30}}>
        Loading Organization...
      </Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
