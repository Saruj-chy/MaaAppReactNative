import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const NoteDialog = () => {
  return (
    <View style={styles.dialogContainer}>
      <Text style={styles.dialogText}>আজ কেমন অনুভব করছেন? </Text>
      <Text style={{ fontSize: 16, color: 'white', marginHorizontal: 15 }}>October 21, 2020 </Text>
      <View style={{ backgroundColor: 'white', height: 150 }}>

      </View>

      <View style={{ flexDirection: 'row', paddingVertical: 20, backgroundColor: 'white', borderColor: 'gray', borderTopWidth: 0.2, marginHorizontal: 10 }}>
        <Text style={{ flex: 2 }}></Text>
        <Text style={{ flex: 1, textAlign: 'center', color: 'green' }}  > বাতিল </Text>
        <Text style={{ flex: 1, color: 'green' }}> সংরক্ষণ </Text>
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: '#ad1457',
    width: 300
  },

  dialogText: {
    color: 'white',
    fontSize: 16,
    marginHorizontal: 15,
    marginVertical: 10,
    fontWeight: 'bold',
    // textAlign: 'center'
  },



})

export default NoteDialog;