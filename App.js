import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            title: 'Home', //Set Header Title
            headerStyle: {
              backgroundColor: 'green', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="ojon"
          component={OjonScreen}
          options={{
            title: 'Ojon Screen', //Set Header Title
            headerStyle: {
              backgroundColor: 'blue', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="note"
          component={NoteScreen}
          options={{
            title: 'Note Screen', //Set Header Title
            headerStyle: {
              backgroundColor: 'orange', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="jigasha"
          component={JigashaScreen}
          options={{
            title: 'Jigasha Screen', //Set Header Title
            headerStyle: {
              backgroundColor: 'green', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />

<Stack.Screen
          name="bottom"
          component={BottomViewScreen}
          options={{
            title: 'Bottom View', //Set Header Title
            headerStyle: {
              backgroundColor: 'green', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />

        

      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default App;
