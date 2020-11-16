import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { NativeRouter, Route } from 'react-router-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import DialogView from './screens/dialogView/DialogView';
import JigashaScreen from './screens/Jigasha/JigashaScreen';
import OjonScreen from './screens/OjonScreen/OjonScreen';
import PickerShow from './screens/dialogView/PickerShow'
import NoteScreen from './screens/NoteScreen/NoteScreen';
import Testing from './screens/Test/Testing';
import NoteTabView from './screens/NoteTabView/NoteTabView';
import BottomViewScreen from './screens/BottomView/BottomViewScreen';
import Home from './screens/Home/Home';


const Stack = createStackNavigator();



const App = () => {

  return (
    <NativeRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/ojon" component={OjonScreen} />
      <Route exact path="/note" component={NoteScreen} />
      <Route exact path="/jigasha" component={JigashaScreen} />
      <Route exact path="/bottom" component={BottomViewScreen} />

    </NativeRouter>
  )
}


export default App;
