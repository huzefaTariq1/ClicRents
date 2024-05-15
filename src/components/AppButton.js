import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

function AppButton({title, onPress}) {
  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#233044',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '30%',
    marginVertical: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default AppButton;
