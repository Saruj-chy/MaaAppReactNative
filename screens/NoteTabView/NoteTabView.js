import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NoteFragment from '../Fragment/NoteFragment';
import LokkonFragment from '../Fragment/LokkonFragment';


const Tab = createMaterialTopTabNavigator();



const NoteTabView = () => {

  function NoteFragmentScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', }}>
        <NoteFragment />
      </View>
    );
  }
  function LokkonFragmentScreen() {
    return (
      <View >
        <LokkonFragment />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          tabStyle: { width: 80, color: 'red', },
          activeTintColor: 'white',
          style: { backgroundColor: '#ad1457', },
          tabBarIcon: { focused: true, color: 'red' },

          // labelStyle: { fontSize: 15 },
          // pressColor: 'red',

        }}
      >
        <Tab.Screen name="নোট" component={NoteFragmentScreen} />
        <Tab.Screen name="লক্ষণ" component={LokkonFragmentScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default NoteTabView;