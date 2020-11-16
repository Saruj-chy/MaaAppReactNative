import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NoteTabView from '../NoteTabView/NoteTabView';
import { databaseName } from '../Constant/Constant';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: databaseName });
var SharedPreferences = require('react-native-shared-preferences');


const NoteDialog = ({ CurrentDate, SetState, LokhonTableData }) => {

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM note_lokkon_change_color ',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }



        }
      );
    });
  }, []);

  return (
    <View style={styles.dialogContainer}>
      <Text style={styles.dialogText}>আজ কেমন অনুভব করছেন? </Text>
      <Text style={{ fontSize: 16, color: 'white', marginHorizontal: 15 }}>{CurrentDate.month} {CurrentDate.day}, {CurrentDate.year} </Text>
      <View style={{ backgroundColor: 'white', height: 350 }}>

        <NoteTabView CurrentDateNoteDialog={CurrentDate} SetState={SetState} LokhonTableData={LokhonTableData} />

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: '#ad1457',
    width: 300
  },

  dialogText: {
    color: 'white',
    fontSize: 16,
    marginHorizontal: 15,
    marginVertical: 10,
    fontWeight: 'bold',
    // textAlign: 'center'
  },



})

export default NoteDialog;