import {View, Text, TextInput} from 'react-native';
import React from 'react';
import colors from '../utility/colors';
import {Component} from 'react';

export default class MyTextInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      textInputStyle,
      textInputViewStyle,
      titleStyle,
      title,
      onChangeTextInput,
      keyboardType,
      placeholder,
      isSecureText,
      disabledText,
      value,
      disabledTitle,
    } = this.props;

    return (
      <View
        style={[
          {
            width: '100%',
            paddingTop: 10,
            paddingHorizontal: 10,
            paddingBottom: 5,
          },
          textInputViewStyle,
        ]}>
        {!disabledTitle && (
          <Text
            style={[
              {
                height: 15,
                marginLeft: 10,
                paddingHorizontal: 5,
                backgroundColor: colors.white,
                zIndex: 1,
                alignSelf: 'flex-start',
              },
              titleStyle,
            ]}>
            {title}
          </Text>
        )}
        <TextInput
          style={[
            {
              borderWidth: 1,
              paddingVertical: 7,
              paddingLeft: 15,
              borderColor: colors.gray + 50,
              borderRadius: 5,
              marginTop: -7,
            },
            textInputStyle,
          ]}
          onChangeText={onChangeTextInput}
          value={value}
          keyboardType={keyboardType}
          placeholder={placeholder}
          secureTextEntry={isSecureText}
          editable={!disabledText}
        />
      </View>
    );
  }
}
