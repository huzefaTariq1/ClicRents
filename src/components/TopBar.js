// import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// import React, {useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Mci from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Menu} from './Icons';
// import {Menuicon} from './Icons';
// import CustomButtonLogout from './CustomButtonLogout';

// const TopBar = ({route}) => {
//   const navigation = useNavigation();
//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   const handlePress = () => {
//     setDropdownVisible(!dropdownVisible);
//   };

//   const handleLogout = () => {
//     setDropdownVisible(false);
//   };

//   return (
//     <View style={{backgroundColor: '#F4F6F8'}}>
//       <View style={styles.topBar}>
//         <TouchableOpacity onPress={() => navigation.openDrawer()}>
//           <Menuicon />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={handlePress}>
//           <Text style={styles.buttonText}>+</Text>
//         </TouchableOpacity>
//         {dropdownVisible && (
//           <View style={styles.dropdown}>
//             <TouchableOpacity
//               style={styles.logoutButton}
//               onPress={handleLogout}>
//               <Text style={styles.logoutButtonText}>Logout</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       <View style={{paddingHorizontal: 10}}>
//         <View style={styles.card}>
//           <Text style={styles.text}>{route}</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default TopBar;

// const styles = StyleSheet.create({
//   container: {
//     position: 'relative',
//   },
//   button: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'blue',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 24,
//   },
//   dropdown: {
//     zIndex:3,
//     position: 'absolute',
//     top: 60,
//     right: 10,
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 5,
//     elevation: 2,
//   },
//   logoutButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//   },
//   logoutButtonText: {
//     fontSize: 16,
//     color: 'blue',
//   },

//   avatar: {
//     height: 50,
//     width: 50,
//     borderRadius: 25,
//     backgroundColor: '#233044',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   avatarText: {
//     color: 'white',
//   },
//   card: {
//     backgroundColor: '#1E293A',
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   bigCard: {
//     backgroundColor: '#1E293A',
//     paddingVertical: 55,
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   text: {
//     color: '#FFFFFF',
//     paddingLeft: 10,
//     fontSize: 13,
//   },
//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 5,
//     backgroundColor: 'white',
//     padding: 10,
//     elevation: 4,
//   },
//   mainCard: {
//     backgroundColor: 'white',
//     paddingHorizontal: 10,
//     marginHorizontal: 10,
//     borderRadius: 7,
//   },
// });

// // <View style={styles.avatar}>
// // <Text style={styles.avatarText}>SS</Text>
// // </View>

import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Menuicon} from './Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

const TopBar = ({route}) => {
  const navigation = useNavigation();
  const {token, userData} = useSelector(state => state.user);

  const {firstName, lastName} = userData;
  const firstLetterOfFirstName = firstName ? firstName.charAt(0) : '';
  const firstLetterOfLastName = lastName ? lastName.charAt(0) : '';

  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handlePress = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      setDropdownVisible(false);
      await AsyncStorage.removeItem('accessToken');
      dispatch({type: 'setToken', payload: ''});
      // navigation.navigate("LoginForm")
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <SafeAreaView>

    <View style={{backgroundColor: '#F4F6F8'}}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Menuicon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text
            style={
              styles.buttonText
            }>{`${firstLetterOfFirstName} ${firstLetterOfLastName}`}</Text>
        </TouchableOpacity>
      </View>

      <View style={{paddingHorizontal: 10}}>
        <View style={styles.card}>
          <Text style={styles.text}>{route}</Text>
        </View>
      </View>

      {dropdownVisible && (
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={handleLogout}>
          <View style={styles.dropdown}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
    </SafeAreaView>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    backgroundColor: 'white',
    padding: 10,
    elevation: 4,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1E293A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
  },
  card: {
    backgroundColor: '#1E293A',
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  text: {
    color: '#FFFFFF',
    paddingLeft: 10,
    fontSize: 13,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 60,
    right: 10,
    zIndex: 1,
    height: 100,
    width: 100,
  },
  dropdown: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  logoutButtonText: {
    fontSize: 16,
  },
});
