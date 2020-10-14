import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import JigashaScreen from './screens/Jigasha/JigashaScreen';

const App = () => {
  return (
    <View>
      <View style={styles.appbarView}>
        <Text style={styles.appbarText}>জিজ্ঞাসা</Text>
      </View>
      <JigashaScreen />

    </View>
  )
}

const styles = StyleSheet.create({
  appbarView: {
    backgroundColor: '#ad1457',
  },
  appbarText: {
    color: 'white',
    fontSize: 18,
    padding: 10,
    paddingLeft: 50
  }

})

export default App;
