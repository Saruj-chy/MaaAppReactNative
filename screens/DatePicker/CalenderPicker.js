import React, { useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';



const CalenderPicker = () => {
  const [date, setDate] = useState('');

  const clickedDay = day => {
    console.log('selected day', day)
    console.log('object: ', day.dateString);
    setDate(day.dateString);
  }

  return (
    <Calendar

      current={date}


      minDate={'2020-01-01'}

      maxDate={'2022-12-31'}

      onDayPress={(day) => clickedDay(day)}

      todayTextColor="green"
      selectedDayTextColor="red"
      selectedDayBackgroundColor="red"
      selectedDayColorStyle={{ backgroundColor: 'green' }}
      textDayFontSize={15}

      // onDayLongPress={(day) => { console.log('selected day', day) }}

      // monthFormat={'yyyy MM'}

      // onMonthChange={(month) => { console.log('month changed', month) }}

      // hideArrows={true}

      // renderArrow={(direction) => (<Arrow />)}

      hideExtraDays={true}


      // disableMonthChange={true}

      firstDay={5}

      // hideDayNames={true}

      // showWeekNumbers={true}

      // onPressArrowLeft={subtractMonth => subtractMonth()}

      // onPressArrowRight={addMonth => addMonth()}

      // disableArrowLeft={true}

      // disableArrowRight={true}

      // disableAllTouchEventsForDisabledDays={false}

      // renderHeader={(date) => {/*Return JSX*/ }}

      enableSwipeMonths={true}



      // Specify style for calendar container element. Default = {}
      style={{
        // borderWidth: 1,
        borderColor: 'gray',
        height: 350,
        margin: 10,
        shadowColor: 'black',
        shadowOpacity: 0.4,
        elevation: 1,
      }
      }
      // Specify theme properties to override specific styles for calendar parts. Default = {}
      theme={{
        backgroundColor: 'red', //brown // =====
        calendarBackground: 'white',  // background color
        textSectionTitleColor: 'gray', //day color
        textSectionTitleDisabledColor: 'yellow', //=====
        selectedDayBackgroundColor: 'orange',
        selectedDayTextColor: 'green',
        // todayTextColor: 'red', //select color
        dayTextColor: 'black', // date color
        textDisabledColor: 'gray', // onno month er date color
        selectedDotColor: 'black',
        arrowColor: '#890e4f',                  //  arrow color
        disabledArrowColor: 'green',
        monthTextColor: 'black',
        indicatorColor: 'pink',

        textDayFontFamily: 'monospace',
        textMonthFontFamily: 'monospace',
        textDayHeaderFontFamily: 'monospace',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16
      }}


    />
  );
};

export default CalenderPicker;