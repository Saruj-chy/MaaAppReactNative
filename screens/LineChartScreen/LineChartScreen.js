import React, { useEffect, useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor
} from 'react-native';

import { LineChart } from 'react-native-charts-wrapper';

const LineChartScreen = ({ initialOjon, WeightMax }) => {

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
  // console.log('object:  ', weightMax[0]);

  const DataSets = {
    dataSets: [{
      values: [
        { x: 0, y: normalWtMn[0] }, { x: 1, y: initialOjon + 1 }, { x: 2, y: initialOjon + 2 }, { x: 3, y: initialOjon + 3 }, { x: 4, y: initialOjon + 4 },
        { x: 5, y: initialOjon + 5 }, { x: 6, y: initialOjon + 6 }, { x: 7, y: initialOjon + 7 }, { x: 8, y: initialOjon + 8 }, { x: 9, y: initialOjon + 9 },
        { x: 10, y: initialOjon + 10 }, { x: 11, y: initialOjon + 11 }, { x: 12, y: initialOjon + 12 }, { x: 13, y: initialOjon + 13 }, { x: 13, y: initialOjon + 14 },
        { x: 15, y: initialOjon + 15 }, { x: 16, y: initialOjon + 16 }, { x: 17, y: initialOjon + 17 }, { x: 18, y: initialOjon + 18 }, { x: 19, y: initialOjon + 19 },
        { x: 20, y: initialOjon + 20 }, { x: 21, y: initialOjon + 21 }, { x: 22, y: initialOjon + 22 }, { x: 23, y: initialOjon + 23 }, { x: 24, y: initialOjon + 24 },
        { x: 25, y: initialOjon + 25 }, { x: 26, y: initialOjon + 26 }, { x: 27, y: initialOjon + 27 }, { x: 28, y: initialOjon + 28 }, { x: 29, y: initialOjon + 29 },
        { x: 30, y: initialOjon + 30 }, { x: 31, y: initialOjon + 31 }, { x: 32, y: initialOjon + 32 }, { x: 33, y: initialOjon + 33 }, { x: 34, y: initialOjon + 34 },
        { x: 35, y: initialOjon + 35 }, { x: 36, y: initialOjon + 36 }, { x: 37, y: initialOjon + 37 }, { x: 38, y: initialOjon + 38 }, { x: 39, y: initialOjon + 39 }, { x: 40, y: initialOjon + 40 }
      ],
      label: 'ন্যূনত্বম ওজন ',
      config: ConfigA
    }, {
      values: [
        { x: 0, y: 80 },
        { x: 1, y: 85 },
        { x: 5, y: 90 },
        { x: 10, y: 95 },
        { x: 15, y: 105 },

      ],
      label: 'বর্তমান ওজন ',
      config: ConfigB
    }, {
      values: [
        { x: 0, y: initialOjon }, { x: 1, y: initialOjon + 3 }, { x: 2, y: initialOjon + 4 }, { x: 3, y: initialOjon + 6 }, { x: 4, y: initialOjon + 8 },
        { x: 5, y: initialOjon + 9 }, { x: 6, y: initialOjon + 10 }, { x: 7, y: initialOjon + 11 }, { x: 8, y: initialOjon + 13 }, { x: 9, y: initialOjon + 14 },
        { x: 10, y: initialOjon + 15 }, { x: 11, y: initialOjon + 16 }, { x: 12, y: initialOjon + 17 }, { x: 13, y: initialOjon + 18 }, { x: 13, y: initialOjon + 19 },
        { x: 15, y: initialOjon + 20 }, { x: 16, y: initialOjon + 21 }, { x: 17, y: initialOjon + 23 }, { x: 18, y: initialOjon + 25 }, { x: 19, y: initialOjon + 24 },
        { x: 20, y: initialOjon + 25 }, { x: 21, y: initialOjon + 26 }, { x: 22, y: initialOjon + 28 }, { x: 23, y: initialOjon + 27 }, { x: 24, y: initialOjon + 28 },
        { x: 25, y: initialOjon + 30 }, { x: 26, y: initialOjon + 31 }, { x: 27, y: initialOjon + 32 }, { x: 28, y: initialOjon + 34 }, { x: 29, y: initialOjon + 33 },
        { x: 30, y: initialOjon + 35 }, { x: 31, y: initialOjon + 36 }, { x: 32, y: initialOjon + 37 }, { x: 33, y: initialOjon + 38 }, { x: 34, y: initialOjon + 39 },
        { x: 35, y: initialOjon + 40 }, { x: 36, y: initialOjon + 42 }, { x: 37, y: initialOjon + 41 }, { x: 38, y: initialOjon + 44 }, { x: 39, y: initialOjon + 47 }, { x: 40, y: initialOjon + 50 }
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


  // const SelectedMaxMinWeight = (BMI) => {
  //   let underWtMn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 5, 0, 0, 0, 9, 0, 0, 0, 13, 0, 0, 0, 17, 0, 0, 0, 20, 0, 22, 0, 24, 25, 26, 27, 28];
  //   let underWtMx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 10, 0, 0, 0, 15, 0, 0, 0, 20, 0, 0, 0, 25, 0, 0, 0, 30, 0, 32, 0, 35, 36, 37, 39, 40];
  //   let normalWtMn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 11, 0, 0, 0, 15, 0, 0, 0, 18, 0, 20, 0, 21, 22, 23, 24, 25];
  //   let normalWtMx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 10, 0, 0, 0, 14, 0, 0, 0, 18, 0, 0, 0, 22, 0, 0, 0, 27, 0, 29, 0, 31, 32, 32, 34, 35];
  //   let overWtMn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 7, 0, 0, 0, 9, 0, 0, 0, 11, 0, 12, 0, 13, 13, 14, 14, 15];
  //   let overWtMx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 8, 0, 0, 0, 11, 0, 0, 0, 14, 0, 0, 0, 17, 0, 0, 0, 19, 0, 21, 0, 22, 23, 23, 24, 25];
  //   let obeseWtMn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 6, 0, 0, 0, 7, 0, 0, 0, 8, 0, 9, 0, 10, 10, 10, 11, 11];
  //   let obeseWtMx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 6, 0, 0, 0, 8, 0, 0, 0, 11, 0, 0, 0, 13, 0, 0, 0, 15, 0, 16, 0, 17, 18, 19, 19, 20];
  //   let maxWeight = [], minWeight = [];
  //   maxWeight[0] = minWeight[0] = 100;

  //   let numb = 100 + obeseWtMn[0] / 2.2;
  //   console.log(numb)

  //   if (BMI < 18.5) {
  //     for (let i = 0; i < 40; i++) {
  //       maxWeight[i + 1] = parseFloat((maxWeight[0] + underWtMx[i] / 2.2).toFixed(2));
  //       minWeight[i + 1] = parseFloat((minWeight[0] + underWtMn[i] / 2.2).toFixed(2));
  //     }
  //   }
  //   else if (BMI >= 18.5 && BMI < 25.0) {
  //     //Normal Weight
  //     for (let i = 0; i < 40; i++) {
  //       maxWeight[i + 1] = parseFloat((maxWeight[0] + normalWtMx[i] / 2.2).toFixed(2));
  //       minWeight[i + 1] = parseFloat((minWeight[0] + normalWtMn[i] / 2.2).toFixed(2));
  //     }
  //   } else if (BMI >= 25.0 && BMI < 30.0) {
  //     //Over Weight
  //     for (let i = 0; i < 40; i++) {
  //       maxWeight[i + 1] = parseFloat((maxWeight[0] + overWtMx[i] / 2.2).toFixed(2));
  //       minWeight[i + 1] = parseFloat((minWeight[0] + overWtMn[i] / 2.2).toFixed(2));
  //     }
  //   } else if (BMI >= 30.0) {
  //     // OVISH
  //     for (let i = 0; i < 40; i++) {
  //       maxWeight[i + 1] = parseFloat((maxWeight[0] + obeseWtMx[i] / 2.2).toFixed(2));
  //       minWeight[i + 1] = parseFloat((minWeight[0] + obeseWtMn[i] / 2.2).toFixed(2));
  //     }
  //   }
  //   // console.log(' maxWeight:  ', maxWeight, '   minWeight    ', minWeight);
  //   setWeightMax(maxWeight);
  //   setWeightMin(minWeight);
  // }

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
