import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
var SharedPreferences = require('react-native-shared-preferences');



const DialogView = ({ SetState, AddWomenOjon, SetOjonFirst, SetBMIValue }) => {

  // const { stateSetUp } = props.setUp;

  const [pound, setPound] = useState('');
  const [kilogram, setKilogram] = useState('');
  const [clickKg, setClickKg] = useState(false);
  const [clickPound, setClickPound] = useState(false);

  const handleAddKg = text => {
    setKilogram(text);
    text === '' ? setClickKg(false) : setClickKg(true);
    const x = 2.2;
    const poundValue = text * x;
    setPound(poundValue.toFixed(1).toString());

  }


  const handleAddPound = text => {
    text === '' ? setClickPound(false) : setClickPound(true);
    const y = 2.2;
    const kilogramValue = text / y;
    setKilogram(kilogramValue.toFixed(1).toString());

  }
  // ==================================   Height(cm to feet)
  const [feet, setFeet] = useState('');
  const [inch, setInch] = useState('');
  const [feetState, setFeetState] = useState(false);

  const handleAddCM = text => {
    text === '' ? setFeetState(false) : setFeetState(true);

    const x = 30.48;
    const feetValue = text / x;
    console.log(feetValue);
    const result = feetValue.toFixed(1).toString();
    const arrayValue = (result + "").split(".");

    setCmValue(text);
    setFeet(arrayValue[0]);
    setInch(arrayValue[1]);
  }

  //================================   Height (feet to cm)
  const [cmState, setCmState] = useState(false);
  const [cent, setCent] = useState({
    feet: '',
    inch: ''
  });
  const [cmValue, setCmValue] = useState('');
  const handleAddFeet = text => {
    const centValue = { ...cent, feet: text };
    setCent(centValue)
    console.log(centValue);

    handleFeetInch(centValue);
  }
  const handleAddInch = text => {
    const centValue = { ...cent, inch: text };
    setCent(centValue)
    console.log(centValue);
    handleFeetInch(centValue);

  }
  const handleFeetInch = centValue => {
    centValue.feet === '' && centValue.inch === '' ? setCmState(false) : setCmState(true);

    const value = centValue.feet + '.' + centValue.inch;
    const x = 30.48;
    console.log(value);
    const centResult = (value * x).toFixed(1).toString();
    setCmValue(centResult);


  }

  //========================          SavedValue

  const SavedValue = (kilogram) => {
    if (clickPound || clickKg && cmState || feetState) {
      AddWomenOjon(kilogram);
      SetState(false);
      SetOjonFirst(true);
      // console.log('Inch :   ', cmValue);
      const bmi = CalculateBMI(kilogram, cmValue);
      // console.log('bmi saved:  ', bmi);
      SetBMIValue(bmi);
      SharedPreferences.setItem("bmi_value", bmi.toString());
      SharedPreferences.setItem("initial_ojon", kilogram.toString());
    }
    else {
      alert('please fill all field');
    }
  }

  const CalculateBMI = (kilogram, cmValue) => {
    let bmi, squareMeter;
    squareMeter = cmValue / 100;
    bmi = kilogram / (squareMeter * squareMeter);
    return bmi;
  }


  return (
    <View style={styles.dialogContainer}>
      <Text style={styles.dialogText}>আপনার প্রাথমিক ওজন ও উচ্চতা দিন </Text>
      <View style={{ backgroundColor: 'white' }}>

        <View style={styles.layoutView}>
          <Text style={styles.layoutName}>ওজন</Text>

          <View style={styles.itemText}>
            {
              clickPound ?
                <TextInput style={styles.inputStyle} placeholder="0.0" onChangeText={text => handleAddKg(text)} keyboardType="numeric" defaultValue={kilogram} /> :
                <TextInput style={styles.inputStyle} placeholder="0.0" onChangeText={text => handleAddKg(text)} keyboardType="numeric" />
            }

            <Text style={styles.textStyle}>কেজি</Text>
          </View>

          <View style={styles.itemText}>
            {
              clickKg ?
                <TextInput style={styles.inputStyle} placeholder="0.0" onChangeText={text => handleAddPound(text)}
                  keyboardType="numeric" defaultValue={pound} /> :
                <TextInput style={styles.inputStyle} placeholder="0.0" onChangeText={text => handleAddPound(text)}
                  keyboardType="numeric" />
            }
            <Text style={styles.textStyle}> পাউন্ড </Text>
          </View>

        </View>

        <View style={styles.layoutView}>
          <Text style={styles.layoutName}>উচ্চতা</Text>

          <View style={{ ...styles.itemText, marginLeft: 10 }}>
            {
              cmState ?
                <TextInput style={styles.inputStyle} placeholder="0.0" onChangeText={text => handleAddCM(text)} keyboardType="numeric" defaultValue={cmValue} /> :
                <TextInput style={styles.inputStyle} placeholder="0.0" onChangeText={text => handleAddCM(text)} keyboardType="numeric" />
            }
            <Text style={styles.textStyle}>সেমি</Text>
          </View>

          <View style={{ flex: 1.5, flexDirection: 'row', }}>
            <View style={{ ...styles.itemText, marginLeft: 10, marginRight: 10 }}>
              {
                feetState ?
                  <TextInput style={styles.inputStyle} placeholder="0" onChangeText={text => { handleAddFeet(text); }} keyboardType="numeric" defaultValue={feet} /> :
                  <TextInput style={styles.inputStyle} placeholder="0" onChangeText={text => { handleAddFeet(text); }} keyboardType="numeric" />
              }
              <Text style={styles.textStyle}> ফিট </Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'column', paddingRight: 5 }}>
              {
                feetState ?
                  <TextInput style={styles.inputStyle} placeholder="0" onChangeText={text => { handleAddInch(text); }} keyboardType="numeric" defaultValue={inch} /> :
                  <TextInput style={styles.inputStyle} placeholder="0" onChangeText={text => { handleAddInch(text); }} keyboardType="numeric" />
              }
              <Text style={styles.textStyle}> ইঞ্চি  </Text>
            </View>

          </View>

        </View>

        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
          <Text style={{ flex: 2 }}></Text>
          <Text style={{ flex: 1, textAlign: 'center', color: '#890e4f' }} onPress={() => SetState(false)} > বাতিল </Text>
          <Text style={{ flex: 1, color: '#890e4f' }}
            onPress={() => {
              SavedValue(kilogram);
            }}> সংরক্ষণ </Text>
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

export default DialogView;