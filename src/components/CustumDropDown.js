// import React, {useState} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import {Dropdown} from 'react-native-element-dropdown';
// import {Down} from './Icons';

// const CustumDropDown = ({title, label, value, values, data, handleSelect}) => {
//   const [isFocus, setIsFocus] = useState(false);

//   const renderLabel = () => {
//     if (value || isFocus) {
//       return (
//         <Text style={[styles.label, isFocus && {color: 'blue'}]}>{title}</Text>
//       );
//     }
//     return null;
//   };

//   return (
//     <View style={styles.container}>
//       {renderLabel()}
//       <Dropdown
//         style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         inputSearchStyle={styles.inputSearchStyle}
//         iconStyle={styles.iconStyle}
//         data={data}
//         search
//         maxHeight={300}
//         labelField={label}
//         valueField={values}
//         placeholder={!isFocus ? `Select ${title}` : '...'}
//         searchPlaceholder="Search..."
//         value={value}
//         onFocus={() => setIsFocus(true)}
//         onBlur={() => setIsFocus(false)}
//         onChange={item => {
//           handleSelect(item);
//           // setValue(item.id);
//           setIsFocus(false);
//         }}
//       />
//     </View>
//   );
// };

// export default CustumDropDown;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     //padding: 16,
//     // paddingVertical:16
//     borderRadius: 10,
//   },
//   dropdown: {
//     height: 35,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 8,
//     //paddingHorizontal: 8,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   label: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     left: 22,
//     top: 8,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 11,
//   },
//   placeholderStyle: {
//     fontSize: 11,
//     paddingHorizontal: 10,
//   },
//   selectedTextStyle: {
//     fontSize: 11,
//     paddingHorizontal: 10,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 11,
//   },
// });







// final working one
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Down} from './Icons';

const CustumDropDown = ({title, label, value, values, data, handleSelect}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: '#FB5E39'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField={label}
        valueField={values}
        placeholder={!isFocus ? `Select ${title}` : '...'}
        searchPlaceholder="Search..."
        value={value} // Use the provided value prop
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          handleSelect(item);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default CustumDropDown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  dropdown: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 10,
    top: -8,
    paddingHorizontal: 8,
    fontSize: 11,
    zIndex: 1,
  },
  placeholderStyle: {
    fontSize: 11,
    paddingHorizontal: 8,
  },
  selectedTextStyle: {
    fontSize: 11,
    paddingHorizontal: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 11,
  },
});


































// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Image } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';

// const CustomDropDownItem = ({ item }) => {
//   const hardcodedImage = require("../../assets/done.png");

//   return (
//     <View style={styles.dropdownItem}>
//       <Text style={styles.ibanText}>{`${item.iban}`}</Text>
//       <View style={styles.hardcodedImageContainer}>
//         <Image source={hardcodedImage} style={styles.hardcodedImage} />
//       </View>
//     </View>
//   );
// };

// const CustumDropDown = ({ title, label, value, values, data, handleSelect }) => {
//   const [isFocus, setIsFocus] = useState(false);

//   return (
//     <View style={styles.container}>
//       <Dropdown
//         style={[styles.dropdown, isFocus && { borderColor: '#FB5E39' }]}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         inputSearchStyle={styles.inputSearchStyle}
//         iconStyle={styles.iconStyle}
//         data={data}
//         search
//         maxHeight={300}
//         labelField={label}
//         valueField={values}
//         placeholder={!isFocus ? `Select ${title}` : '...'}
//         searchPlaceholder="Search..."
//         value={value} // Use the provided value prop
//         onFocus={() => setIsFocus(true)}
//         onBlur={() => setIsFocus(false)}
//         renderItem={(item) => <CustomDropDownItem item={item} />}
//         onChange={item => {
//           handleSelect(item);
//           setIsFocus(false);
//         }}
//       />
//     </View>
//   );
// };

// export default CustumDropDown;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//   },
//   dropdown: {
//     height: 35,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 8,
//   },
//   placeholderStyle: {
//     fontSize: 11,
//     paddingHorizontal: 8,
//   },
//   selectedTextStyle: {
//     fontSize: 11,
//     paddingHorizontal: 8,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 11,
//   },
//   dropdownItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   ibanText: {
//     flex: 1,
//     fontSize: 12,
//   },
//   hardcodedImageContainer: {
//     width: 24,
//     height: 24,
//     backgroundColor: 'gray',
//     marginRight: 8,
//   },
//   hardcodedImage: {
//     width: '100%',
//     height: '100%',
//   },
// });




































































