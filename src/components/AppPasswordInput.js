import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { EyeClose, Menuicon } from './Icons';
import { EyeOpen } from './Icons';
function AppPasswordInput({ icon, style, ...otherProps }) {

  const [secure, setSecure] = useState(true)

  return (
    <View style={[styles.container, style]}>
      <TextInput
        secureTextEntry={secure}
        style={styles.text}
        textAlignVertical="center"
        {...otherProps}
      />

      {secure &&
        <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => setSecure(false)}>
          <EyeOpen />
        </TouchableOpacity>
      }

      {!secure &&
        <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => setSecure(true)}>
          <EyeClose />
        </TouchableOpacity>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    width: '100%',
    marginVertical: 10,
    borderColor: '#D2D2D2',
    borderWidth: 2,
    height: 40,
  },
  text: {
    fontSize: 15,
    padding: 10,
    flex: 1
  },
});

export default AppPasswordInput;
