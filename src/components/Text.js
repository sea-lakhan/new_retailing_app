import {View, Text, TextInput} from 'react-native';
import React from 'react';
import colors from '../utility/colors';
import {Component} from 'react';

export default class MyText extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {title, titleStyle, textViewStyle, textStyle, value} = this.props;
    return (
      <View
        style={[
          {
            paddingTop: 10,
            paddingBottom: 5,
          },
          textViewStyle,
        ]}>
        <Text style={titleStyle}>{title}</Text>
        <Text
          style={[
            {
              borderBottomWidth: 1,
              paddingVertical: 5,
              borderColor: colors.gray + 50,
            },
            textStyle,
          ]}>
          {value}
        </Text>
      </View>
    );
  }
}
