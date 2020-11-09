import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import Dialog from 'react-native-popup-dialog';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalenderPicker from '../DatePicker/CalenderPicker';
import NativeCalender from '../DatePicker/NativeCalender';
import NoteLokkonDetails from '../NoteLokkonDetails/NoteLokkonDetails';
import NoteDialog from '../NoteDialog/NoteDialog';
import { databaseName, ColorArray, AllLokkonName, ColorClickCount } from '../Constant/Constant';

import { YellowBox } from 'react-native';
import _ from 'lodash';

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: databaseName });


const NoteScreen = () => {
  const [state, setState] = useState(false);
  const [currentDate, setCurrentDate] = useState({ date: '', month: '', day: '', year: '' });
  const [lokkonData, setLokkonData] = useState([]);
  //=====  data for show
  const [noteLokkonData, setNoteLokkonData] = useState([]);
  const [noteView, setNoteView] = useState({ note: '', date: '' });

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  //===================   from App App   create table in db   ==================================
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='note_lokkon'",
        [],
        function (tx, res) {
          // console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS note_lokkon', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS note_lokkon(note_id INTEGER PRIMARY KEY AUTOINCREMENT, id INT(10),  first VARCHAR(20), second VARCHAR(20), third VARCHAR(20),count INT(50), date VARCHAR(20), note VARCHAR(1000))',
              []
            );
          }
        }
      );
    });
  }, []);

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='note_lokhon_table'",
        [],
        function (tx, res) {
          // console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS note_lokhon_table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS note_lokhon_table(note_id INTEGER PRIMARY KEY AUTOINCREMENT, id INT(10),  first VARCHAR(20), second VARCHAR(20), third VARCHAR(20), count INT(50), date VARCHAR(20), note VARCHAR(1000))',
              []
            );
          }
        }
      );
    });
  }, []);

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='note_lokkon_change_color'",
        [],
        function (tx, res) {
          // console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS note_lokkon_change_color', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS note_lokkon_change_color(note_id INTEGER PRIMARY KEY AUTOINCREMENT, id INT(10),  first VARCHAR(20), second VARCHAR(20), third VARCHAR(20), count INT(50), date VARCHAR(20), note VARCHAR(1000))',
              []
            );
          }
        }
      );
    });
  }, []);

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='note_save'",
        [],
        function (tx, res) {
          // console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS note_save', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS note_save(id INTEGER PRIMARY KEY AUTOINCREMENT, date VARCHAR(20), note VARCHAR(1000))',
              []
            );
          }
        }
      );
    });
  }, []);
  //---------------------------------              from App App   create table in db           -----------------------------



  //==============   data load when NoteScreen Start   ========================
  useEffect(() => {
    const todayDate = new Date();
    const dateOf = todayDate.getDate() + "-" + parseInt(todayDate.getMonth() + 1) + "-" + todayDate.getFullYear();
    console.log('dateOf:   ', dateOf);


    db.transaction((tx) => {
      //==================    lokkon details
      tx.executeSql(
        'SELECT * FROM note_lokhon_table WHERE date = ? ',
        [dateOf],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            let uposorgo;
            switch (results.rows.item(i).first) {
              case 'blue':
                uposorgo = 'কম';
                break;
              case 'yellow':
                uposorgo = 'মাঝারী';
                break;
              case 'red':
                uposorgo = 'বেশি';
                break;
              default:
                break;

            }
            temp.push({ id: results.rows.item(i).id, first: uposorgo, name: AllLokkonName[results.rows.item(i).id].name });
            // console.log('first :', results.rows.item(i).first, 'name :', AllLokkonName[results.rows.item(i).id].name)


          }
          console.log('object  length also    ', temp)
          setNoteLokkonData(temp);

        }
      );


      //==============  note  =================
      tx.executeSql(
        'SELECT * FROM note_save WHERE date = ? ',
        [dateOf],
        (tx, results) => {
          let resultCode = results.rows.length;
          if (resultCode > 0) {
            const resultNote = results.rows.item(0).note;
            if (resultNote === '') {
              setNoteView({ note: 'কোন নোট পাওয়া যায় নি ', date: dateOf });
            } else {
              setNoteView({ note: results.rows.item(0).note, date: dateOf });
            }
          }
          else {
            setNoteView({ note: 'কোন নোট পাওয়া যায় নি ', date: dateOf });
          }

        }
      );

    });
  }, []);
  //  ------------------------   data load when NoteScreen Start   ----------------------------------



  //==============  data load from(note_lokkon_table, note_save) from (first, second, third, date, note)  ======================

  const lokhonTableData = date => {
    db.transaction((tx) => {

      //==============  note  =================
      tx.executeSql(
        'SELECT * FROM note_save WHERE date = ? ',
        [date],
        (tx, results) => {
          console.log('results:  ', results.rows.length);
          let resultCode = results.rows.length;
          if (resultCode > 0) {
            const resultNote = results.rows.item(0).note;
            if (resultNote === '') {
              setNoteView({ note: 'কোন নোট পাওয়া যায় নি ', date: date });
            } else {
              setNoteView({ note: results.rows.item(0).note, date: date });
            }
          }
          else {
            setNoteView({ note: 'কোন নোট পাওয়া যায় নি ', date: date });
          }

        }
      );

      //====================   table date in lokkon

      tx.executeSql(
        'SELECT * FROM note_lokhon_table WHERE date = ? ',
        [date],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            let uposorgo;
            switch (results.rows.item(i).first) {
              case 'blue':
                uposorgo = 'কম';
                break;
              case 'yellow':
                uposorgo = 'মাঝারী';
                break;
              case 'red':
                uposorgo = 'বেশি';
                break;
              default:
                break;

            }
            temp.push({ id: results.rows.item(i).id, first: uposorgo, name: AllLokkonName[results.rows.item(i).id].name });
            // console.log('first :', results.rows.item(i).first, 'name :', AllLokkonName[results.rows.item(i).id].name)


          }
          // console.log('object  length     ', temp)
          setNoteLokkonData(temp);

        }
      );


    });

  }

  //----------------------   data load from(note_lokkon_table, note_save) from (first, second, third, date, note)   ---------------



  //   ========================     data from note_lokkon  for delete note_lokkon table ============================
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
  //   -----------------------------     data from note_lokkon  for delete note_lokkon table    --------------------------






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
          // console.log('...........', item.id, item.first, item.second, item.third, item.count, date);
          tx.executeSql(
            'INSERT INTO note_lokkon (id, first, second, third, count, date) VALUES (?,?,?,?,?,?)',
            [item.id, item.first, item.second, item.third, item.count, date],
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
        <NativeCalender LokhonTableData={lokhonTableData} />
        <NoteLokkonDetails NoteLokkonData={noteLokkonData} NoteView={noteView} DialogPressable={dialogPressable} />

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