import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Card = ({children}) => {
  return <View style={styles.mainCard}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  mainCard: {
    paddingVertical: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 7,
    marginBottom: 15,
    elevation: 3,
  },
});
