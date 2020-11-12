import React, { useEffect, useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor
} from 'react-native';

import { LineChart } from 'react-native-charts-wrapper';

const LineChartScreen = ({ WeightMax, WeightMin }) => {



  const ConfigA = {
    lineWidth: 2,
    drawValues: false,
    drawCircles: false,
    highlightColor: processColor('red'),
    color: processColor('red'),
    // drawFilled: true,
    fillColor: processColor('blue'),
    fillAlpha: 60,
    highlightEnabled: false,
    dashedLine: {
      lineLength: 20,
      spaceLength: 0
    }
  };
  const ConfigB = {
    lineWidth: 2,
    drawValues: false,
    drawCircles: false,
    // highlightColor: processColor('red'),
    color: processColor('blue'),
    // drawFilled: true,
    fillColor: processColor('red'),
    fillAlpha: 60,
    highlightEnabled: false,
    dashedLine: {
      lineLength: 20,
      spaceLength: 0
    }
  };
  const ConfigC = {
    lineWidth: 2,
    drawValues: false,
    drawCircles: false,
    highlightColor: processColor('red'),
    color: processColor('orange'),
    // drawFilled: true,
    fillColor: processColor('red'),
    fillAlpha: 60,
    highlightEnabled: false,
    dashedLine: {
      lineLength: 20,
      spaceLength: 0
    }
  };

  const ConfigValues = weight => {
    let temp = [];
    for (let i = 0; i <= 40; i++) {
      temp.push({ x: i, y: weight[i] })
    }
    return temp;
  }



  const DataSets = {
    dataSets: [{
      values: ConfigValues(WeightMax),
      label: 'ন্যূনত্বম ওজন ',
      config: ConfigA
    }, {
      values: [
        { x: 0, y: 100 },
        { x: 1, y: 101 },
        { x: 5, y: 102 },
        { x: 10, y: 103 },
        { x: 15, y: 105 },

      ],
      label: 'বর্তমান ওজন ',
      config: ConfigB
    }, {
      values: ConfigValues(WeightMin),
      label: ' সর্বোচ্চ ওজন',
      config: ConfigC
    }],
  };



  const xAxis = {
    granularityEnabled: true,
    granularity: 5,
  };


  const yAxis = {
    left: {
      // axisMinimum: 80,
      // axisMaximum: 1000

    },
    right: { enabled: true }
  }



  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <LineChart
          style={styles.chart}
          data={DataSets}
          chartDescription={{ text: 'X-Weeks, Y-weight' }}
          // marker={marker}

          xAxis={xAxis}
          yAxis={yAxis}
          drawGridBackground={true}
          borderColor={processColor('red')}
          borderWidth={2}
        // drawBorders={true}
        // legend={legend}
        // onSelect={() => { SelectedMaxMinWeight(40); }}
        // onChange={() => { DataValues(weightMax) }}

        />
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    // marginTop: 100,
    // margin: 10
  },
  chart: {
    // flex: 1,
    height: 280,
    borderWidth: 2,
    borderColor: 'red',
    // color: 'red',
    // backgroundColor: 'red'
  }
});

export default LineChartScreen;
