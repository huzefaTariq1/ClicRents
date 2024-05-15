
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { RightArrowIcon } from './Icons';

const CustomDropDownItem = ({ item }) => {
  const hardcodedImage = require("../../assets/ponto1.png");
  const hardcodedImage1 = require("../../assets/ponto.png");
  console.log("item",item)

  return (
    <View style={styles.dropdownItem}>
      <Text style={styles.ibanText}>{`${item.iban} - ${item?.pontoStatus}`}</Text>
      <RightArrowIcon/>
      <View style={styles.hardcodedImageContainer}>
        <Image source={item.pontoStatus ? hardcodedImage: hardcodedImage1} style={styles.hardcodedImage} />
      </View>
    </View>
  );
};

const CustumDropDownWithImage = ({ title, label, value, values, data, handleSelect }) => {
  const [isFocus, setIsFocus] = useState(false);


  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: '#FB5E39' }]}
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
        renderItem={(item) => <CustomDropDownItem item={item} />}
        onChange={item => {
          handleSelect(item);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default CustumDropDownWithImage;

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
  placeholderStyle: {
    fontSize: 11,
    paddingHorizontal: 8,
  },
  selectedTextStyle: {
    fontSize: 14,
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
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:10
  },
  ibanText: {
  //  flex: 1,
    fontSize: 16,
    paddingVertical:10,
    paddingRight:5
    
  },
  hardcodedImageContainer: {
    width: 24,
    height: 24,
   // backgroundColor: 'gray',
    marginRight: 8,
    flexDirection:"row"
  },
  hardcodedImage: {
    width: '100%',
    height: '100%',
  },
});



