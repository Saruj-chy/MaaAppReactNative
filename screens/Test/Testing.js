

import React from 'react';
import { Dimensions, Text, View } from 'react-native';

const windowHeight = Dimensions.get('window').height;

const Testing = () => {

  return (
    <View style={{ backgroundColor: 'green', borderColor: 'red', borderWidth: 2, flex: 1 }}>
      <Text style={{ padding: 10 }}>Hello man {windowHeight}</Text>
      <Text style={{ padding: 10, marginBottom: 10, justifyContent: 'flex-end', position: 'absolute', bottom: 0 }}>Hello man {windowHeight}</Text>
    </View>
  );
};

export default Testing;