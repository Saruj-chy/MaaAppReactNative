import React, { Component } from "react";
import {
  AppRegistry,
  Picker,
  Platform,
  StyleSheet,
  TextInput,
  View
} from "react-native";

const programmingLanguages = [
  {
    label: 'Java',
    value: 'java',
  },
  {
    label: 'JavaScript',
    value: 'js',
  },
  {
    label: 'Python',
    value: 'python',
  },
  {
    label: 'Ruby',
    value: 'ruby',
  },
  {
    label: 'C#',
    value: 'csharp',
  },
  {
    label: 'C++',
    value: 'cpp',
  },
  {
    label: 'C',
    value: 'c',
  },
  {
    label: 'Go',
    value: 'go',
  }
];

class PickerShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text1: '',
      text2: '',
      language: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={'Some input'}
              style={styles.input}
              onChangeText={text1 => this.setState({ text1 })}
              value={this.state.text1}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={'Some input 2'}
              style={styles.input}
              onChangeText={text2 => this.setState({ text2 })}
              value={this.state.text2}
            />
          </View>
          <Picker
            selectedValue={this.state.language}
            onValueChange={itemValue => this.setState({ language: itemValue })}>
            {programmingLanguages.map((i, index) => (
              <Picker.Item key={index} label={i.label} value={i.value} />
            ))}
          </Picker>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  inputContainer: {
    ...Platform.select({
      ios: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
      },
    }),
  },
  input: {
    height: 40
  }
});

AppRegistry.registerComponent('FormPicker', () => PickerShow);