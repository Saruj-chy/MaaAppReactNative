import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import ColorBox from '../ColorBox/ColorBox';
import ColorBox2 from '../ColorBox/ColorBox2';
import { AllLokkonName, databaseName } from '../Constant/Constant';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: databaseName });
var SharedPreferences = require('react-native-shared-preferences');


const LokkonFragment = ({ ViewColor, setViewColor, CountClickColor, SetCountClickColor, CurrentDateNoteTabView }) => {


  const LokkonName = AllLokkonName;

  //================================================================
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM note_lokkon_change_color WHERE date =? ',
        [CurrentDateNoteTabView.date],
        (tx, results) => {
          var temp = [];
          var temp1 = [];
          for (let i = 0; i < results.rows.length; ++i) {
            let count = parseInt(results.rows.item(i).count);

            temp.push({ id: results.rows.item(i).id, first: results.rows.item(i).first, second: results.rows.item(i).second, third: results.rows.item(i).third, count: count });
            temp1.push({ id: results.rows.item(i).id, count: count });

          }


          if (temp.length > 0) {
            setViewColor(temp);
            SetCountClickColor(temp1);

            temp.map(item => {

              db.transaction(function (tx) {
                tx.executeSql(
                  'UPDATE note_lokkon set first=?, second=? , third=?, count=?, date=? where id=? AND date=?',
                  [item.first, item.second, item.third, item.count, CurrentDateNoteTabView.date, item.id, CurrentDateNoteTabView.date],
                  (tx, results) => {
                    // console.log(' LokkonFragment  Results UPDATE note_lokkon ', results.rowsAffected);

                  }
                );
              });

            });


          }


        }
      );
    });
  }, []);

  //----------------------------------------------------------------------------



  const savingDatabase = (id, first, second, third, count) => {

    var note;

    SharedPreferences.getItem("key", function (value) {
      note = value;
      if (note === undefined) {
        note = 'hello';
        // console.log(note)
      }
    });




    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE note_lokkon set first=?, second=? , third=?, count=?, date=? , note=? where id=? AND date=?',
        [first, second, third, count, CurrentDateNoteTabView.date, count, id, CurrentDateNoteTabView.date],
        (tx, results) => {
          // console.log('Results Update note_lokkon', results.rowsAffected);
        }
      );
    });


  }
  // }



  const ColorFunction = (id, color, count) => {
    let matchColor, selectedColor;
    let selectPushColor;

    matchColor = ViewColor.filter(color => color.id !== id);
    selectedColor = ViewColor.find(color => color.id === id);
    // console.log(selectedColor, selectedColor.first, color);
    if (selectedColor.first === color) {
      switch (color) {
        case 'blue':
          color = 'gray';
          break;
        case 'yellow':
          color = 'blue';
          break;
        case 'red':
          color = 'yellow';
          break;
        default:
          color = 'gray';
          break;
      }
    }
    else {
      color = color;
    }

    switch (color) {
      case 'blue':
        selectPushColor = {
          id: id,
          first: color,
          second: 'gray',
          third: 'gray',
          count: count
        };
        // console.log('blue: ', selectPushColor.id, selectPushColor.first, selectPushColor.second, selectPushColor.third);
        savingDatabase(selectPushColor.id, selectPushColor.first, selectPushColor.second, selectPushColor.third, count + 1);

        setViewColor([...matchColor, selectPushColor]);
        break;

      case 'yellow':
        selectPushColor = {
          id: id,
          first: color,
          second: color,
          third: 'gray',
          count: count
        };
        // console.log('yellow: ', selectPushColor.id, selectPushColor.first, selectPushColor.second, selectPushColor.third);
        savingDatabase(selectPushColor.id, selectPushColor.first, selectPushColor.second, selectPushColor.third, count + 1);
        setViewColor([...matchColor, selectPushColor]);
        break;

      case 'red':
        selectPushColor = {
          id: id,
          first: color,
          second: color,
          third: color,
          count: count
        };
        // console.log('red: ', selectPushColor.id, selectPushColor.first, selectPushColor.second, selectPushColor.third);
        savingDatabase(selectPushColor.id, selectPushColor.first, selectPushColor.second, selectPushColor.third, count + 1);
        setViewColor([...matchColor, selectPushColor]);
        break;

      default:
        selectPushColor = {
          id: id,
          first: 'gray',
          second: 'gray',
          third: 'gray',
          count: count
        };
        // console.log('default: ', selectPushColor.id, selectPushColor.first, selectPushColor.second, selectPushColor.third);
        savingDatabase(selectPushColor.id, selectPushColor.first, selectPushColor.second, selectPushColor.third, count + 1);
        setViewColor([...matchColor, selectPushColor]);
        break;

    }

  }

  const countFunction = id => {
    let clickCount, previousClickCount;
    let setClickCount;
    let color;

    // console.log('LokkonFragment CountClickColor = ', CountClickColor);

    previousClickCount = CountClickColor.filter(color => color.id !== id);
    clickCount = CountClickColor.find(color => color.id === id);
    // console.log('LokkonFragment clickCount = ', clickCount);
    setClickCount = {
      id: id, count: clickCount.count + 1
    };
    SetCountClickColor([...previousClickCount, setClickCount]);

    //======   for object array sort
    CountClickColor.sort(function (a, b) {
      return a.id - b.id;
    });

    // console.log(CountClickColor);

    if (clickCount.count % 4 === 0) {
      color = 'blue';
    }
    if (clickCount.count % 4 === 1) {
      color = 'yellow';
    }
    if (clickCount.count % 4 === 2) {
      color = 'red';
    }
    if (clickCount.count % 4 === 3) {
      color = 'gray';
    }
    // console.log(color);

    ColorFunction(id, color, clickCount.count);

  }

  return (
    <View>
      <View style={{ flexDirection: 'row', backgroundColor: '#ad1457' }}>
        <View style={{ flex: 1.5, }}>
          <Text style={{ color: 'white', paddingLeft: 10 }}> নাম </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={{ color: 'white' }} onPress={() => ColorSet('blue')} >কম </Text>

          <Text style={{ color: 'white' }} onPress={() => ColorSet('yellow')} >  মাঝারি  </Text>

          <Text style={{ color: 'white' }} onPress={() => ColorSet('red')} >বেশি</Text>

        </View>
      </View>
      <ScrollView>
        {
          LokkonName.map(data => <ColorBox colorView={ViewColor} colorFunc={ColorFunction} countFunc={countFunction} lokkonName={data} key={data.id} SavingDatabase={savingDatabase} />)
        }


      </ScrollView>
    </View>
  );
};

export default LokkonFragment;