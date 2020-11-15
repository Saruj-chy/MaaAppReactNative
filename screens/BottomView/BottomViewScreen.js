import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight, Button, Dimensions } from 'react-native';

const screen = Dimensions.get("screen");

const BottomViewScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const heightModal = screen.height - 300;
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', backgroundColor: 'green', fontSize: 18, textAlign: 'center' }} onPress={() => setModalVisible(true)}>Hello Bottom View</Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >

        <View
          style={{ height: 300, backgroundColor: 'red', flax: 1, marginTop: heightModal, borderColor: 'white', borderWidth: 2 }}>
          <View>
            <Button title="Hide Modal"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />

          </View>



        </View>
      </Modal>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',

  },

});


export default BottomViewScreen;