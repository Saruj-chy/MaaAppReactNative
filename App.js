import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import DialogView from './screens/dialogView/DialogView';
import JigashaScreen from './screens/Jigasha/JigashaScreen';
import OjonScreen from './screens/OjonScreen/OjonScreen';
import PickerShow from './screens/dialogView/PickerShow'
import NoteScreen from './screens/NoteScreen/NoteScreen';
import Testing from './screens/Test/Testing';
import NoteTabView from './screens/NoteTabView/NoteTabView';
import { openDatabase } from 'react-native-sqlite-storage';
import Register from './screens/Register/Register';
import { databaseName } from './screens/Constant/Constant';



var db = openDatabase({ name: databaseName });


const App = () => {

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='note_lokkon'",
        [],
        function (tx, res) {
          // console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS note_lokkon(note_id INTEGER PRIMARY KEY AUTOINCREMENT, id INT(10),  first VARCHAR(20), second VARCHAR(20), third VARCHAR(20), date VARCHAR(20), note VARCHAR(1000))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <View>

      {/* <JigashaScreen /> */}

      {/* <OjonScreen /> */}


      <NoteScreen />

      {/* <Testing /> */}
      {/* 
      <NoteTabView /> */}

      {/* <Register /> */}



    </View>
  )
}


export default App;
