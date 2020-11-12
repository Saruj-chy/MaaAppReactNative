import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BottomViewScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', backgroundColor: 'green', fontSize: 18, textAlign: 'center' }}>Hello Bottom View</Text>

      <View style={{ color: 'green', height: 50, width: 50, backgroundColor: 'green', textAlign: 'right', }}>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',

  }


})

export default BottomViewScreen;