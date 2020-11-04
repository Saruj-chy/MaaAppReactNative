import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ColorArray, ColorClickCount, databaseName, AllLokkonName } from '../Constant/Constant';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: databaseName });



const ColorBox = ({ colorView, colorFunc, countFunc, lokkonName, SavingDatabase }) => {

  const [boxColor, setBoxColor] = useState([]);
  //======   for object array sort
  colorView.sort(function (a, b) {
    return a.id - b.id;
  });
  // console.log(colorView);


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
  //         setBoxColor([...boxColor, temp]);

  //       }
  //     );
  //   });
  // }, []);
  //----------------------------------------------------------------------------


  return (
    <TouchableOpacity onPress={() => { countFunc(lokkonName.id); }}>
      <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, }}>
        <View style={{ flex: 1.5, }}>
          <Text style={{ paddingLeft: 10 }} disabled={true}> {lokkonName.name}   </Text>
        </View>

        {

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: colorView[lokkonName.id].first, }} disabled={true} />

            <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: colorView[lokkonName.id].second, marginLeft: 5, marginRight: 5 }} disabled={true} />

            <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: colorView[lokkonName.id].third, }} disabled={true} />

          </View>

        }

      </View>
    </TouchableOpacity>
  );
};

export default ColorBox;