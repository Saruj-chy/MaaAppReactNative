import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ListItem = (props) => {
  const { id, title, desc } = props.data;
  const [position, setPosition] = useState();
  const [state, setState] = useState(false);
  // console.log(props.data);

  const handleList = () => {
    console.log('position: ', id);
    setPosition(id);
    // for (let i = 0; i < 8; i++) {

    // }
    setState(!state);
    // id ? setState(true) : setState(false);
    console.log(state);

  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle} onPress={handleList}>{id}: {title}</Text>
      {
        position && state && <Text style={styles.descStyle} visibility={true}> {desc} </Text>
      }

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  titleStyle: {
    backgroundColor: '#008095',
    color: 'white',
    padding: 5,
    fontSize: 15

  },
  descStyle: {
    backgroundColor: '#ef4081',
    color: 'white',
    padding: 5,
    fontSize: 15
  }
})

export default ListItem;