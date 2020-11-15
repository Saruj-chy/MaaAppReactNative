import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ListItem = ({ data, ListArray, StateView }) => {
  const { id, jigasha_no, title, desc } = data;
  const [position, setPosition] = useState();
  const [state, setState] = useState(false);

  const handleList = () => {

    setPosition(id);
    setState(!state);

    if (StateView.length > 0) {
      if (StateView[id - 1].state === true) {
        ListArray(-1);
      }
      else {
        ListArray(id);
      }
    }
    else {
      ListArray(id);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle} onPress={() => { handleList(); }}>{jigasha_no}: {title}</Text>
      {
        StateView.length > 0 ? StateView[id - 1].state && <Text style={styles.descStyle}> {desc} </Text> :
          position && state && <Text style={styles.descStyle}> {desc} </Text>
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