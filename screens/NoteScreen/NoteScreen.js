import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import Dialog from 'react-native-popup-dialog';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalenderPicker from '../DatePicker/CalenderPicker';
import NativeCalender from '../DatePicker/NativeCalender';
import NoteLokkonDetails from '../NoteLokkonDetails/NoteLokkonDetails';
import NoteDialog from '../NoteDialog/NoteDialog';


const NoteScreen = () => {
  const [state, setState] = useState(false);


  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={styles.appbarView}>
        <Text style={styles.appbarText}> নোট  </Text>
        <Button title="click" color="#ad1457" onPress={() => setState(true)} />

      </View>
      {/* <CalenderPicker /> */}

      <ScrollView>
        <NativeCalender />
        <NoteLokkonDetails />

      </ScrollView>
      <Dialog
        visible={state}
        onTouchOutside={() => setState(false)}

      >
        <NoteDialog setState={setState} />
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


})

export default NoteScreen;