import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

const MYDropDown = ({
  placeholder,
  id,
  data,
  handleSelectedItemChange,
  disabled,
  select,
  defaultValue,
}) => {
  //const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const defaultItem = data.find(item => item.name === defaultValue);
  //   console.log("inilde useeffect",defaultItem)
  // }, [defaultValue, data, handleSelectedItemChange]);

  const handleDropDownClick = () => {
    if (!disabled) {
      setClicked(!clicked);
    }
  };

  const handleItemSelect = (item, fullitem) => {
    setSelectedItem(item);
    setClicked(false);
    handleSelectedItemChange(fullitem);
  };

  // const handleDropDownClick = () => {
  //   if (!disabled) {
  //     setClicked(!clicked);
  //   }
  // };

  // const handleItemSelect = (item,fullitem) => {
  //   setSelectedItem(item);
  //   setClicked(false);
  //   handleSelectedItemChange(fullitem);
  // };

  return (
    <View style={{paddingVertical: 10}}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={handleDropDownClick}>
        <View style={styles.selectedItemContainer}>
          <Text style={styles.selectedItemText}>
            {selectedItem ? selectedItem : placeholder}
          </Text>
        </View>
        {clicked ? <Text>▲</Text> : <Text>▼</Text>}
      </TouchableOpacity>

      {clicked && (
        <View style={styles.dropdownListContainer}>
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : (
            <FlatList
              data={data}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleItemSelect(item[id], item)}>
                  <Text>{item[id]}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item[id]}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  selectedItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedItemText: {
    fontWeight: '600',
  },
  dropdownListContainer: {
    height: 200,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    marginTop: 10,
  },
  dropdownItem: {
    width: '85%',
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'black',
  },
});

export default MYDropDown;
