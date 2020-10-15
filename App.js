import React from 'react';
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

const App = () => {
  return (
    <View>

      {/* <JigashaScreen /> */}

      <OjonScreen />

      {/* <DialogView /> */}

    </View>
  )
}


export default App;
