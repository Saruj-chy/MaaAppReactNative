import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import ListItem from '../ListItem/ListItem';

const JigashaScreen = ({ history }) => {
  const [stateView, setStateView] = useState([]);
  const jigashaData = [
    { id: 1, jigasha_no: '১', title: "অটিজম কি", desc: 'অটিজম স্পেকট্রাম ডিজঅর্ডার ( এ এস ডি) একটি জটিল স্নায়বিক বিকাশ সংক্রান্ত রোগের শ্রেণী। সামাজিক বিকলতা, কথা বলার প্রতিবন্ধকতা, এবং সীমাবদ্ধ, পুনরাবৃত্তিমূলক এবং একই ধরনের আচরণ দ্বারা এটা চিহ্নিত হয়। এটা একটি মস্তিষ্কের রোগ যা সাধারণত একজন ব্যক্তির অন্যদের সাথে কথা বলার ক্ষমতাকে প্রভাবিত করে। এ এস ডি ধরণের রোগ সাধারণত শৈশবে শুরু হয় এবং বড় হওয়া পর্যন্ত থাকে।' },

    { id: 2, jigasha_no: '২', title: "এ এস ডি র ধরণগুলো হল কি কি? ", desc: 'এটা অটিজমের সাধারণ ধরন। অটিস্টিক ডিজঅর্ডারে আক্রান্ত লোকেদের সাধারণত গুরুত্বপূর্ণভাবে ভাষাগত বাধা থাকে। এক্ষেত্রে সামাজিক ও ভাষা বিনিময়ে প্রতিবন্ধকতা থাকে এবং অস্বাভাবিক আচরণ দেখা যায় । এই রোগে আক্রান্ত অনেক লোকের বুদ্ধিগত অক্ষমতা থাকতে পারে।' },

    { id: 3, jigasha_no: '৩', title: "এসপারজার সিন্ড্রোম কি? ", desc: 'এসপারজার সিন্ড্রোমে আক্রান্ত লোকেদের অটিস্টিক ডিজঅর্ডারের হালকা উপসর্গ থাকে। এদের মধ্যে সামাজিক প্রতিবন্ধকতা এবং অস্বাভাবিক আচরণ দেখা দিতে পারে। যাইহোক, এদের সাধারণত ভাষা বা বুদ্ধিবৃত্তিক অক্ষমতা বা সমস্যা থাকে না।' },

    { id: 4, jigasha_no: '৪', title: "পার্ভেসিভ ডেভোলাপমেন্টাল ডিজঅর্ডার (ব্যাপকভাবে বৃদ্ধি সংক্রান্ত রোগ  – অন্যভাবে চিহ্নিত করা যায় না (পি ডি ডি -এন ও এস নামে)  কি ? ", desc: 'এটিকে “এটিপিকাল অটিজম” বলা হয়। যেসব লোকেদের মধ্যে অটিস্টিক ডিজঅর্ডার বা এসপারজার সিন্ড্রোম  নির্ণায়ক কিছু উপসর্গ দেখা যায় , কিন্তু সব উপসর্গ দেখা যায় না , তাদের সাধারণত: পি ডি ডি -এন ও এস হিসাবে রোগ নির্ণয় করা হতে পারে। পি ডি ডি -এন ও এস আক্রান্ত লোকেদের মধ্যে সাধারণত অটিস্টিক ডিজঅর্ডারে আক্রান্ত লোকেদের থেকে কম এবং হালকা উপসর্গ দেখা যায়। এই উপসর্গগুলি শুধুমাত্র সামাজিক ও ভাষা বিনিময় সংক্রান্ত প্রতিবন্ধকতা সৃষ্টি করতে পারে।' },

    { id: 5, jigasha_no: '৫', title: "একজন এ এস ডি আক্রান্ত শিশুর মধ্যে যা যা দেখা দিতে পারে ", desc: '১২ মাস বয়সেও তার নাম ধরে ডাকলে প্রতিক্রিয়া করে না \n ১৮ মাস বয়সে খেলতে পারে না \n এরা সাধারণত অন্যের চোখের দিকে সোজাসুজি তাকানো এড়িয়ে যায় এবং একা থাকতে পছন্দ করে \n এই শিশুরা অন্য মানুষের অনুভূতি বুঝতে বা তাদের নিজস্ব অনুভূতি নিয়ে কথা বলতে অসুবিধা অনুভব করে \n এই শিশুরা দেরী করে কথা বলা এবং ভাষা ব্যবহারের দক্ষতা অর্জন করতে পারে \n শব্দ বা ছোটো ছোটো বাক্য বারবার বলতে থাকে(ইকোলালিয়া) \n প্রশ্নের সঙ্গে সম্পর্কহীন উত্তর দেয়' },

    { id: 6, jigasha_no: '৬', title: "অটিজম কি পুরোপুরি নিরাময় সম্ভব? চিকিৎসার জন্য কোথায় যাবেন?", desc: 'অতি দুঃখের সাথে জানাচ্ছি যে অটিজম পুরোপুরি নিরাময় করা আজ পর্যন্ত সম্ভব হয়নি। কিন্তু সঠিক টেস্ট, চিকিৎসা, থেরাপি এবং কাউন্সেলিং এর মাধ্যমে শিশুদের ৯০ থেকে ৯৫ ভাগ জীবন আচরণ স্বাভাবিক গন্ডির মধ্যে নিয়ে আসা সম্ভব। বর্তমানে দেশের অনেক শিশুই অটিস্টিক হওয়া সত্তেও স্বাভাবিক জীবনের সাথে মানিয়ে চলতে সক্ষম হচ্ছে। এই জন্য আপনাকে সবচেয়ে বেশি সাহায্য করতে পারে নিউরোজেন। আমাদের আছে দেশের সেরা থেরাপিস্ট, জেনেটিক এক্সপার্ট এবং কাউন্সিলর। তারা আপনার শিশুর সুচিকিৎসা নিশ্চিত করতে বদ্ধ পরিকর।' },

    { id: 7, jigasha_no: '৭', title: "title in this list 7", desc: 'list 7 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },
    { id: 8, jigasha_no: '৮', title: "title in this list 8", desc: 'list 8 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },
    { id: 9, jigasha_no: '৯', title: "title in this list 9", desc: 'list 8 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },
    { id: 10, jigasha_no: '১০', title: "title in this list 10", desc: 'list 8 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },
    { id: 11, jigasha_no: '১১', title: "title in this list 11", desc: 'list 8 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },
    { id: 12, jigasha_no: '১২', title: "title in this list 12", desc: 'list 8 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },
    { id: 13, jigasha_no: '১৩', title: "title in this list 13", desc: 'list 8 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },
    { id: 14, jigasha_no: '১৪', title: "title in this list 14", desc: 'list 8 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },
    { id: 15, jigasha_no: '১৫', title: "title in this list 15", desc: 'list 8 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },
    { id: 16, jigasha_no: '১৬', title: "title in this list 16", desc: 'list 8 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },
    { id: 17, jigasha_no: '১৭', title: "title in this list 17", desc: 'list 8 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },
    { id: 18, jigasha_no: '১৮', title: "title in this list 18", desc: 'list 8 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias est beatae earum commodi!' },

  ];

  const listArray = (position) => {
    let temp = [];
    for (let i = 0; i < jigashaData.length; i++) {
      i === position - 1 ? temp.push({ id: jigashaData[i].id, state: true }) : temp.push({ id: jigashaData[i].id, state: false })

    }
    setStateView(temp);
  }

  return (
    <View>
      <View style={styles.appbarView}>
        <Button title="Back" onPress={() => history.push('/')} />
        <Text style={styles.appbarText}>জিজ্ঞাসা</Text>
      </View>
      <ScrollView style={{ marginBottom: 50 }}>
        {
          jigashaData.map(pd => <ListItem data={pd} key={pd.id} ListArray={listArray} StateView={stateView} />)
        }
      </ScrollView>

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