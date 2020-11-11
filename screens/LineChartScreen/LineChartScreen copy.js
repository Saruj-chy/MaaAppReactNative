import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor
} from 'react-native';

import { LineChart } from 'react-native-charts-wrapper';

const LineChartScreen = ({ initialOjon }) => {

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

  const DataSets = {
    dataSets: [{
      values: [
        { x: 0, y: initialOjon },
        { x: 5, y: 80.5 },
        { x: 10, y: 81.5 },
        { x: 15, y: 83 },
        { x: 20, y: 84 },
        { x: 25, y: 86 },
        { x: 30, y: 87 },
        { x: 35, y: 89 },
        { x: 40, y: 91 }
      ],
      label: 'ন্যূনত্বম ওজন ',
      config: ConfigA
    }, {
      values: [
        { x: 0, y: 80 },
        { x: 1, y: 81 },

      ],
      label: 'বর্তমান ওজন ',
      config: ConfigB
    }, {
      values: [
        { x: 0, y: 80 },
        { x: 5, y: 81 },
        { x: 10, y: 82 },
        { x: 15, y: 84 },
        { x: 20, y: 86 },
        { x: 25, y: 89 },
        { x: 30, y: 91 },
        { x: 35, y: 94 },
        { x: 40, y: 96 }
      ],
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

  // const legend = {
  //   enabled: true,
  //   textColor: processColor('red'),
  //   textSize: 10,
  //   // form: 'SQUARE',
  //   // formSize: 10,
  //   // xEntrySpace: 10,
  //   // yEntrySpace: 10,
  //   formToTextSpace: 5,
  //   wordWrapEnabled: false,
  //   // maxSizePercent: 0.5,
  //   custom: {
  //     colors: [processColor('green'), processColor('red')],
  //     labels: ['REFER', 'USER',]
  //   }
  // }

  // const marker = {
  //   enabled: true,
  //   markerColor: processColor('green'),
  //   textColor: processColor('blue'),
  //   // markerFontSize: 14,
  // };

  const marker = {
    enabled: true,
    digits: 2,
    backgroundTint: processColor('red'),
    markerColor: processColor('green'),
    textColor: processColor('white'),
  };


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
    color: 'red',
    // backgroundColor: 'red'
  }
});

export default LineChartScreen;
