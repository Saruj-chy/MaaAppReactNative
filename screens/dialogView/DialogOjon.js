import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';


const DialogOjon = (props) => {

  const [kilogram, setKilogram] = useState('');

  return (
    <View style={styles.dialogContainer}>
      <Text style={styles.dialogText}>আপনার ওজন দিন </Text>
      <View style={{ backgroundColor: 'white' }}>



        <View >
          <Text style={{
            textAlign: 'center', color: 'black', fontSize: 15, borderBottomWidth: 0, shadowColor: 'black', shadowOpacity: 0.4, elevation: 1, padding: 5
          }}> সপ্তাহ নংঃ 1</Text>
          {/* <View style={{ height: 0.5, backgroundColor: 'gray' }}></View> */}
          <TextInput
            style={{ textAlign: 'center', shadowColor: 'black', shadowOpacity: 1, elevation: 1, margin: 20, }}
            placeholder="Enter your weight"
            onChangeText={text => setKilogram(text)}
          />
        </View>






        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
          <Text style={{ flex: 2 }}></Text>
          <Text style={{ flex: 1, textAlign: 'center', color: '#890e4f' }} onPress={() => props.setState(false)} > বাতিল </Text>
          <Text style={{ flex: 1, color: '#890e4f' }}
            onPress={() => { props.addWomenOjon(kilogram); props.setState(false) }}> সংরক্ষণ </Text>
        </View>

      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: '#890e4f',
    width: 300
  },
  dialogText: {
    color: 'white',
    fontSize: 18,
    marginHorizontal: 20,
    marginVertical: 20,
    textAlign: 'center'
  },
  layoutView: {
    flexDirection: 'row',
    padding: 5
  },
  layoutName: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15
  },
  inputStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    textAlign: 'center',
    fontSize: 15
  },
  itemText: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 20,
    marginLeft: 20
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 15
  },


})

export default DialogOjon;