import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';

const NoteLokkonDetails = ({ NoteLokkonData, NoteView, DialogPressable }) => {

  const lokkonDetails = (item, index) => {
    // console.log('index : ', index);
    const numb = ['১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯', '১০', '১১', '১২', '১৩', '১৪', '১৫', '১৬', '১৭', '১৮', '১৯', '২০', '২১', '২২', '২৩', '২৪', '২৫', '২৬', '২৭', '২৮', '২৯', '৩০']
    return (
      <View>
        <Text style={styles.textValueStyle}>  {numb[index]}. {item.name} : {item.first} </Text>
      </View>
    )
  }
  return (
    <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, }}>

      <Pressable style={styles.itemStyle} onPress={() => DialogPressable(1)}>
        <View >
          <Text style={styles.textHeadingStyle}>নোট</Text>
          <Text style={styles.textValueStyle}>তারিখঃ   {NoteView.date} </Text>
          <Text style={{ color: 'white', paddingBottom: 5 }}> {NoteView.note}</Text>

        </View>
      </Pressable>

      <Pressable style={styles.itemStyle} onPress={() => DialogPressable(1)}>
        <View >
          <Text style={styles.textHeadingStyle}> লক্ষণ </Text>
          {
            NoteLokkonData.length > 0 ?
              NoteLokkonData.map((item, index) => lokkonDetails(item, index)) :
              <Text style={styles.textValueStyle}>কোন লক্ষণ পাওয়া যায় নি </Text>

          }


        </View>
      </Pressable>

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