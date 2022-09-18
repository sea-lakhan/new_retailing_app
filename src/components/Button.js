import React, {Component} from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../utility/colors';

export default class MyButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onPressButton,buttonStyle,title,}=this.props;
    return (
      <TouchableOpacity
        onPress={onPressButton}
        style={{...buttonStyle}}>
        <LinearGradient
          colors={[colors.prime, colors.secondary]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            borderRadius: 40,
            padding: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: colors.white}}>
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
