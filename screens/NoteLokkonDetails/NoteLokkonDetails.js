import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const NoteLokkonDetails = () => {
  return (
    <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, }}>

      <View style={styles.itemStyle}>
        <Text style={styles.textHeadingStyle}>নোট</Text>
        <Text style={styles.textValueStyle}>তারিখঃ 19-10-2020 </Text>
        <Text style={{ color: 'white', paddingBottom: 5 }}>কোন নোট পাওয়া যায় নি </Text>

      </View>
      <View style={styles.itemStyle}>
        <Text style={styles.textHeadingStyle}> লক্ষণ </Text>
        <Text style={styles.textValueStyle}>কোন লক্ষণ পাওয়া যায় নি </Text>


      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  itemStyle: {
    flex: 1,
    marginRight: 3,
    backgroundColor: '#ad1457',
    borderRadius: 5,
    overflow: 'hidden'
  },
  textHeadingStyle: {
    color: 'white',
    paddingLeft: 5,
    fontWeight: 'bold',
    backgroundColor: '#890e4f',
    fontSize: 18,
  },
  textValueStyle: {
    color: 'white',
    paddingTop: 5,
    paddingBottom: 20,
  },
});

export default NoteLokkonDetails;