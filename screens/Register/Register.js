import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'MaaDatabase.db' });

const Register = () => {

  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');

  let register_user = () => {
    console.log(userName, userContact, userAddress);

    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }

    db.transaction(function (tx) {
      console.log('object');
      tx.executeSql(
        'INSERT INTO note_lokkon (user_name, user_contact, user_address) VALUES (?,?,?)',
        [userName, userContact, userAddress],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  // onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Registration Failed');
        }
      );
    });
  };


  return (
    <View>
      <TextInput
        placeholder="Enter Name"
        onChangeText={
          (userName) => setUserName(userName)
        }
        style={{ padding: 10 }}
      />
      <TextInput
        placeholder="Enter Name"
        onChangeText={
          (userName) => setUserContact(userName)
        }
        style={{ padding: 10 }}
      />
      <TextInput
        placeholder="Enter Name"
        onChangeText={
          (userName) => setUserAddress(userName)
        }
        style={{ padding: 10 }}
      />

      <Button
        title="Save"
        onPress={register_user} />
      {/* <Button
        title="Show"
        onPress={register_user} /> */}




    </View>
  );
};

export default Register;