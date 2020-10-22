import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicks = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showDate, setShowDate] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setShowDate(selectedDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <View>
      {/* <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <Text style={{ marginTop: 50, fontSize: 18, color: 'red' }}>Date: {date.toString().substr(4, 12)} </Text> */}
      <View style={{ position: 'absolute', top: 0, backgroundColor: 'red' }}>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          minimumDate={new Date(2019, 12, 31)}
          maximumDate={new Date(2021, 11, 31)}
          textColor='red'
          mode='date'
          is24Hour={true}
          display="default"
          onChange={onChange}
          style={{ width: 100, height: 200, backgroundColor: 'red' }}
          disabled={true}
        />

      </View>

      <Text style={{ marginTop: 50, fontSize: 18, color: 'red' }}>Date: {date.toString().substr(4, 12)} </Text>


    </View>
  );
};

export default DatePicks;