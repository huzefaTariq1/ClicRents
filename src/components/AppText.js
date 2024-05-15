import React from 'react';
import {Text, StyleSheet} from 'react-native';

function AppText({children, style}) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

export default AppText;

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    color: 'black',
  },
});
