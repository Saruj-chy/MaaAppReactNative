import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import ColorBox from '../ColorBox/ColorBox';
import ColorBox2 from '../ColorBox/ColorBox2';
import { AllLokkonName, databaseName } from '../Constant/Constant';

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: databaseName });



const LokkonFragment = ({ ViewColor, setViewColor, CountClickColor, SetCountClickColor, CurrentDateNoteTabView }) => {



  const LokkonName = AllLokkonName;

  console.log(CurrentDateNoteTabView);

  const [flatListItems, setFlatListItems] = useState([]);

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
          console.log('temp date: ', temp);

          setFlatListItems(temp);
        }
      );
    });
  }, []);




  const savingDatabase = (id, first, second, third, count) => {
    // console.log('database: ', id, first, second, third, count);
    // console.log('CheckData: ', CurrentDateNoteTabView);
    var temp = [];

    // const item = flatListItems.filter(item => item.id === id);
    // const tempItem = temp.filter(item => item.id === id);
    // console.log(id, '     ', item.length, '     ', tempItem.length);

    if (count === 0) {
      console.log('new:====   ');
      // () => checkingData(id);

      // const CheckData = checkData.filter(item => item.note_id === id);
      // console.log('CheckData: ', CurrentDateNoteTabView);
      // console.log('flatListItems: ', flatListItems);
      // checkData;

      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO note_lokkon (id, first, second, third, date) VALUES (?,?,?,?,?)',
          [id, first, second, third, CurrentDateNoteTabView.date],
          (tx, results) => {
            // console.log('Results', results.rowsAffected);
          }
        );
      });
    }
    else {
      console.log('again...........');
      db.transaction(function (tx) {
        tx.executeSql(
          'UPDATE note_lokkon set first=?, second=? , third=? where note_id=?',
          [first, second, third, id],
          (tx, results) => {
            // console.log('Results', results.rowsAffected);
          }
        );
      });
    }

    // console.log('database:  ', flatListItems.length);


  }



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
          third: 'gray'
        };
        // console.log('blue: ', selectPushColor.id, selectPushColor.first, selectPushColor.second, selectPushColor.third);
        savingDatabase(selectPushColor.id, selectPushColor.first, selectPushColor.second, selectPushColor.third, count);

        setViewColor([...matchColor, selectPushColor]);
        break;

      case 'yellow':
        selectPushColor = {
          id: id,
          first: color,
          second: color,
          third: 'gray'
        };
        // console.log('yellow: ', selectPushColor.id, selectPushColor.first, selectPushColor.second, selectPushColor.third);
        savingDatabase(selectPushColor.id, selectPushColor.first, selectPushColor.second, selectPushColor.third, count);
        setViewColor([...matchColor, selectPushColor]);
        break;

      case 'red':
        selectPushColor = {
          id: id,
          first: color,
          second: color,
          third: color
        };
        // console.log('red: ', selectPushColor.id, selectPushColor.first, selectPushColor.second, selectPushColor.third);
        savingDatabase(selectPushColor.id, selectPushColor.first, selectPushColor.second, selectPushColor.third, count);
        setViewColor([...matchColor, selectPushColor]);
        break;

      default:
        selectPushColor = {
          id: id,
          first: 'gray',
          second: 'gray',
          third: 'gray'
        };
        // console.log('default: ', selectPushColor.id, selectPushColor.first, selectPushColor.second, selectPushColor.third);
        savingDatabase(selectPushColor.id, selectPushColor.first, selectPushColor.second, selectPushColor.third, count);
        setViewColor([...matchColor, selectPushColor]);
        break;

    }

  }

  const countFunction = id => {
    let clickCount, previousClickCount;
    let setClickCount;
    let color;

    previousClickCount = CountClickColor.filter(color => color.id !== id);
    clickCount = CountClickColor.find(color => color.id === id);
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