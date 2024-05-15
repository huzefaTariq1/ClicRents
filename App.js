// import React from 'react';
// import {Provider} from 'react-redux';
// //import store from './store';
// import {store} from './src/Redux/store';
// import Navigation from './Navigation';
// import {NavigationContainer} from '@react-navigation/native';
// import AuthNavigator from './src/navigations/AuthNavigator';
// import DrawerNavigator from './src/navigations/DrawerNavigator';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Navigation />
//       </NavigationContainer>
//     </Provider>
//   );
// };

// export default App;

// <Navigation />

// <AuthNavigator/>

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/Redux/store';
import Navigation from './Navigation';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigations/AuthNavigator';
import DrawerNavigator from './src/navigations/DrawerNavigator';
import NetInfo from "@react-native-community/netinfo";
import { Alert } from 'react-native';

const App = () => {
  const [isInternetConnected, setIsInternetConnected] = useState(true);

  useEffect(() => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsInternetConnected(state.isConnected);
    });

    // Unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isInternetConnected) {
      // Internet is not connected, show an alert
      Alert.alert(
        "No Internet Connection",
        "Please connect your mobile to the internet and try again.",
        [
          { text: "OK", onPress: () => {} }
        ],
        { cancelable: false }
      );
    }
  }, [isInternetConnected]);

  return (
    <Provider store={store}>
      {isInternetConnected ? (
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      ) : null}
    </Provider>
  );
};

export default App;
