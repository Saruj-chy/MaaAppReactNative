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

var db = openDatabase({ name: databaseName });
var SharedPreferences = require('react-native-shared-preferences');

const OjonScreen = () => {

  const [weightMax, setWeightMax] = useState([]);
  const [weightMin, setWeightMin] = useState([]);
  const [BMIValue, setBMIValue] = useState('');
  const [lineOjon, setLineOjon] = useState([]);


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
              'CREATE TABLE IF NOT EXISTS ojon_table(ojon_id INTEGER PRIMARY KEY AUTOINCREMENT, id INT(50), ojon VARCHAR(20), week VARCHAR(20) )',
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

            ojonSavedValue.map(item => {
              db.transaction(function (tx) {
                // console.log('...........', item.id, item.first, item.second, item.third, item.count, date);
                tx.executeSql(
                  'INSERT INTO ojon_table (id, ojon, week) VALUES (?,?,?)',
                  [item.id, item.ojon, item.week],
                  (tx, results) => {
                    // console.log('Results  note_lokkon ', results.rowsAffected);
                  }
                );
              });


            });


          }
          else {
            OjonLoadInTableChart();
            // CurrentOjon()
            if (BMIValue === '') {
              SharedPreferences.getItems(['bmi_value', 'initial_ojon'], function (values) {
                if (values[0] !== "null") {
                  setBMIValue(values[0]);
                  setOjonFirst(true);
                  SelectedMaxMinWeight(parseFloat(values[0]), parseFloat(values[1]));
                }
                else {
                  setOjonFirst(false);
                  setState(true);
                }


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
  const womenAddOjon = (ojon, id, bmi) => {
    console.log('id : ', id)
    if (id === 0) {
      SelectedMaxMinWeight(parseFloat(bmi), parseFloat(ojon));
    }
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE ojon_table set ojon=?  where id=?',
        [ojon, parseInt(id)],
        (tx, results) => {
          OjonLoadInTableChart();

        }
      );
    });


  }


  //  ======================    OjonLoadInTableChart function      ===============

  const OjonLoadInTableChart = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM ojon_table',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({ id: results.rows.item(i).id, week: results.rows.item(i).week, ojon: results.rows.item(i).ojon });

          }
          CurrentOjon(temp);
          setWomenOjon(temp);

        }
      );
    });

  }



  //=======================================    for useLess table Data show for testing 
  const TableShow = () => {
    // let bmi = 25;
    // SharedPreferences.setItem("bmi_value", bmi.toString());
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

      }
    }
    //===== function
    ForLoop(maxWeight);
    ForLoop(minWeight);

    setWeightMax(maxWeight);
    setWeightMin(minWeight);
  }

  const ForLoop = weight => {
    for (let i = 0; i < weight.length; i++) {
      if (weight[i] === weight[i + 1]) {
        for (let j = weight.length; j > 0; j--) {
          if (weight[j] === weight[i]) {
            let subWeight = weight[j + 1] - weight[i];
            let divideWeight = subWeight / ((j + 1) - i);
            for (let k = i + 1; k <= j; k++) {

              weight[k] = weight[k - 1] + divideWeight;

            }
            i = j;
            break;

          }

        }
      }
    }
  }

  //==============  dialog View for Line Chart =================
  const CurrentOjon = (WomenOjon) => {
    let ojonArray = [];
    WomenOjon.map(item => {
      if (item.ojon === '--') {
        ojonArray.push(0);
      }
      else {
        ojonArray.push(parseFloat(item.ojon));
      }
    })
    //==========    calculation  
    for (let i = 0; i < ojonArray.length; i++) {
      if (ojonArray[i] === 0) {
        for (let j = i; j < ojonArray.length; j++) {
          if (ojonArray[j] !== 0) {
            let subWeight = ojonArray[j] - ojonArray[i - 1];
            let divideWeight = subWeight / ((j + 1) - i);
            for (let k = i; k < j; k++) {
              ojonArray[k] = ojonArray[k - 1] + divideWeight;
            }
            i = j;
            break;
          }
        }
      }
    }
    //======   specific array
    let ojonArray2 = []
    for (let i = 0; i < ojonArray.length; i++) {
      if (ojonArray[i] !== 0) {
        ojonArray2.push(ojonArray[i]);
      }
    }

    setLineOjon(ojonArray2);
  }


  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={styles.appbarView}>
        <Text style={styles.appbarText}> ওজন  </Text>
        <Button title="click" color="#ad1457" onPress={() => { setState(true); }} />
      </View>

      {/* Weekly Ojon List */}

      <View style={{ ...styles.layoutStyle, marginBottom: 5 }}>
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

      <ScrollView style={{ height: 400 }}>
        <View>
          <View style={styles.layoutStyle}>
            <Text style={styles.weekOjnoTextStyle} onPress={() => TableShow()}>ওজনের ছক</Text>

            <View style={{ backgroundColor: 'white', height: 350, }}>
              {
                ojonFirst ? <LineChartScreen WeightMax={weightMax} WeightMin={weightMin} LineOjon={lineOjon} /> :
                  <View style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'green' }}> No chart data available</Text>
                    <Text style={{ textAlign: 'center', color: 'green' }}> এখানে তথ্য দেখতে আপনার ওজন প্রদান করুন. </Text>
                  </View>

              }

              {/* <LineChartScreen WeightMax={weightMax} WeightMin={weightMin} LineOjon={lineOjon} /> */}

            </View>

            <Text style={styles.weekOjnoTextStyle} onPress={() => detailsGraphClicked()}> বিস্তারিত দেখতে গ্রাফ চাপুন </Text>


          </View>
          <View style={{ height: 35 }}></View>
        </View>



      </ScrollView>

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
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#ad1457',

  },
  weekOjnoTextStyle: {
    backgroundColor: '#890e4f',
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 3,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
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