import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';
import update from 'immutability-helper';

import _ from 'lodash';
import { LineChart } from 'react-native-charts-wrapper';

class LineChartScreen2 extends React.Component {

  constructor() {
    super();
    console.log('object  LineChart 2 ', this.props.WeightMax);

    this.state = {
      data: {},
      legend: {
        enabled: true,
        textColor: processColor('red'),
        textSize: 12,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5,
        custom: {
          colors: [processColor('red'), processColor('red')],
          labels: ['REFER', 'USER',]
        }
      },
      marker: {
        enabled: true,
        markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white'),
        markerFontSize: 14,
      },

      selectedEntry: "",
      yAxis: { left: { axisMinimum: 0, axisMaximum: 12000 }, right: { enabled: false } },
      xAxis: {
        granularityEnabled: true,
        granularity: 5,
      }
    }

  }

  componentDidMount() {
    const size = 80;

    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [{
              values: this._randomParabolaValues(size),
              label: 'refer',
              config: {
                lineWidth: 2,
                drawValues: false,
                drawCircles: false,
                highlightColor: processColor('red'),
                color: processColor('red'),
                drawFilled: true,
                fillColor: processColor('blue'),
                fillAlpha: 60,
                highlightEnabled: false,
                dashedLine: {
                  lineLength: 20,
                  spaceLength: 20
                }
              }
            }, {
              values: [
                { x: 1, y: 11000, marker: "a very long long long long long long long long \nmarker at top left" },
                { x: 20, y: 90, marker: "eat eat eat, never\n stop eat" },
                { x: 40, y: -130, marker: "" },
                { x: 65, y: 11000, marker: "test top center marker" },
                { x: 70, y: -2000, marker: "eat more" },
                { x: 90, y: 9000, marker: "your are overweight, eat less" },
                { x: 100, y: 11000, marker: "test top right marker" }],

              label: 'user',
              config: {
                lineWidth: 1,
                drawValues: true,
                circleRadius: 5,
                highlightEnabled: true,
                // drawHighlightIndicators: true,
                color: processColor('red'),
                // drawFilled: true,
                valueTextSize: 10,
                // fillColor: processColor('red'),
                // fillAlpha: 45,
                valueFormatter: "$###.0",
                circleColor: processColor('red')
              }
            }],
          }
        }
      })
    );
  }

  _randomParabolaValues(size: number) {
    return _.times(size, (index) => {
      return { x: index, y: index * index }
    });
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null })
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) })
    }

    console.log(event.nativeEvent)
  }



  render() {

    let borderColor = processColor("red");
    return (
      <View >

        {/* <View style={{ height: 80 }}>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View> */}

        <View style={styles.container}>


          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{ text: '' }}
            // legend={this.state.legend}
            // marker={this.state.marker}

            // drawGridBackground={true}

            // borderColor={borderColor}
            borderWidth={1}
            // drawBorders={true}

            yAxis={this.state.yAxis}
            xAxis={this.state.xAxis}


          // onSelect={this.handleSelect.bind(this)}
          // onChange={(event) => console.log(event.nativeEvent)}

          // ref="chart"
          />
        </View>
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    // flex: 1
    height: 280
  }
});


export default LineChartScreen2;