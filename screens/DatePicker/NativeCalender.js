import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const NativeCalender = ({ LokhonTableData }) => {
  const [date, setDate] = useState('');

  const minDate = new Date(); // Today
  const maxDate = new Date(2021, 12, 31);

  const onDateChange = (date) => {

    // console.log('object', date, 'START_DATE');
    const yearDate = date._i.day + '-' + parseInt(date._i.month + 1) + '-' + date._i.year;
    console.log(yearDate);
    setDate(yearDate);
    // console.log('yearDate:  ', yearDate);

    LokhonTableData(yearDate);

  }


  return (
    <View style={styles.container}>
      <CalendarPicker
        onDateChange={(date) => onDateChange(date)}
        todayBackgroundColor="transparent"
        todayTextStyle={{ color: 'black' }}
        selectedDayColor="#ad1357"
        selectedDayTextColor="white"

        previousTitle=" "
        nextTitle=" "
        nextTitleStyle={styles.triangle1}
        previousTitleStyle={styles.triangle2}

        height={600}
        enableDateChange={true}

        dayShape='circle' //circle, square




        // selectedDayStyle={{ backgroundColor: 'red', margin: 20, borderColor: 'blue', borderWidth: 2 }}

        // minDate={minDate}
        // maxDate={maxDate}

        // startFromMonday={true}
        // allowRangeSelection={true}  // not






        selectedRangeEndStyle={{ minDate: '12-1-10' }}
        selectedRangeStartStyle={{ backgroundColor: 'orange' }}

        monthYearHeaderWrapperStyle={{ color: 'red', fontSize: 25, }}

        textStyle={{
          fontFamily: 'Cochin',
          color: 'black',
          fontSize: 16,
          // padding: 5

        }}

      />

      {/* <View style={{ marginTop: 100 }}>
        <Text>SELECTED DATE:{date}</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    margin: 10,
    borderColor: 'red',
    // borderWidth: 2,
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 1,

  },
  triangle1: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: "#780b45",
    transform: [
      { rotate: '90deg' }
    ],
    margin: 0,
    marginLeft: 0,
    borderWidth: 0,
    // borderColor: "black"
  },
  triangle2: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: "#780b45",
    transform: [
      { rotate: '270deg' }
    ],
    margin: 0,
    marginLeft: 0,
    borderWidth: 0,
    // borderColor: "black"
  },
});

export default NativeCalender;

// #ad1457