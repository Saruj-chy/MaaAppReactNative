import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NoteFragment from '../Fragment/NoteFragment';
import LokkonFragment from '../Fragment/LokkonFragment';

import { ColorArray, ColorClickCount, databaseName } from '../Constant/Constant';

import { openDatabase } from 'react-native-sqlite-storage';
var SharedPreferences = require('react-native-shared-preferences');


var db = openDatabase({ name: databaseName });


const Tab = createMaterialTopTabNavigator();



const NoteTabView2 = ({ CurrentDateNoteDialog, SetState }) => {

  // console.log('CurrentDateNoteDialog:  ', CurrentDateNoteDialog);


  const DeleteTableData = () => {

    console.log('delete................');
    // alert('delete')

    SetState(false);

    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  note_lokkon where date=?',
        [CurrentDate.date],
        (tx, results) => {
          console.log('Results', results.rowsAffected);

        }
      );
    });
  }


  const SavedTableData = () => {

    console.log("submit here ");
    var note = ' ';
    // alert('Submit');

    SharedPreferences.getItem("key", function (value) {
      note = value;
      if (note === undefined) {
        note = 'hello';
        // console.log(note)
      }
      console.log('LokkonFragmentvalue: ', value, note);
    });

    console.log('LokkonFragmentvalue: ', note);

    db.transaction((tx) => {
      console.log('LokkonFragmentvalue 1 : ', note);
      tx.executeSql(
        'INSERT INTO note_lokkon (id, first, second, third, date, note) VALUES (?,?,?,?,?,?)',
        ['id', 'first', 'second', 'third', CurrentDate, 'note'],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
        }
      );
    });

  }



  const NoteFragmentScreen = () => {
    const [value, setValue] = useState('Enter Your Note...');
    console.log('value: ', value);
    SharedPreferences.setItem("key", value);

    return (
      <View style={{ flex: 1, justifyContent: 'center', }}>
        {/* <NoteFragment setValue={setValue} /> */}

      </View>
    );
  };
  const LokkonFragmentScreen = () => {
    let [viewColor, setViewColor] = useState(ColorArray);
    let [countClickColor, setCountClickColor] = useState(ColorClickCount);
    // console.log(viewColor);
    return (
      <View >
        {/* <LokkonFragment ViewColor={viewColor} setViewColor={setViewColor} CountClickColor={countClickColor} SetCountClickColor={setCountClickColor} CurrentDateNoteTabView={CurrentDateNoteDialog} /> */}

      </View>
    );
  }

  // console.log(viewColor);

  return (
    <>
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

        <View style={{ flexDirection: 'row', paddingVertical: 20, backgroundColor: 'white', borderColor: 'gray', borderTopWidth: 0.3 }} >
          <Text style={{ flex: 2 }}></Text>
          <Text style={{ flex: 1, textAlign: 'center', color: 'green' }} onPress={DeleteTableData()}> বাতিল </Text>
          <Text style={{ flex: 1, color: 'green' }} onPress={() => { console.log('submit: '); SetState(false); SavedTableData() }}> সংরক্ষণ </Text>
        </View>
      </NavigationContainer>
    </>
  );
}

export default NoteTabView2;