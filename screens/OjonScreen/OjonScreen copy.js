import React, { useEffect, useState } from 'react';
import { Button, Modal, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import Dialog from 'react-native-popup-dialog';
import OjonSavedScreen from './OjonSavedScreen';
import DialogView from '../dialogView/DialogView';
import DialogOjon from '../dialogView/DialogOjon';
import moment from "moment";
import { AllLokkonName, databaseName, ojonSavedValue } from '../Constant/Constant';
import { openDatabase } from 'react-native-sqlite-storage';
import LineChartScreen from '../LineChartScreen/LineChartScreen';
import LineChartScreen2 from '../LineChartScreen/LineChartScreen2';

var db = openDatabase({ name: databaseName });
var SharedPreferences = require('react-native-shared-preferences');

const OjonScreen = () => {
  let underWeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const [weightMax, setWeightMax] = useState(underWeight);
  const [weightMin, setWeightMin] = useState(underWeight);
  const [BMIValue, setBMIValue] = useState('');


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
                  // console.log('Results  ojon_table initial ', results.rowsAffected);

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
            OjonLoadInTableChart();
            setOjonFirst(true);
            if (BMIValue === '') {
              SharedPreferences.getItems(['bmi_value', 'initial_ojon'], function (values) {
                setBMIValue(values[0]);
                SelectedMaxMinWeight(parseFloat(values[0]), parseFloat(values[1]));
              });
            }
          }
        }
      );
    }
    );
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
          // console.log('Results UPDATE ojon_table ', results.rowsAffected);


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
          // console.log('Results UPDATE ojon_table_2 ', results.rowsAffected, ' id: ', id);
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
          // console.log('Results  ojon_table ', results.rowsAffected);


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
    // let bmi = 25;
    // SharedPreferences.setItem("bmi_value", bmi.toString());
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     'SELECT * FROM ojon_table ',
    //     [],
    //     (tx, results) => {
    //       console.log(' results.rows.length: ', results.rows.length);
    //       var temp = [];
    //       for (let i = 0; i < results.rows.length; ++i) {
    //         temp.push(results.rows.item(i));

    //       }
    //       // console.log(temp);


    //     }
    //   );
    // });

    // db.transaction((tx) => {
    //   tx.executeSql(
    //     'SELECT * FROM ojon_table_2 ',
    //     [],
    //     (tx, results) => {
    //       console.log(' results.rows.length: ', results.rows.length);
    //       var temp2 = [];
    //       for (let i = 0; i < results.rows.length; ++i) {
    //         temp2.push(results.rows.item(i));

    //       }
    //       // console.log('ojon_table_2: ', temp2);
    //     }
    //   );
    // });
  }

  const detailsGraphClicked = () => {
    SharedPreferences.getItems(['bmi_value', 'initial_ojon'], function (values) {
      // console.log(values)
    });
  }



  //==================================       data show in Graph chart    ====================================

  const SelectedMaxMinWeight = (BMI, ojonValue) => {
    let underWtMn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 5, 0, 0, 0, 9, 0, 0, 0, 13, 0, 0, 0, 17, 0, 0, 0, 20, 0, 22, 0, 24, 25, 26, 27, 28];
    let underWtMx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 10, 0, 0, 0, 15, 0, 0, 0, 20, 0, 0, 0, 25, 0, 0, 0, 30, 0, 32, 0, 35, 36, 37, 39, 40];
    let normalWtMn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 11, 0, 0, 0, 15, 0, 0, 0, 18, 0, 20, 0, 21, 22, 23, 24, 25];
    let normalWtMx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 10, 0, 0, 0, 14, 0, 0, 0, 18, 0, 0, 0, 22, 0, 0, 0, 27, 0, 29, 0, 31, 32, 32, 34, 35];
    let overWtMn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 7, 0, 0, 0, 9, 0, 0, 0, 11, 0, 12, 0, 13, 13, 14, 14, 15];
    let overWtMx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 8, 0, 0, 0, 11, 0, 0, 0, 14, 0, 0, 0, 17, 0, 0, 0, 19, 0, 21, 0, 22, 23, 23, 24, 25];
    let obeseWtMn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 6, 0, 0, 0, 7, 0, 0, 0, 8, 0, 9, 0, 10, 10, 10, 11, 11];
    let obeseWtMx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 6, 0, 0, 0, 8, 0, 0, 0, 11, 0, 0, 0, 13, 0, 0, 0, 15, 0, 16, 0, 17, 18, 19, 19, 20];
    let maxWeight = [], minWeight = [];
    maxWeight[0] = minWeight[0] = ojonValue;

    // console.log('bmi: ', BMI, '  ojonValue: ', ojonValue);

    // console.log(' underWtMn: ', underWtMn.length, ' underWtMx: ', underWtMx.length, ' normalWtMn: ', normalWtMn.length, ' normalWtMx: ', normalWtMx.length, ' overWtMn: ', overWtMn.length, ' overWtMx: ', overWtMx.length, ' obeseWtMn: ', obeseWtMn.length, ' overWtMx: ', overWtMx.length)

    if (BMI < 18.5) {
      for (let i = 0; i < 40; i++) {
        if (underWtMx[i] === 0) {
          maxWeight[i + 1] = maxWeight[i];
          minWeight[i + 1] = minWeight[i];
        }
        else {
          maxWeight[i + 1] = parseFloat((maxWeight[0] + underWtMx[i] / 2.2).toFixed(2));
          minWeight[i + 1] = parseFloat((minWeight[0] + underWtMn[i] / 2.2).toFixed(2));
        }
        // maxWeight[i + 1] = parseFloat((maxWeight[0] + underWtMx[i] / 2.2).toFixed(2));
        // minWeight[i + 1] = parseFloat((minWeight[0] + underWtMn[i] / 2.2).toFixed(2));

      }
    }
    else if (BMI >= 18.5 && BMI < 25.0) {
      //Normal Weight
      for (let i = 0; i < 40; i++) {
        if (underWtMx[i] === 0) {
          maxWeight[i + 1] = maxWeight[i];
          minWeight[i + 1] = minWeight[i];
        }
        else {
          maxWeight[i + 1] = parseFloat((maxWeight[0] + normalWtMx[i] / 2.2).toFixed(2));
          minWeight[i + 1] = parseFloat((minWeight[0] + normalWtMn[i] / 2.2).toFixed(2));
        }
        // maxWeight[i + 1] = parseFloat((maxWeight[0] + normalWtMx[i] / 2.2).toFixed(2));
        // minWeight[i + 1] = parseFloat((minWeight[0] + normalWtMn[i] / 2.2).toFixed(2));
      }
    } else if (BMI >= 25.0 && BMI < 30.0) {
      //Over Weight
      for (let i = 0; i < 40; i++) {
        if (underWtMx[i] === 0) {
          maxWeight[i + 1] = maxWeight[i];
          minWeight[i + 1] = minWeight[i];
        }
        else {
          maxWeight[i + 1] = parseFloat((maxWeight[0] + overWtMx[i] / 2.2).toFixed(2));
          minWeight[i + 1] = parseFloat((minWeight[0] + overWtMn[i] / 2.2).toFixed(2));
        }
        // maxWeight[i + 1] = parseFloat((maxWeight[0] + overWtMx[i] / 2.2).toFixed(2));
        // minWeight[i + 1] = parseFloat((minWeight[0] + overWtMn[i] / 2.2).toFixed(2));

      }
    } else if (BMI >= 30.0) {
      // OVISH
      for (let i = 0; i < 40; i++) {
        if (underWtMx[i] === 0) {
          maxWeight[i + 1] = maxWeight[i];
          minWeight[i + 1] = minWeight[i];
        }
        else {
          maxWeight[i + 1] = parseFloat((maxWeight[0] + obeseWtMx[i] / 2.2).toFixed(2));
          minWeight[i + 1] = parseFloat((minWeight[0] + obeseWtMn[i] / 2.2).toFixed(2));
        }

        // maxWeight[i + 1] = parseFloat((maxWeight[0] + obeseWtMx[i] / 2.2).toFixed(2));
        // minWeight[i + 1] = parseFloat((minWeight[0] + obeseWtMn[i] / 2.2).toFixed(2));
      }
    }
    // console.log(' maxWeight:  ', maxWeight, '   minWeight-----------    ', minWeight);
    //===== function
    ForLoop(maxWeight);
    ForLoop(minWeight);

    // console.log(' maxWeight:  ', maxWeight, '   minWeight    ', minWeight);
    setWeightMax(maxWeight);
    setWeightMin(minWeight);
  }

  const ForLoop = weight => {
    for (let i = 0; i < 40; i++) {
      if (weight[i] === weight[i + 1]) {
        for (let j = 40; j > 0; j--) {
          if (weight[j] === weight[i]) {
            let subWeight = weight[j + 1] - weight[i];
            let divideWeight = subWeight / ((j + 1) - i);
            for (let k = i + 1; k <= j; k++) {

              weight[k] = weight[k - 1] + divideWeight;

              // console.log('k  ', k, '  i: ', i, '  weights:  ', weight[k]);
            }
            i = j;
            break;

          }

        }
      }
    }
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

        <View style={{ backgroundColor: 'white', height: 280, }}>

          <LineChartScreen WeightMax={weightMax} WeightMin={weightMin} />
          {/* <LineChartScreen2 WeightMax={weightMax} /> */}

        </View>

        <Text style={styles.weekOjnoTextStyle} onPress={() => detailsGraphClicked()}> বিস্তারিত দেখতে গ্রাফ চাপুন </Text>

      </View>


      <Dialog
        visible={state}
        onTouchOutside={() => setState(false)}
      >
        {
          // console.log(ojonFirst),
          ojonFirst ? <DialogOjon SetState={setState} AddWomenOjon={womenAddOjon} /> :
            <DialogView SetState={setState} AddWomenOjon={womenAddOjon} SetOjonFirst={setOjonFirst} SetBMIValue={setBMIValue} />
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