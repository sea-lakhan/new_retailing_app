import {Alert, Text, View} from 'react-native';
import React, {Component} from 'react';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import MyTextInput from '../../components/TextInput';
import MyButton from '../../components/Button';
import colors from '../../utility/colors';
import {keyboardType} from '../../utility/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationRoutes} from '../../utility/util';
import http from '../../utility/http';
import urls from '../../utility/urls';
import ActivityLoader from '../../components/ActivityLoader';

export class VerifyOtp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.route.params.userID,
      OTP: '',
      showLoader: false,
    };
  }

  componentDidMount() {
    this.setState({
      userID: this.props.route.params.userID,
    });
  }

  render() {
    const {OTP, userID, showLoader} = this.state;
    const {navigation} = this.props;

    const toggleLoader = showLoader => {
      this.setState({showLoader});
    };

    const _onVerifyOTP = async () => {
      if (!!OTP) {
        const payload = {
          OTP: parseInt(OTP),
        };
        http.put(
          urls.verifyUser + userID,
          payload,
          toggleLoader,
          false,
          async response => {
            // console.log(response);
            // await AsyncStorage.setItem(
            //   'user',
            //   JSON.stringify({
            //     userID: response.result[0]._id,
            //     firstName: response.result[0].firstName,
            //     lastName: response.result[0].lastName,
            //     mobileNumber: response.result[0].mobileNumber,
            //     email: response.result[0].email,
            //     isAdmin: response.result[0].isAdmin,
            //     // token:res
            //   }),
            Alert.alert('User Alert', 'User created successfully', [
              {
                text: 'OK',
                onPress: () => navigation.navigate(NavigationRoutes.Login),
              },
            ]);
          },
        );
      } else {
        Alert.alert('Error', 'Please check internet connection');
      }
    };

    return (
      <LinearGradient
        colors={[colors.secondary, colors.prime]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{flex: 1}}>
        <View style={styles.container}>
          {showLoader && <ActivityLoader showLoader={showLoader} />}
          <View
            style={{
              // height: '40%',
              width: '80%',
              borderRadius: 30,
              padding: 20,
              paddingVertical: 30,
              backgroundColor: colors.white,
              justifyContent: 'space-evenly',
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: colors.prime,
                alignSelf: 'center',
              }}>
              Verify OTP
            </Text>
            <MyTextInput
              title="ENTER OTP"
              titleStyle={{
                fontSize: 12,
                fontWeight: 'bold',
                color: colors.gray + 90,
              }}
              value={OTP}
              keyboardType={keyboardType.numeric}
              // placeholder={en.otp_placeholder}
              textInputStyle={{fontWeight: 'bold', color: colors.gray + 90}}
              onChangeTextInput={OTP => this.setState({OTP})}
            />
            <MyButton
              title="Verify OTP"
              onPressButton={_onVerifyOTP}
              buttonStyle={{marginVertical: 10}}
            />
            <MyButton
              title="Cancel"
              onPressButton={() =>
                navigation.navigate(NavigationRoutes.Dashboard)
              }
            />
          </View>
        </View>
      </LinearGradient>
    );
  }
}

export default VerifyOtp;
