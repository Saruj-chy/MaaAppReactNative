import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ColorBox = ({ colorView, colorFunc, lokkonName }) => {
  let sports, total;
  let matching;
  let number = [];
  const [numb, setNumb] = useState(0);

  //======   for object array sort
  colorView.sort(function (a, b) {
    return a.id - b.id;
  });
  // console.log(colorView);


  return (
    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
      <View style={{ flex: 1.5, }}>
        <Text style={{ paddingLeft: 10 }}> {lokkonName.name} </Text>
      </View>

      {
        matching = colorView.filter((data) => data.id === lokkonName.id),
        //console.log('match: ', matching.length),


        matching.length >= 1 && matching !== undefined ? <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: colorView[lokkonName.id].first, }} onPress={() => {
            colorFunc(lokkonName.id, 'blue'); setNumb(lokkonName.id)
          }} />

          <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: colorView[lokkonName.id].second, marginLeft: 5, marginRight: 5 }} onPress={() => colorFunc(lokkonName.id, 'yellow')} />

          <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: colorView[lokkonName.id].third, }} onPress={() => colorFunc(lokkonName.id, 'red')} />

        </View> :

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: 'gray', }} onPress={() => {
              colorFunc(lokkonName.id, 'blue'); setNumb(lokkonName.id)
            }} />

            <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: 'gray', marginLeft: 5, marginRight: 5 }} onPress={() => colorFunc(lokkonName.id, 'yellow')} />

            <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: 'gray', }} onPress={() => colorFunc(lokkonName.id, 'red')} />

          </View>




      }

    </View>
  );
};

export default ColorBox;