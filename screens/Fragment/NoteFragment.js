import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const NoteFragment = () => {

  return (
    <View style={{ flex: 1, justifyContent: 'center', }}>
      <TextInput
        placeholder="Enter Your Note..."
        style={{ borderColor: '#ad1457', borderBottomWidth: 2, margin: 20, fontSize: 18 }}
        autoFocus={true}
        blurOnSubmit={false}

      />
    </View>
  );
};

export default NoteFragment;