import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const OjonSavedScreen = (props) => {
  const { week, ojon } = props.value;
  return (
    <View style={{ flexDirection: 'row', padding: 5 }}>
      <Text style={styles.weekViewText}> {week}</Text>
      <Text style={styles.weekViewText}>{ojon}</Text>

    </View>
  );
};


const styles = StyleSheet.create({

  weekViewText: {
    color: 'black',
    fontSize: 16,
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 2,
    textAlign: 'center'
  }

})

export default OjonSavedScreen;