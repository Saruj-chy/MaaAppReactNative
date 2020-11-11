import React, { useEffect, useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor
} from 'react-native';

import { LineChart } from 'react-native-charts-wrapper';

const LineChartScreen = ({ initialOjon, WeightMax, WeightMin }) => {

  // const [weightMax, setWeightMax] = useState([]);
  // const [weightMin, setWeightMin] = useState([]);
  //================================================================
  useEffect(() => {
    // SelectedMaxMinWeight(100);
    // DataValues(weightMax);
  }, [])
  console.log('LineChartScreen WeightMax: ', WeightMax);
  let normalWtMn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 11, 0, 0, 0, 15, 0, 0, 0, 18, 0, 20, 0, 21, 22, 23, 24, 25];

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

  //==============================
  const DataValues = weight => {
    let temp = [];
    for (let i = 0; i <= 40; i++) {
      temp.push({ x: i, y: weight[i] });

    }
    console.log('temp:  ', temp);
    return temp;

  }
  // const weight2 = DataValues(weightMax);
  // console.log('object:  ', WeightMax.length);

  const DataSets = {
    dataSets: [{
      values: [
        { x: 0, y: WeightMax[0] }, { x: 1, y: WeightMax[1] }, { x: 2, y: WeightMax[2] }, { x: 3, y: WeightMax[3] }, { x: 4, y: WeightMax[4] },
        { x: 5, y: WeightMax[5] }, { x: 6, y: WeightMax[6] }, { x: 7, y: WeightMax[7] }, { x: 8, y: WeightMax[8] }, { x: 9, y: WeightMax[9] },
        { x: 10, y: WeightMax[10] }, { x: 11, y: WeightMax[11] }, { x: 12, y: WeightMax[12] }, { x: 13, y: WeightMax[13] }, { x: 13, y: WeightMax[14] },
        { x: 15, y: WeightMax[15] }, { x: 16, y: WeightMax[16] }, { x: 17, y: WeightMax[17] }, { x: 18, y: WeightMax[18] }, { x: 19, y: WeightMax[19] },
        { x: 20, y: WeightMax[20] }, { x: 21, y: WeightMax[21] }, { x: 22, y: WeightMax[22] }, { x: 23, y: WeightMax[23] }, { x: 24, y: WeightMax[24] },
        { x: 25, y: WeightMax[25] }, { x: 26, y: WeightMax[26] }, { x: 27, y: WeightMax[27] }, { x: 28, y: WeightMax[28] }, { x: 29, y: WeightMax[29] },
        { x: 30, y: WeightMax[30] }, { x: 31, y: WeightMax[31] }, { x: 32, y: WeightMax[32] }, { x: 33, y: WeightMax[33] }, { x: 34, y: WeightMax[34] },
        { x: 35, y: WeightMax[35] }, { x: 36, y: WeightMax[36] }, { x: 37, y: WeightMax[37] }, { x: 38, y: WeightMax[38] }, { x: 39, y: WeightMax[39] }, { x: 40, y: WeightMax[40] }
      ],
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
      values: [
        { x: 0, y: WeightMin[0] }, { x: 1, y: WeightMin[1] }, { x: 2, y: WeightMin[2] }, { x: 3, y: WeightMin[3] }, { x: 4, y: WeightMin[4] },
        { x: 5, y: WeightMin[5] }, { x: 6, y: WeightMin[6] }, { x: 7, y: WeightMin[7] }, { x: 8, y: WeightMin[8] }, { x: 9, y: WeightMin[9] },
        { x: 10, y: WeightMin[10] }, { x: 11, y: WeightMin[11] }, { x: 12, y: WeightMin[12] }, { x: 13, y: WeightMin[13] }, { x: 13, y: WeightMin[14] },
        { x: 15, y: WeightMin[15] }, { x: 16, y: WeightMin[16] }, { x: 17, y: WeightMin[17] }, { x: 18, y: WeightMin[18] }, { x: 19, y: WeightMin[19] },
        { x: 20, y: WeightMin[20] }, { x: 21, y: WeightMin[21] }, { x: 22, y: WeightMin[22] }, { x: 23, y: WeightMin[23] }, { x: 24, y: WeightMin[24] },
        { x: 25, y: WeightMin[25] }, { x: 26, y: WeightMin[26] }, { x: 27, y: WeightMin[27] }, { x: 28, y: WeightMin[28] }, { x: 29, y: WeightMin[29] },
        { x: 30, y: WeightMin[30] }, { x: 31, y: WeightMin[31] }, { x: 32, y: WeightMin[32] }, { x: 33, y: WeightMin[33] }, { x: 34, y: WeightMin[34] },
        { x: 35, y: WeightMin[35] }, { x: 36, y: WeightMin[36] }, { x: 37, y: WeightMin[37] }, { x: 38, y: WeightMin[38] }, { x: 39, y: WeightMin[39] }, { x: 40, y: WeightMin[40] }
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
    color: 'red',
    // backgroundColor: 'red'
  }
});

export default LineChartScreen;
