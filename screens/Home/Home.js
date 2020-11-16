/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


const Separator = () => (
  <View style={styles.separator} />
);

const Home = ({ history }) => {
  return (
    <View style={styles.container}>

    <Text> </Text>

      <Button title="Ojon Screen" onPress={() => history.push('/ojon')} />
      <Separator />
      <Button title="Note Screen" onPress={() => history.push('/note')} />
      <Separator />
      <Button title="Jigasha Screen" onPress={() => history.push('/jigasha')} />
      <Separator />
      <Button title="Bottom View" onPress={() => history.push('/bottom')} />



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 20,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

});
export default Home;