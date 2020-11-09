import React, { useEffect, useState } from 'react';
import { Button, Modal, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import Dialog from 'react-native-popup-dialog';
import OjonSavedScreen from './OjonSavedScreen';
import DialogView from '../dialogView/DialogView';
import DialogOjon from '../dialogView/DialogOjon';
import moment from "moment";
import { AllLokkonName, databaseName, ojonSavedValue } from '../Constant/Constant';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: databaseName });



const OjonScreen = () => {

  const [state, setState] = useState(false);
  const [ojonFirst, setOjonFirst] = useState(false);
  const [womenOjon, setWomenOjon] = useState(ojonSavedValue);

  //============================    create database table ------------------------------------------
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='ojon_table'",
        [],
        function (tx, res) {
          // console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS ojon_table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS ojon_table(ojon_id INTEGER PRIMARY KEY AUTOINCREMENT, id INT(50), ojon VARCHAR(20), current_date VARCHAR(20), week_date VARCHAR(20) )',
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
        "SELECT name FROM sqlite_master WHERE type='table' AND name='ojon_table_2'",
        [],
        function (tx, res) {
          // console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS ojon_table_2', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS ojon_table_2(ojon_id INTEGER PRIMARY KEY AUTOINCREMENT, id INT(50), ojon VARCHAR(20), week VARCHAR(20) )',
              []
            );
          }
        }
      );
    });
  }, []);
  // --------------------------------       create database table    --------------------------------

  // =======================================================   when table empty initial data load in db    ========================================
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ojon_table ',
        [],
        (tx, results) => {
          if (results.rows.length === 0) {
            //============    first data insert in ojon table
            db.transaction(function (tx) {
              tx.executeSql(
                'INSERT INTO ojon_table (id, ojon, current_date, week_date) VALUES (?,?,?,?)',
                [0, 0, 'date1', 'date2'],
                (tx, results) => {
                  console.log('Results  ojon_table initial ', results.rowsAffected);

                }
              );
            });
            //===========       all constant data insert in ojon_table_2     ============
            ojonSavedValue.map(item => {
              db.transaction(function (tx) {
                tx.executeSql(
                  'INSERT INTO ojon_table_2 (id, week, ojon) VALUES (?,?,?)',
                  [item.id, item.week, item.ojon],
                  (tx, results) => {
                    // console.log('Results  ojon_table_2 ', results.rowsAffected);

                  }
                );
              });
            })

          }
          else {
            console.log('ojon_table_2 data load');
            OjonLoadInTableChart();
            setOjonFirst(true);

          }
        }
      );
    });
  }, []);
  //------------------------------------------------------------------------------     when table empty initial data load in db    ----------------



  //=============================== setWomenOjon =================
  const womenAddOjon = (ojon) => {
    const currentDate = moment();
    const month1 = currentDate.format("MM");
    const day1 = currentDate.format("D");
    const year1 = currentDate.format("YYYY");

    const weeksDate = currentDate.add(1, 'weeks');
    const month2 = weeksDate.format("MM");
    const day2 = weeksDate.format("D");
    const year2 = weeksDate.format("YYYY");
    // console.log('day2, month2, year2: ', day2, month2, year2);

    var date1 = day1 + '-' + month1 + '-' + year1;
    var date2 = day2 + '-' + month2 + '-' + year2;


    //===========  data load in ojon chart
    OjonLoadInTableChart();



    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ojon_table ',
        [],
        (tx, results) => {

          let tableDate = results.rows.item(results.rows.length - 1).week_date;
          let tableOjonID = results.rows.item(results.rows.length - 1).ojon_id;
          let tableID = results.rows.item(results.rows.length - 1).id;

          var temp = [];
          for (let i = 1; i < results.rows.length; ++i) {
            temp.push({ id: results.rows.item(i).id, week: results.rows.item(i).week, ojon: results.rows.item(i).ojon, current_date: results.rows.item(i).current_date, week_date: results.rows.item(i).week_date });

          }

          if (results.rows.length === 1) {
            // console.log('previousDate:  ');
            TableDataInserted(1, ojon, date1, date2);
            UpdateTableData_2(1, ojon);
          }
          else if (results.rows.length === 2) {
            TableDataInserted(2, ojon, date1, date2);
            UpdateTableData_2(2, ojon);
          }

          else if (results.rows.length >= 3 && results.rows.length <= 41) {
            // console.log('tableOjonId: ', tableID + 1, ' updated date:  ', date1, '  date2: ', date2, '  tableDate: ', tableDate);

            if (tableDate === date1) {
              // console.log('data inserted')
              TableDataInserted(tableID + 1, ojon, date1, date2);
              UpdateTableData_2(tableID + 1, ojon);

            }
            else {
              // console.log('data update', tableOjonID);
              UpdateTableData(tableOjonID, ojon);
              UpdateTableData_2(tableOjonID - 1, ojon);
            }

          }
          else {
            UpdateTableData(tableOjonID, ojon);
            UpdateTableData_2(tableOjonID - 1, ojon);
          }

        }
      );
    });



  }

  //=============================       UpdatedTableData
  const UpdateTableData = (id, ojon) => {
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE ojon_table set ojon=? where ojon_id=?',
        [ojon, id],
        (tx, results) => {
          console.log('Results UPDATE ojon_table ', results.rowsAffected);


        }
      );
    });


  }

  const UpdateTableData_2 = (id, ojon) => {
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE ojon_table_2 set ojon=? where ojon_id=?',
        [ojon, id],
        (tx, results) => {
          console.log('Results UPDATE ojon_table_2 ', results.rowsAffected, ' id: ', id);
          OjonLoadInTableChart();
        }
      );
    });


  }

  //  ========================= TableDataInserted   =========================
  const TableDataInserted = (id, ojon, date1, date2) => {
    db.transaction(function (tx) {
      console.log(' TableDataInserted : ', id, ojon, date1, date2);
      tx.executeSql(
        'INSERT INTO ojon_table (id, ojon, current_date, week_date) VALUES (?,?,?,?)',
        [id, ojon, date1, date2],
        (tx, results) => {
          console.log('Results  ojon_table ', results.rowsAffected);

        }
      );
    });
  }
  //  ======================    OjonLoadInTableChart function      ===============

  const OjonLoadInTableChart = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM ojon_table_2',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({ id: results.rows.item(i).id, week: results.rows.item(i).week, ojon: results.rows.item(i).ojon });

          }
          setWomenOjon(temp);

        }
      );
    });

  }



  //=======================================    for useLess table Data show for testing 
  const TableShow = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ojon_table ',
        [],
        (tx, results) => {
          console.log(' results.rows.length: ', results.rows.length);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));

          }
          console.log(temp);


        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ojon_table_2 ',
        [],
        (tx, results) => {
          console.log(' results.rows.length: ', results.rows.length);
          var temp2 = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp2.push(results.rows.item(i));

          }
          console.log('ojon_table_2: ', temp2);
        }
      );
    });
  }




  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={styles.appbarView}>
        <Text style={styles.appbarText}> ওজন  </Text>
        <Button title="click" color="#ad1457" onPress={() => { setState(true); }} />

      </View>

      {/* Weekly Ojon List */}

      <View style={styles.layoutStyle}>
        <Text style={styles.weekOjnoTextStyle}>সাপ্তাহিক ওজন </Text>
        <View style={{ backgroundColor: '#607d8b', marginBottom: 5, }}>
          <View style={{ flexDirection: 'row', padding: 5 }}>
            <Text style={styles.weekViewText}>সপ্তাহ নংঃ </Text>
            <Text style={styles.weekViewText}>ওজন(কেজি) </Text>

          </View>
          <View style={{ height: 1, marginHorizontal: 10, backgroundColor: 'white' }}></View>

          <ScrollView style={{ height: 200, }} >
            {
              womenOjon.map(data => <OjonSavedScreen value={data} key={data.id} />)
            }


          </ScrollView>

        </View>

      </View>

      {/* graph chart  */}

      <View style={styles.layoutStyle}>
        <Text style={styles.weekOjnoTextStyle} onPress={() => TableShow()}>ওজনের ছক</Text>

        <View style={{ backgroundColor: 'white', height: 270, }}>

        </View>

        <Text style={styles.weekOjnoTextStyle}> বিস্তারিত দেখতে গ্রাফ চাপুন </Text>

      </View>


      <Dialog
        visible={state}
        onTouchOutside={() => setState(false)}
      >
        {
          // console.log(ojonFirst),
          ojonFirst ? <DialogOjon SetState={setState} AddWomenOjon={womenAddOjon} /> :
            <DialogView SetState={setState} AddWomenOjon={womenAddOjon} SetOjonFirst={setOjonFirst} />
        }
        {/* <DialogView SetState={setState} AddWomenOjon={womenAddOjon} SetOjonFirst={setOjonFirst} /> */}

        {/* <DialogView setState={setState} addWomenOjon={womenAddOjon} setOjonFirst={setOjonFirst} /> */}
        {/* <DialogOjon setState={setState} addWomenOjon={womenAddOjon} /> */}

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
  layoutStyle: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#ad1457'
  },
  weekOjnoTextStyle: {
    backgroundColor: '#890e4f',
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5

  },
  weekViewText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 2,
    textAlign: 'center'
  },

})

export default OjonScreen;