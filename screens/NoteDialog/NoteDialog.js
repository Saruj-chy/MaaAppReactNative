import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NoteTabView from '../NoteTabView/NoteTabView';
import { databaseName } from '../Constant/Constant';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: databaseName });
// var SharedPreferences = require('react-native-shared-preferences');


const NoteDialog = ({ CurrentDate, SetState }) => {


  const [loadData, setLoadData] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM note_lokkon ',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          console.log('table date: ', temp);

        }
      );
    });
  }, []);



  const DeleteTableData = () => {


    // alert('delete')

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
    alert('Submit');

    // SharedPreferences.getItem("key", function (value) {
    //   note = value;
    //   if (note === undefined) {
    //     note = 'hello';
    //     // console.log(note)
    //   }
    //   console.log('LokkonFragmentvalue: ', value, note);
    // });

    // console.log('LokkonFragmentvalue: ', note);

    // db.transaction((tx) => {
    //   tx.executeSql(
    //     'INSERT INTO note_lokkon (id, first, second, third, date, note) VALUES (?,?,?,?,?,?)',
    //     ['id', 'first', 'second', 'third', CurrentDate, 'note'],
    //     (tx, results) => {
    //       console.log('Results', results.rowsAffected);
    //     }
    //   );
    // });







  }





  return (
    <View style={styles.dialogContainer}>
      <Text style={styles.dialogText}>আজ কেমন অনুভব করছেন? </Text>
      <Text style={{ fontSize: 16, color: 'white', marginHorizontal: 15 }}>{CurrentDate.month} {CurrentDate.day}, {CurrentDate.year} </Text>
      <View style={{ backgroundColor: 'white', height: 250 }}>

        <NoteTabView CurrentDateNoteDialog={CurrentDate} />

      </View>

      <View style={{ flexDirection: 'row', paddingVertical: 20, backgroundColor: 'white', borderColor: 'gray', borderTopWidth: 0.3 }} >
        <Text style={{ flex: 2 }}></Text>
        <Text style={{ flex: 1, textAlign: 'center', color: 'green' }} onPress={() => { console.log('hello'); DeleteTableData(); SetState(false); }}> বাতিল </Text>
        <Text style={{ flex: 1, color: 'green' }} onPress={() => { console.log('submit: '); SavedTableData(); }}> সংরক্ষণ </Text>
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