import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigations from './src/navs/navs';
import {Provider} from 'react-redux';
import {store} from './src/store';


const App = ()=> {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar barStyle={'light-content'} />
      <Provider store={store}>
      <NavigationContainer>
        <Navigations/>
      </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
});

export default App;
