import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { databaseName } from '../Constant/Constant';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: databaseName });

const NoteFragment = ({ SavedValue, CurrentDateNoteDialog }) => {

  const [value, setValue] = useState('');

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM note_save WHERE date=?',
        [CurrentDateNoteDialog.date],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          // console.log('table date========: ', temp[0].note, CurrentDateNoteDialog.date);
          setValue(temp[0].note);

        }
      );
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', }}>
      <TextInput
        placeholder="Enter Your Note..."
        style={{ borderColor: '#ad1457', borderBottomWidth: 2, margin: 20, fontSize: 18 }}
        onChangeText={text => SavedValue(text)}
        defaultValue={value}
      // autoFocus={true}
      // blurOnSubmit={false}
      />

    </View>
  );
};

export default NoteFragment;