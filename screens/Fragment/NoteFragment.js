import React, { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';

var SharedPreferences = require('react-native-shared-preferences');


const NoteFragment = () => {
  const [value, setValue] = React.useState('Enter Your Note...');

  SharedPreferences.setItem("key", value);
  console.log(value);

  return (
    <View style={{ flex: 1, justifyContent: 'center', }}>
      <TextInput
        placeholder="Enter Your Note..."
        style={{ borderColor: '#ad1457', borderBottomWidth: 2, margin: 20, fontSize: 18 }}
        onChangeText={text => setValue(text)}
      // autoFocus={true}
      // blurOnSubmit={false}
      />

      <Button
      title="Enter"
      />

    </View>
  );
};

export default NoteFragment;