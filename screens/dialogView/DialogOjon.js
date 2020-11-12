import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { AllLokkonName, databaseName, ojonSavedValue } from '../Constant/Constant';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: databaseName });
var SharedPreferences = require('react-native-shared-preferences');


const DialogOjon = ({ SetState, AddWomenOjon }) => {

  const [kilogram, setKilogram] = useState('');
  const [weekNumber, setWeekNumber] = useState('');

  //======================     ojon table load for show week number   ==================
  // useEffect(() => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       'SELECT * FROM ojon_table ',
  //       [],
  //       (tx, results) => {
  //         let weekNumber = results.rows.item(results.rows.length - 1).id;
  //         console.log('  weekNumber  :  ', weekNumber - 1);
  //         setWeekNumber(weekNumber - 1);
  //       }
  //     );
  //   });
  // }, []);
  //   -----------------------------------------     ojon table load for show week number   ---------------------------------------------

  SharedPreferences.getItem("week", function (value) {
    console.log('week:  ', value);
    setWeekNumber(value);
  });

  const SavedValueDialogOjon = (kilogram) => {
    AddWomenOjon(kilogram);
    SetState(false);
  }

  return (
    <View style={styles.dialogContainer}>
      <Text style={styles.dialogText}>আপনার ওজন দিন </Text>
      <View style={{ backgroundColor: 'white' }}>



        <View >
          <Text style={{
            textAlign: 'center', color: 'black', fontSize: 15, borderBottomWidth: 0, shadowColor: 'black', shadowOpacity: 0.4, elevation: 1, padding: 5
          }}> সপ্তাহ নংঃ {weekNumber}</Text>
          {/* <View style={{ height: 0.5, backgroundColor: 'gray' }}></View> */}
          <TextInput
            style={{ textAlign: 'center', shadowColor: 'black', shadowOpacity: 1, elevation: 1, margin: 20, }}
            placeholder="Enter your weight"
            keyboardType="numeric"
            onChangeText={text => setKilogram(text)}
          />
        </View>






        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
          <Text style={{ flex: 2 }}></Text>
          <Text style={{ flex: 1, textAlign: 'center', color: '#890e4f' }} onPress={() => SetState(false)} > বাতিল </Text>
          <Text style={{ flex: 1, color: '#890e4f' }}
            onPress={() => { SavedValueDialogOjon(kilogram) }}> সংরক্ষণ </Text>
        </View>

      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: '#890e4f',
    width: 300
  },
  dialogText: {
    color: 'white',
    fontSize: 18,
    marginHorizontal: 20,
    marginVertical: 20,
    textAlign: 'center'
  },
  layoutView: {
    flexDirection: 'row',
    padding: 5
  },
  layoutName: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15
  },
  inputStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    textAlign: 'center',
    fontSize: 15
  },
  itemText: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 20,
    marginLeft: 20
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 15
  },


})

export default DialogOjon;