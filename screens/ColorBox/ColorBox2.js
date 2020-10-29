import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ColorBox2 = ({ colorView, colorFunc, lokkonName, numberArray }) => {
  let sports, total, boolean = false;
  let matching, matching2;
  const [changeColorView, setChangeColorView] = useState([]);

  //======   for object array sort
  colorView.sort(function (a, b) {
    return a.id - b.id;
  });
  // console.log(colorView);



  const idSearcher = (colorView, id) => {
    // console.log(colorView, id)
    matching = colorView.filter((data) => data.id === id);


    if (matching.length >= 1) {
      // console.log('length: ', matching.length, lokkonName.id);
      console.log('match:   ', matching[id]);
      // setChangeColorView(matching2);
    }
  }

  // console.log('view:   ', changeColorView);

  const setChangeColor = colorArray => {

  }



  const functionSetting = (number, id) => {

    switch (number) {
      case 0: {
        // console.log('object', id);
        return (<View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: 'gray', }} onPress={() => {
            colorFunc(id, 'blue'); numberArray.push(id);
          }} />

          <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: 'gray', marginLeft: 5, marginRight: 5 }} onPress={() => { colorFunc(id, 'yellow'); numberArray.push(id); }} />

          <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: 'gray', }} onPress={() => { colorFunc(id, 'red'); numberArray.push(id); }} />

        </View>)
      }
      case 1:
        {
          // console.log('transfer: ', id, colorView[id].first);
          return (<View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: colorView[id].first }} onPress={() => {
              colorFunc(id, 'blue'); setChangeColor(colorView, lokkonName.id);
            }} />

            <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: colorView[id].second, marginLeft: 5, marginRight: 5 }} onPress={() => { colorFunc(id, 'yellow'); numberArray.push(id); }} />

            <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: colorView[id].third, }} onPress={() => { colorFunc(id, 'red'); numberArray.push(id); }} />

          </View>)
        }




    }

    // if (number >= 1) {
    //   console.log('transfer: ', id);
    //   return (<View style={{ flex: 1, flexDirection: 'row' }}>
    //     <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: colorView[id].first, }} onPress={() => {
    //       colorFunc(id, 'blue');
    //       console.log(colorView[1]); console.log(id);
    //     }} />

    //     <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: colorView[id].second, marginLeft: 5, marginRight: 5 }} onPress={() => { colorFunc(id, 'yellow'); }} />

    //     <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: colorView[id].third, }} onPress={() => { colorFunc(id, 'red'); }} />

    //   </View>)
    // }
    // else {
    //   console.log('object', id);
    //   return (<View style={{ flex: 1, flexDirection: 'row' }}>
    //     <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: 'gray', }} onPress={() => {
    //       colorFunc(id, 'blue'); console.log(colorView[id]);
    //     }} />

    //     <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: 'gray', marginLeft: 5, marginRight: 5 }} onPress={() => { colorFunc(id, 'yellow'); }} />

    //     <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: 'gray', }} onPress={() => { colorFunc(id, 'red'); }} />

    //   </View>)

    // }
  }





  return (
    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
      <View style={{ flex: 1.5, }}>
        <Text style={{ paddingLeft: 10 }}>{lokkonName.name}</Text>
      </View>

      {
        idSearcher(colorView, lokkonName.id),



        functionSetting(matching.length, lokkonName.id)



      }

    </View>
  );
};

export default ColorBox2;


{/* <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: colorView[lokkonName.id].first, }} onPress={() => {
            colorFunc(lokkonName.id, 'blue'); setChangeColor(colorView[lokkonName.id]);
            console.log(colorView[1]); console.log(lokkonName.id);
          }} />

          <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: colorView[lokkonName.id].second, marginLeft: 5, marginRight: 5 }} onPress={() => { colorFunc(lokkonName.id, 'yellow'); setChangeColor(colorView[lokkonName.id]); }} />

          <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: colorView[lokkonName.id].third, }} onPress={() => { colorFunc(lokkonName.id, 'red'); setChangeColor(colorView[lokkonName.id]); }} />

        </View> */}


        // matching.length >= 1 ? console.log('yes', lokkonName.id) :

        //   <View style={{ flex: 1, flexDirection: 'row' }}>
        //     <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: 'gray', }} onPress={() => {
        //       colorFunc(lokkonName.id, 'blue'); setChangeColor(colorView[lokkonName.id]); console.log(colorView[lokkonName.id]);
        //     }} />

        //     <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: 'gray', marginLeft: 5, marginRight: 5 }} onPress={() => { colorFunc(lokkonName.id, 'yellow'); setChangeColor(colorView[lokkonName.id]); }} />

        //     <TouchableOpacity style={{ height: 25, width: 30, backgroundColor: 'gray', }} onPress={() => { colorFunc(lokkonName.id, 'red'); setChangeColor(colorView[lokkonName.id]); }} />

        //   </View>