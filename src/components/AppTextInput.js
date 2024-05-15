// import React from 'react';
// import { View, TextInput, StyleSheet } from 'react-native';

// function AppTextInput({ icon, style, ...otherProps }) {
//   return (
//     <View style={[styles.container, style]}>
//       <TextInput
//         style={styles.text}
//         textAlignVertical="center"
//         {...otherProps}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     marginVertical: 10,
//     borderColor: '#D2D2D2',
//     borderWidth: 2,
//     height: 40,
//   },
//   text: {
//     fontSize: 15,
//     padding: 10,
//     flex: 1
//   },
// });

// export default AppTextInput;






// import React, { useRef, useState } from 'react';
// import { View, TextInput, StyleSheet, Animated } from 'react-native';

// function AppTextInput({ placeholder, style, ...otherProps }) {
//   const [isFocused, setIsFocused] = useState(false);
//   const translateY = useRef(new Animated.Value(0)).current;

//   const handleFocus = () => {
//     setIsFocused(true);
//     Animated.timing(translateY, {
//       toValue: -25,
//       duration: 200,
//       useNativeDriver: true,
//     }).start();
//   };

//   const handleBlur = () => {
//     setIsFocused(false);
//     Animated.timing(translateY, {
//       toValue: 0,
//       duration: 150,
//       useNativeDriver: true,
//     }).start();
//   };

//   return (
//     <View style={[styles.container, style]}>
//       <Animated.Text
//         style={[
//           styles.placeholder,
//           {
//             transform: [{ translateY }],
//             color: isFocused ? '#3498db' : '#A0A0A0',
//           },
//         ]}
//       >
//         {placeholder}
//       </Animated.Text>
//       <TextInput
//         style={styles.text}
//         textAlignVertical="center"
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         {...otherProps}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     marginVertical: 10,
//     borderColor: '#E0E0E0',
//     borderWidth: 1,
//     height: 50,
//     paddingLeft: 15,
//   },
//   text: {
//     fontSize: 16,
//     padding: 0,
//     flex: 1,
//     color: '#333333',
//   },
//   placeholder: {
//     position: 'absolute',
//     left: 15,
//   },
// });

// export default AppTextInput;







import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';

function AppTextInput({ placeholder, style, ...otherProps }) {
  const [isFocused, setIsFocused] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(translateY, {
      toValue: -25,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.Text
        style={[
          styles.placeholder,
          {
            transform: [{ translateY }],
            color: isFocused ? '#000000' : '#A0A0A0', // Change placeholder color
          },
        ]}
      >
        {placeholder}
      </Animated.Text>
      <TextInput
        style={[styles.text, { color: '#000000' }]} // Change cursor color
        textAlignVertical="center"
        onFocus={handleFocus}
        onBlur={handleBlur}
        selectionColor="#000000" // Change cursor color
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    height: 50,
    paddingLeft: 15,
  },
  text: {
    fontSize: 16,
    padding: 0,
    flex: 1,
  },
  placeholder: {
    position: 'absolute',
    left: 15,
  },
});

export default AppTextInput;

