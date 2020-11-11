import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import DialogView from './screens/dialogView/DialogView';
import JigashaScreen from './screens/Jigasha/JigashaScreen';
import OjonScreen from './screens/OjonScreen/OjonScreen';
import PickerShow from './screens/dialogView/PickerShow'
import NoteScreen from './screens/NoteScreen/NoteScreen';
import Testing from './screens/Test/Testing';
import NoteTabView from './screens/NoteTabView/NoteTabView';
import Register from './screens/Register/Register';





const App = () => {






  return (
    <View>

      {/* <JigashaScreen /> */}

      <OjonScreen />


      {/* <NoteScreen /> */}

      {/* <Testing /> */}
      {/* 
      <NoteTabView /> */}

      {/* <Register /> */}



    </View>
  )
}


export default App;
