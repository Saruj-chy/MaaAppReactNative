import React from 'react';
import { Button, View, SafeAreaView } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1, marginTop: 50 }}>
          <Button
            title="OjonScreen"
            onPress={() => navigation.navigate('ojon')}
          />
          <View style={{ height: 20 }} />
          <Button
            title="NoteScreen"
            onPress={() => navigation.navigate('note')}
          />
          <View style={{ height: 20 }} />
          <Button
            title="JigashaScreen"
            onPress={() => navigation.navigate('jigasha')}
          />
          <View style={{ height: 20 }} />
          <Button
            title="Bottom View"
            onPress={() => navigation.navigate('bottom')}
          />

        </View>

      </View>
    </SafeAreaView>
  );
};

export default Home;