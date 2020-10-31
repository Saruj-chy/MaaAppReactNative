import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ColorBox from '../ColorBox/ColorBox';
import ColorBox2 from '../ColorBox/ColorBox2';
import { AllLokkonName } from '../Constant/Constant';



const LokkonFragment = ({ ViewColor, setViewColor }) => {

  const LokkonName = AllLokkonName;

  // console.log(ViewColor);



  const ColorFunction = (id, color) => {
    let matchColor, selectedColor;

    matchColor = ViewColor.filter(color => color.id !== id);
    selectedColor = ViewColor.find(color => color.id === id);
    console.log(selectedColor, selectedColor.first, color);
    if(selectedColor.first === color ) {
      switch(color){
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
    else{
      color = color;
    }


    switch (color) {
      case 'blue':
        setViewColor([...matchColor, {
          id: id,
          first: color,
          second: 'gray',
          third: 'gray'
        }]);

        break;
      case 'yellow':
        setViewColor([...matchColor, {
          id: id,
          first: color,
          second: color,
          third: 'gray'
        }]);


        break;
      case 'red':
        setViewColor([...matchColor, {
          id: id,
          first: color,
          second: color,
          third: color
        }]);


        break;
      default:
        setViewColor([...matchColor, {
          id: id,
          first: 'gray',
          second: 'gray',
          third: 'gray'
        }]);

      console.log(color) ;



        break;

    }

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
          LokkonName.map(data => <ColorBox colorView={ViewColor} colorFunc={ColorFunction} lokkonName={data} key={data.id} />)
        }

      </ScrollView>
    </View>
  );
};

export default LokkonFragment;