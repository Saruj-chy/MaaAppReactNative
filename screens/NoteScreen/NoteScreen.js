import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import Dialog from 'react-native-popup-dialog';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalenderPicker from '../DatePicker/CalenderPicker';
import NativeCalender from '../DatePicker/NativeCalender';
import NoteLokkonDetails from '../NoteLokkonDetails/NoteLokkonDetails';
import NoteDialog from '../NoteDialog/NoteDialog';
import { databaseName, ColorArray } from '../Constant/Constant';

import { YellowBox } from 'react-native';
import _ from 'lodash';

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: databaseName });


const NoteScreen = () => {
  const [state, setState] = useState(false);
  const [currentDate, setCurrentDate] = useState({ date: '', month: '', day: '', year: '' });
  const [lokkonData, setLokkonData] = useState([]);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM note_lokkon ',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            // console.log(results.rows.item(i))
          }
          // console.log('object      ', temp.length)
          setLokkonData(temp);

        }
      );
    });
  }, []);



  const dialogPressable = position => {
    if (position === 1) {
      setState(true);
      const today = new Date();
      const date = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();


      const currenCalenderDate = {
        date: date,
        month: monthNames[parseInt(today.getMonth())],
        day: today.getDate(),
        year: today.getFullYear()
      };
      setCurrentDate(currenCalenderDate);

      //=============================  data save in note lokkon from note_lokhon_table  ==================
      if (lokkonData > 0) {
        db.transaction((tx) => {
          // console.log('yes delete done');
          tx.executeSql(
            'DELETE FROM  note_lokkon where date=?',
            [date],
            (tx, results) => {
              // console.log('Results', results.rowsAffected);

            }
          );
        });
      }
      ColorArray.map(item => {

        db.transaction(function (tx) {
          // console.log('...........', item.id, item.first, item.second, item.third, date);
          tx.executeSql(
            'INSERT INTO note_lokkon (id, first, second, third, date) VALUES (?,?,?,?,?)',
            [item.id, item.first, item.second, item.third, date],
            (tx, results) => {
              // console.log('Results  note_lokkon ', results.rowsAffected);

            }
          );
        });


      });

    }
  }


  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={styles.appbarView}>
        <Text style={styles.appbarText}> নোট  </Text>
        <Button title="click" color="#ad1457" onPress={() => dialogPressable(1)} />

      </View>
      {/* <CalenderPicker /> */}


      <ScrollView>
        <NativeCalender />
        <NoteLokkonDetails />

      </ScrollView>
      <Dialog
        visible={state}
        onTouchOutside={() => setState(false)}

      >
        <NoteDialog CurrentDate={currentDate} SetState={setState} />
      </Dialog>


    </View>
  );
};



const styles = StyleSheet.create({
  appbarView: {
    backgroundColor: '#ad1457',
    flexDirection: 'row'
  },
  appbarText: {
    color: 'white',
    fontSize: 18,
    padding: 10,
    paddingLeft: 50,
    flex: 1,
  },


})

export default NoteScreen;