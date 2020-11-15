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
        {/* <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View> */}
        <View style={{ height: 300, backgroundColor: 'red', flax: 1, marginTop: heightModal, borderColor: 'white', borderWidth: 2 }}>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});


export default BottomViewScreen;