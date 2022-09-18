import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import colors from '../utility/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {images} from '../assests/images/images';

export class BackButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center', padding: 10}}
        onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back"
          size={20}
          color={colors.prime}
          style={{fontWeight: 'bold'}}
        />
        {/* <Image
          source={images.back}
          style={{maxWidth: 20, height: 50}}
          resizeMode={'contain'}
        /> */}
        {/* <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: colors.prime,
          }}></Text> */}
      </TouchableOpacity>
    );
  }
}

export default BackButton;
