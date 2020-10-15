import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import OjonSavedScreen from './OjonSavedScreen';

const ojonSavedValue = [
  { week: 'প্রাথমিক ওজন', ojon: 75.0 },
  { week: '01', ojon: 70.0 },
  { week: '02', ojon: 70.0 },
  { week: '03', ojon: 70.0 },
  { week: '04', ojon: 70.0 },
  { week: '05', ojon: 70.0 },
  { week: '06', ojon: 70.0 },
  { week: '07', ojon: 70.0 },
  { week: '08', ojon: 70.0 },
  { week: '09', ojon: 70.0 },
  { week: '01', ojon: 70.0 },
  { week: '01', ojon: 70.0 },
  { week: '01', ojon: 70.0 },
  { week: '01', ojon: 70.0 },
  { week: '01', ojon: 70.0 },
  { week: '01', ojon: 70.0 },
  { week: '01', ojon: 70.0 },
]

const OjonScreen = () => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={styles.appbarView}>
        <Text style={styles.appbarText}> ওজন  </Text>
        <Button title="click" color="#ad1457" />
      </View>

      {/* Weekly Ojon List */}

      <View style={styles.layoutStyle}>
        <Text style={styles.weekOjnoTextStyle}>সাপ্তাহিক ওজন </Text>
        <View style={{ backgroundColor: 'gray', marginBottom: 5, }}>
          <View style={{ flexDirection: 'row', padding: 5 }}>
            <Text style={styles.weekViewText}>সপ্তাহ নংঃ </Text>
            <Text style={styles.weekViewText}>ওজন(কেজি) </Text>

          </View>
          <View style={{ height: 1, marginHorizontal: 10, backgroundColor: 'white' }}></View>

          <ScrollView style={{ height: 200, }} >
            {
              ojonSavedValue.map(data => <OjonSavedScreen value={data} key={data.key} />)
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
    // backgroundColor: 'red',
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
  }

})

export default OjonScreen;