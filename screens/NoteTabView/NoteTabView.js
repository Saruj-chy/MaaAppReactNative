import React, { useEffect, useState } from 'react';
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

const NoteTabView = ({ CurrentDateNoteDialog, SetState, LokhonTableData }) => {

  let noteValue;

  // useEffect(() => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       'SELECT note_lokhon_table.first, note_lokhon_table.second, note_lokhon_table.third, note_save.note, note_lokhon_table.date FROM note_lokhon_table INNER JOIN note_save ON note_lokhon_table.date = note_save.date',
  //       [],
  //       (tx, results) => {
  //         var temp = [];
  //         for (let i = 0; i < results.rows.length; ++i) {
  //           temp.push(results.rows.item(i));
  //         }
  //         // console.log('note_lokhon_table: ', temp);

  //       }
  //     );
  //   });
  // }, []);


  const DeleteTableData = () => {

    // console.log('delete................');
    // alert('delete')

    SetState(false);

    db.transaction((tx) => {
      // console.log('yes delete done');
      tx.executeSql(
        'DELETE FROM  note_lokkon where date=?',
        [CurrentDateNoteDialog.date],
        (tx, results) => {
          // console.log('Results', results.rowsAffected);

        }
      );
    });
  }


  const SavedTableData = () => {

    SetState(false);


    //=========================================    data saved in note_saved     =========================================
    db.transaction((tx) => {
      // console.log('object')
      tx.executeSql(
        'SELECT * FROM note_save WHERE date=? ',
        [CurrentDateNoteDialog.date],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          console.log('noteValue:  ', noteValue);
          if (noteValue === undefined) {
            noteValue = results.rows.item(i).note;
          }


          if (temp.length > 0) {
            db.transaction(function (tx) {
              tx.executeSql(
                'UPDATE note_save set note=? where date=?',
                [noteValue, CurrentDateNoteDialog.date],
                (tx, results) => {
                  LokhonTableData(CurrentDateNoteDialog.date);
                }
              );
            });
          } else {
            db.transaction((tx) => {
              tx.executeSql(
                'INSERT INTO note_save (date, note) VALUES (?,?)',
                [CurrentDateNoteDialog.date, noteValue],
                (tx, results) => {
                  LokhonTableData(CurrentDateNoteDialog.date);
                }
              );
            });
          };

        }
      );
    });
    //  -------------------------------------------    data saved in note_saved     -----------------------------------------




    //=============================  note_lokkon theke note_lokhon_change_color data pass  ================================


    db.transaction((tx) => {
      tx.executeSql(
        'SELECT DISTINCT id,  first, second, third, count, date FROM note_lokkon WHERE date=?',
        [CurrentDateNoteDialog.date],
        (tx, results) => {
          var temp1 = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp1.push(results.rows.item(i));
            // console.log(results.rows.item(i))
          }


          db.transaction((tx) => {

            tx.executeSql(
              'DELETE FROM  note_lokkon_change_color where date=?',
              [CurrentDateNoteDialog.date],
              (tx, results) => {
                // console.log('Results', results.rowsAffected);
              }
            );
          });


          temp1.map(item => {
            db.transaction(function (tx) {
              tx.executeSql(
                'INSERT INTO note_lokkon_change_color (id, first, second, third, count, date) VALUES (?,?,?,?,?,?)',
                [item.id, item.first, item.second, item.third, item.count, CurrentDateNoteDialog.date],
                (tx, results) => {
                  // console.log('Results insert note_lokkon_change_color ', results.rowsAffected);

                }
              );
            });


          });

        }
      );
    });

    //------------------------------          note_lokkon theke note_lokhon_change_color data pass   --------------------------





    //========================    note_lokkon   theke    note_lokhon_table e data pass ==========================

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT DISTINCT id, first, second, third, count, date FROM note_lokkon WHERE date=? AND first!="gray" ',
        [CurrentDateNoteDialog.date],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            // console.log(results.rows.item(i))
          }
          // console.log('note lokkon array: ::::::::: ', temp);

          //============= delete data
          db.transaction((tx) => {
            // console.log('yes delete done');
            tx.executeSql(
              'DELETE FROM  note_lokkon where date=?',
              [CurrentDateNoteDialog.date],
              (tx, results) => {
                // console.log('Results   note_lokkon', results.rowsAffected);



              }
            );
          });

          //==================================  delete note_lokhon_table   =================================
          db.transaction((tx) => {
            // console.log('yes delete done');
            tx.executeSql(
              'DELETE FROM  note_lokhon_table where date=?',
              [CurrentDateNoteDialog.date],
              (tx, results) => {
                // console.log('Results', results.rowsAffected);
              }
            );
          });
          //   -----------------------------------  delete note_lokhon_table   -------------------------------



          temp.map(item => {
            db.transaction(function (tx) {
              // console.log('...........', item.id, item.first, item.second, item.third, CurrentDateNoteDialog.date);
              tx.executeSql(
                'INSERT INTO note_lokhon_table (id, first, second, third, count, date) VALUES (?,?,?,?,?,?)',
                [item.id, item.first, item.second, item.third, item.count, CurrentDateNoteDialog.date],
                (tx, results) => {
                  // console.log('Results  note_lokhon_table ', results.rowsAffected);
                  LokhonTableData(CurrentDateNoteDialog.date);
                }
              );
            });
          });
          //------------------------  insert data in note lokhon table ------------------------------
        }
      );
    });
    //----------------------   note_lokkon theke note_lokhon_table e data pass -----------------------------------



  }



  const NoteFragmentScreen = () => {

    const SavedValue = text => {
      // setTabValue(text);
      noteValue = text;
      // console.log('SavedValue', text)
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', }}>
        <NoteFragment SavedValue={SavedValue} CurrentDateNoteDialog={CurrentDateNoteDialog} />

      </View>
    );
  };
  const LokkonFragmentScreen = () => {
    let [viewColor, setViewColor] = useState(ColorArray);
    let [countClickColor, setCountClickColor] = useState(ColorClickCount);

    return (
      <View >
        <LokkonFragment ViewColor={viewColor} setViewColor={setViewColor} CountClickColor={countClickColor} SetCountClickColor={setCountClickColor} CurrentDateNoteTabView={CurrentDateNoteDialog} />

      </View>
    );
  }

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
          <Text style={{ flex: 1, textAlign: 'center', color: 'green' }} onPress={() => { DeleteTableData(); }}> বাতিল </Text>
          <Text style={{ flex: 1, color: 'green' }} onPress={() => { SavedTableData() }}> সংরক্ষণ </Text>
        </View>
      </NavigationContainer>
    </>
  );
}

export default NoteTabView;