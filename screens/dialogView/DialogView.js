import React from 'react';
import { Text, View } from 'react-native';

const DialogView = () => {
  return (
    <View style={{ backgroundColor: '#ad1457', width: 300 }}>
      <Text style={{ color: 'white', fontSize: 18, marginHorizontal: 20, marginVertical: 20 }}>আপনার ওজন দিন </Text>
      <View style={{ backgroundColor: 'white' }}>
        <Text style={{ textAlign: 'center' }}> সপ্তাহ নংঃ 1 </Text>
        <View style={{ height: 0.5, backgroundColor: 'gray', marginBottom: 200, }}></View>

        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <Text style={{ flex: 2 }}></Text>
          <Text style={{ flex: 1, textAlign: 'center', color: '#ad1457' }}> বাতিল </Text>
          <Text style={{ flex: 1, color: '#ad1457' }}> সংরক্ষণ </Text>
        </View>

      </View>

    </View>
  );
};

export default DialogView;