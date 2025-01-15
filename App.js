import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Header from './src/components/Header';
import AppNavigation from './src/navigation/AppNavigation';

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
        <View style={styles.container}>
              <Header/>
              <AppNavigation/>   
        </View>
    </NavigationContainer>
    </Provider>
  );
}
const styles = StyleSheet.create({
      container:{
        flex:1,
      }
})
