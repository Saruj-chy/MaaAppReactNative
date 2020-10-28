import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ColorBox from '../ColorBox/ColorBox';

const LokkonFragment = () => {

  const LokkonName = [{ id: 0, name: 'পেটে ব্যথা' }, { id: 1, name: 'ক্ষুধামন্দা' }, { id: 2, name: 'পিঠে ব্যথা' },
  { id: 3, name: 'গ্যাস্ট্রিক' }, { id: 4, name: 'শরীর ব্যথা' }, { id: 5, name: 'স্তন ব্যথা' }, { id: 6, name: 'কোষ্ট্যকাঠ্যিন্য' },
  { id: 7, name: 'হাত-পা কামড়ানো' }, { id: 8, name: 'ডায়রিয়া' }, { id: 9, name: 'মাথা ঘুরানো' }, { id: 10, name: 'ক্লান্তি' },
  { id: 11, name: 'জ্বর' }, { id: 12, name: 'প্রস্রাবের বেগ' }, { id: 13, name: 'মাথা ব্যথা' }, { id: 14, name: 'বদহজম' },
  { id: 15, name: 'অনিদ্রা' }, { id: 16, name: 'চুলকানি' }, { id: 17, name: 'পায়ে জ্বালাপোড়া' }, { id: 18, name: 'গিঁঠে ব্যথা' },
  { id: 19, name: 'বমি' }, { id: 20, name: 'ঘাড় ব্যথা' }, { id: 21, name: 'কুঁচকিতে ব্যথা' }, { id: 22, name: 'কাঁধে ব্যথা' },
  { id: 23, name: 'রক্তপাত' }, { id: 24, name: 'বুকে জ্বালাপোড়া' }, { id: 25, name: 'কোমরে ব্যথা' }, { id: 26, name: 'পা ফোলা' },
  { id: 27, name: 'তরল নির্গমন' }, { id: 28, name: 'ব্রণ' }, { id: 29, name: 'রাত্রীকালীন ঘাম' }];


  // const LokkonName = [{ id:1, name: 'পেটে ব্যথা'},{ id:1, name: 'ক্ষুধামন্দা'},{ id:1, name: 'পিঠে ব্যথা' },{ id:1, name: 'গ্যাস্ট্রিক' },{ id:1, name:  'শরীর ব্যথা' },{ id:1, name:  'স্তন ব্যথা' },{ id:1, name: 'কোষ্ট্যকাঠ্যিন্য' },{ id:1, name: 'হাত-পা কামড়ানো'   },{ id:1, name:    'ডায়রিয়া'   },{ id:1, name:    'মাথা ঘুরানো'  },{ id:1, name:   'ক্লান্তি' },{ id:1, name:  'জ্বর' },{ id:1, name:  'প্রস্রাবের বেগ'  },{ id:1, name:   'মাথা ব্যথা' },{ id:1, name:   'বদহজম' },{ id:1, name: 'অনিদ্রা' },{ id:1, name: 'চুলকানি' },{ id:1, name:  'পায়ে জ্বালাপোড়া' },{ id:1, name:   'গিঁঠে ব্যথা' },{ id:1, name:  'বমি' },{ id:1, name: 'ঘাড় ব্যথা' },{ id:1, name: 'কুঁচকিতে ব্যথা'  },{ id:1, name:  'কাঁধে ব্যথা'  },{ id:1, name: 'রক্তপাত'  },{ id:1, name:  'বুকে জ্বালাপোড়া'   },{ id:1, name:   'কোমরে ব্যথা' },{ id:1, name: 'পা ফোলা'  },{ id:1, name: 'তরল নির্গমন'},{ id:1, name:   'ব্রণ' },{ id:1, name: 'রাত্রীকালীন ঘাম'}];




  // const [firstColor, setFirstColor] = useState(false);
  // const [viewColor, setViewColor] = useState({
  //   first: 'gray',
  //   second: 'gray',
  //   third: 'gray'
  // });

  const [viewColor, setViewColor] = useState([]);

  const ColorSet = (id, color) => {
    let matchColor;

    switch (color) {
      case 'blue':
        matchColor = viewColor.filter(color => color.id !== id);
        // console.log('matchColor: ', matchColor);

        setViewColor([...matchColor, {
          id: id,
          first: color,
          second: 'gray',
          third: 'gray'
        }])
        break;
      case 'yellow':
        matchColor = viewColor.filter(color => color.id !== id);
        // console.log('matchColor: ', matchColor);


        setViewColor([...matchColor, {
          id: id,
          first: color,
          second: color,
          third: 'gray'
        }])
        break;
      case 'red':
        matchColor = viewColor.filter(color => color.id !== id);
        // console.log('matchColor: ', matchColor);

        setViewColor([...matchColor, {
          id: id,
          first: color,
          second: color,
          third: color
        }])
        break;
      default:
        matchColor = viewColor.filter(color => color.id !== id);
        console.log('matchColor: ', matchColor);

        setViewColor([...matchColor, {
          id: id,
          first: 'gray',
          second: 'gray',
          third: 'gray'
        }])
        break;



    }
    console.log(id, color)
    // console.log(viewColor);

    // setFirstColor(!firstColor);
    // switch (color) {
    //   case 'blue':
    //     colorCode = 1;
    //     break;
    //   case 'yellow':
    //     colorCode = 1;
    //     break;
    //   case 'red':
    //     colorCode = 1;
    //     break;
    //   default:
    //     colorCode = 0;
    //     break;


    // }

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
          LokkonName.map(data => <ColorBox colorView={viewColor} colorFunc={ColorSet} lokkonName={data} key={data.id} />)
        }

      </ScrollView>







    </View>
  );
};

export default LokkonFragment;