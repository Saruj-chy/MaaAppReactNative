import React, { useState } from 'react';
import { Button, Modal, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import OjonSavedScreen from './OjonSavedScreen';

import DialogView from '../dialogView/DialogView';
import DialogOjon from '../dialogView/DialogOjon';


const ojonSavedValue = [
  { id: 1, week: 'প্রাথমিক ওজন', ojon: '0.0' },
  { id: 2, week: '01', ojon: '--' }, { id: 3, week: '02', ojon: '--' }, { id: 4, week: '03', ojon: '--' }, { id: 5, week: '04', ojon: '--' },
  { id: 6, week: '05', ojon: '--' }, { id: 7, week: '06', ojon: '--' }, { id: 8, week: '07', ojon: '--' }, { id: 9, week: '08', ojon: '--' },
  { id: 10, week: '09', ojon: '--' }, { id: 11, week: '10', ojon: '--' }, { id: 12, week: '11', ojon: '--' }, { id: 13, week: '12', ojon: '--' },
  { id: 14, week: '13', ojon: '--' }, { id: 15, week: '14', ojon: '--' }, { id: 16, week: '15', ojon: '--' }, { id: 17, week: '16', ojon: '--' },
  { id: 18, week: '17', ojon: '--' }, { id: 19, week: '18', ojon: '--' }, { id: 20, week: '19', ojon: '--' }, { id: 21, week: '20', ojon: '--' },
  { id: 22, week: '21', ojon: '--' }, { id: 23, week: '22', ojon: '--' }, { id: 24, week: '23', ojon: '--' }, { id: 25, week: '24', ojon: '--' },
  { id: 26, week: '25', ojon: '--' }, { id: 27, week: '26', ojon: '--' }, { id: 28, week: '27', ojon: '--' }, { id: 29, week: '28', ojon: '--' },
  { id: 30, week: '29', ojon: '--' }, { id: 31, week: '30', ojon: '--' }, { id: 32, week: '31', ojon: '--' }, { id: 33, week: '32', ojon: '--' },
  { id: 34, week: '33', ojon: '--' }, { id: 35, week: '34', ojon: '--' }, { id: 36, week: '35', ojon: '--' }, { id: 37, week: '36', ojon: '--' },
  { id: 38, week: '37', ojon: '--' }, { id: 39, week: '38', ojon: '--' }, { id: 40, week: '39', ojon: '--' }, { id: 41, week: '40', ojon: '--' },

]

const OjonScreen = () => {

  const [state, setState] = useState(false);
  const [ojonFirst, setOjonFirst] = useState(false);

  const [womenOjon, setWomenOjon] = useState(ojonSavedValue);



  //================ setWomenOjon =================
  const womenAddOjon = value => {
    // console.log('Women Add ojon', value);
    // const x = 2;
    // const womenValue = { id: x, week: '01', ojon: value }
    // // setWomenOjon([...womenOjon, womenValue])

    // const valueCheck = womenOjon.filter(pd => pd.id !== x);
    // setWomenOjon([...valueCheck, womenValue])
    // console.log(valueCheck);
    Alert.alert('item saved');

  }
  // console.log(womenOjon);
  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={styles.appbarView}>
        <Text style={styles.appbarText}> ওজন  </Text>
        <Button title="click" color="#ad1457" onPress={() => setState(true)} />

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
        <Text style={styles.weekOjnoTextStyle}>ওজনের ছক</Text>

        <View style={{ backgroundColor: 'white', height: 270, }}>

        </View>

        <Text style={styles.weekOjnoTextStyle}> বিস্তারিত দেখতে গ্রাফ চাপুন </Text>

      </View>

      <Dialog
        visible={state}
        onTouchOutside={() => setState(false)}
      >
        {/* <DialogContent> */}
        {
          console.log(ojonFirst),
          ojonFirst ? <DialogOjon setState={setState} addWomenOjon={womenAddOjon} /> :
            <DialogView setState={setState} addWomenOjon={womenAddOjon} setOjonFirst={setOjonFirst} />
        }

        {/* <DialogView setState={setState} addWomenOjon={womenAddOjon} setOjonFirst={setOjonFirst} /> */}
        {/* <DialogOjon setState={setState} addWomenOjon={womenAddOjon} /> */}

        {/* </DialogContent> */}
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