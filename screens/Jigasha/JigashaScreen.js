import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListItem from '../ListItem/ListItem';

const JigashaScreen = () => {
  const jigashaData = [
    { id: 1, title: "title in this list 1", desc: ' list 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },
    { id: 2, title: "title in this list 2", desc: 'list 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },
    { id: 3, title: "title in this list 3", desc: 'list 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },
    { id: 4, title: "title in this list 4", desc: 'list 4 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },
    { id: 5, title: "title in this list 5", desc: 'list 5 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },
    { id: 6, title: "title in this list 6", desc: 'list 6 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },
    { id: 7, title: "title in this list 7", desc: 'list 7 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },
    { id: 8, title: "title in this list 8", desc: 'list 8 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },

  ]



  return (
    <View>
      <View style={styles.appbarView}>
        <Text style={styles.appbarText}>জিজ্ঞাসা</Text>
      </View>
      {
        jigashaData.map(pd => <ListItem data={pd} key={pd.id} />)
      }

    </View>
  );
};


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

export default JigashaScreen;