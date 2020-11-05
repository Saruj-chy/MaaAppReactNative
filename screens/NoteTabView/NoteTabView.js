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



const NoteTabView = ({ CurrentDateNoteDialog, SetState }) => {

  const [allColor, setAllColor] = useState(ColorArray);

  let noteValue;

  // console.log('CurrentDateNoteDialog:  ', CurrentDateNoteDialog);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT note_lokhon_table.first, note_lokhon_table.second, note_lokhon_table.third, note_save.note, note_lokhon_table.date FROM note_lokhon_table INNER JOIN note_save ON note_lokhon_table.date = note_save.date',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          // console.log('note_lokhon_table: ', temp);

        }
      );
    });
  }, []);



  const dataLoad = () => {
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
          // console.log('temp date note_lokkon: ', temp);

          // setFlatListItems(temp);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM count_table_previous ',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            // console.log(results.rows.item(i))
          }
          // console.log('temp date count_table_previous: ', temp);

          // setFlatListItems(temp);
        }
      );
    });


  }

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
          // console.log('note_save data: ', temp);


          if (temp.length > 0) {
            db.transaction(function (tx) {
              tx.executeSql(
                'UPDATE note_save set note=? where date=?',
                [noteValue, CurrentDateNoteDialog.date],
                (tx, results) => {
                  // console.log('Results', results.rowsAffected);
                }
              );
            });
          } else {
            db.transaction((tx) => {
              // console.log('LokkonFragmentvalue 1 : ', note);
              tx.executeSql(
                'INSERT INTO note_save (date, note) VALUES (?,?)',
                [CurrentDateNoteDialog.date, noteValue],
                (tx, results) => {
                  // console.log('Results', results.rowsAffected);
                }
              );
            });
          };
          // console.log('Saved Table TabView: ', temp);

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
          // console.log(' note_lokkon data : ----------', temp1.length)
          // console.log(' note_lokkon data : ----------', temp1)
          // console.log('data : ----------', temp1)

          db.transaction((tx) => {

            tx.executeSql(
              'DELETE FROM  note_lokkon_change_color where date=?',
              [CurrentDateNoteDialog.date],
              (tx, results) => {
                // console.log('Results', results.rowsAffected);

                // console.log('yes delete done note_lokkon_change_color');
              }
            );
          });


          // console.log('object  note_lokkon :  ', temp1.length)
          temp1.map(item => {
            // console.log('object  note_lokkon_change_color :  ', temp1.length)
            db.transaction(function (tx) {
              // console.log('...........', item.id, item.first, item.second, item.third, date);
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





    //========================    not_lokkon   theke    note_lokhon_table e data pass ==========================

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
                console.log('Results   note_lokkon', results.rowsAffected);

                // allColor.map(item => {
                //   db.transaction(function (tx) {
                //     console.log('...........', item.id, item.first, item.second, item.third, CurrentDateNoteDialog.date);
                //     tx.executeSql(
                //       'INSERT INTO note_lokkon (id, first, second, third, date) VALUES (?,?,?,?,?)',
                //       [item.id, item.first, item.second, item.third, CurrentDateNoteDialog.date],
                //       (tx, results) => {
                //         // console.log('Results', results.rowsAffected);
                //       }
                //     );
                //   });
                // })

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
                }
              );
            });
          });
          //------------------------  insert data in note lokhon table ------------------------------




          // console.log('temp date: ', temp);

          setFlatListItems(temp);
        }
      );
    });
    //----------------------   note_lokkon theke note_lokhon_table e data pass -----------------------------------




    //=======================     count table save  =================

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM count_table_previous WHERE date=? ',
        [CurrentDateNoteDialog.date],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            // console.log(results.rows.item(i))
          }

          //=====  insert data =====
          temp.map(item => {
            db.transaction(function (tx) {
              db.transaction((tx) => {
                // console.log('...........', item.id, item.count, CurrentDateNoteDialog.date);
                tx.executeSql(
                  'INSERT INTO count_table_final(id, count, date) VALUES (?,?,?)',
                  [item.id, item.count, CurrentDateNoteDialog.date],
                  (tx, results) => {
                    // console.log('Results count_table_final', results.rowsAffected);
                  }
                );
              });
            });

          });

          //============= delete data
          db.transaction((tx) => {
            console.log('yes count delete done');
            tx.executeSql(
              'DELETE FROM  count_table_previous where date=?',
              [CurrentDateNoteDialog.date],
              (tx, results) => {
                // console.log('Results', results.rowsAffected);

                // allColor.map(item => {
                //   db.transaction(function (tx) {
                //     console.log('...........', item.id, item.first, item.second, item.third, CurrentDateNoteDialog.date);
                //     tx.executeSql(
                //       'INSERT INTO count_table_final (id, count, date) VALUES (?,?,?)',
                //       [item.id, item.first, item.second, item.third, CurrentDateNoteDialog.date],
                //       (tx, results) => {
                //         // console.log('Results', results.rowsAffected);
                //       }
                //     );
                //   });
                // })

              }
            );
          });




          // console.log('temp date: ', temp);

          setFlatListItems(temp);
        }
      );
    });

    //------------------------------  count table save   --------------------------------------


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
    // console.log(viewColor);

    //================================================================
    // useEffect(() => {
    //   db.transaction((tx) => {
    //     tx.executeSql(
    //       'SELECT * FROM note_lokkon ',
    //       [],
    //       (tx, results) => {
    //         var temp = [];
    //         for (let i = 0; i < results.rows.length; ++i) {
    //           temp.push(results.rows.item(i));
    //         }
    //         console.log('table note_lokkon box_color   ========: ', temp.length);

    //         temp.map(item => {
    //           setViewColor([...viewColor, {
    //             id: item.id,
    //             first: item.first,
    //             second: 'yellow',
    //             third: item.third
    //           }])
    //         })
    //         // let colorboxArray = {
    //         //   id: 2,
    //         //   first: 'gray',
    //         //   second: 'gray',
    //         //   third: 'gray'
    //         // }
    //         console.log(viewColor)
    //         // setViewColor([viewColor, colorboxArray])

    //       }
    //     );
    //   });
    // }, []);
    //----------------------------------------------------------------------------


    return (
      <View >
        <LokkonFragment ViewColor={viewColor} setViewColor={setViewColor} CountClickColor={countClickColor} SetCountClickColor={setCountClickColor} CurrentDateNoteTabView={CurrentDateNoteDialog} />

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
          <Text style={{ flex: 1, textAlign: 'center', color: 'green' }} onPress={() => { DeleteTableData(); }}> বাতিল </Text>
          <Text style={{ flex: 1, color: 'green' }} onPress={() => { SavedTableData() }}> সংরক্ষণ </Text>
        </View>
      </NavigationContainer>
    </>
  );
}

export default NoteTabView;