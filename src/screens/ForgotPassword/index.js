import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {styles} from './styles';
import colors from '../../utility/colors';
import MyTextInput from '../../components/TextInput';
import LinearGradient from 'react-native-linear-gradient';
import MyButton from '../../components/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../utility/icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {keyboardType} from '../../utility/types';
import {en} from '../../localization/english';
import http from '../../utility/http';
import urls from '../../utility/urls';
import ActivityLoader from '../../components/ActivityLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  mobileValidation,
  NavigationRoutes,
  passwordValidation,
  windowHeight,
  windowWidth,
} from '../../utility/util';

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      password: '',
      confirmPassword: '',
      userID: '',
      OTP: '',
      otpStatus: false,
      showLoader: false,
    };
  }

  render() {
    const {
      mobileNumber,
      password,
      confirmPassword,
      OTP,
      otpStatus,
      userID,
      showLoader,
    } = this.state;
    const {navigation} = this.props;

    const toggleLoader = showLoader => {
      this.setState({showLoader});
    };

    const _onResetPassword = () => {
      // const {mobileNumber, password, confirmPassword, userID, OTP, showLoader} = this.state;
      // const {navigation} = this.props;
      if (!mobileNumber) {
        Alert.alert('Validation Alert', 'Enter mobile number');
      } else if (!mobileValidation.test(mobileNumber)) {
        Alert.alert('Validation Alert', 'Mobile number have only 10 digits');
      } else if (!userID && !otpStatus) {
        Alert.alert('Alert', 'Please get the otp');
      } else if (!password) {
        Alert.alert('Validation Alert', 'Enter password');
      } else if (!passwordValidation.test(password)) {
        Alert.alert(
          'Validation Alert',
          'Your password should contain one small letter, one capital letter, one digit, one special character and length between 8 to 24',
        );
      } else if (!confirmPassword) {
        Alert.alert('Validation Alert', 'Enter confirm password');
      } else if (password != confirmPassword) {
        Alert.alert(
          'Validation Alert',
          'Password and Confirm Password should be match',
        );
      } else if (mobileNumber && password && otpStatus && userID && OTP) {
        const payload = {
          mobileNumber,
          password,
          confirmPassword,
          userID,
          OTP: parseInt(OTP),
        };
        http.post(
          urls.resetPassword,
          payload,
          toggleLoader,
          false,
          async response => {
            Alert.alert('RESET PASSWORD', response.message, [
              {
                text: 'OK',
                onPress: () => navigation.navigate(NavigationRoutes.Login),
              },
            ]);
          },
        );
      } else {
        Alert.alert('Alert', 'Please check internet connection');
      }
    };

    const _onSendOTP = otpStatus => {
      if (!mobileNumber) Alert.alert('Alert', 'Please enter mobile number.');
      else if (!mobileValidation.test(mobileNumber))
        Alert.alert('Alert', 'Please enter valid mobile number');
      else {
        const payload = {
          mobileNumber,
        };
        http.post(
          urls.forgotPassword,
          payload,
          toggleLoader,
          false,
          async response => {
            this.setState({
              userID: response.data[0].id,
              OTP: response.data[0].OTP,
              otpStatus,
            });
          },
        );
      }
    };

    const onChangeMobileNumber = mobileNumber => {
      this.setState({
        mobileNumber,
        OTP: '',
        userID: '',
        password: '',
        confirmPassword: '',
        otpStatus: false,
      });
    };

    return (
      <ScrollView style={{width: windowWidth, height: windowHeight}}>
        <LinearGradient
          colors={[colors.secondary, colors.prime]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{width: windowWidth, height: windowHeight}}>
          {showLoader && <ActivityLoader showLoader={showLoader} />}
          <View style={styles.container}>
            <View
              style={{
                flex: 1,
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
                Forgot Password
              </Text>
              <View style={{flex: 3, justifyContent: 'space-evenly'}}>
                <MyTextInput
                  title={en.enter_register_mobile_no}
                  titleStyle={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: colors.gray + 90,
                  }}
                  value={mobileNumber}
                  keyboardType={keyboardType.numeric}
                  textInputStyle={{
                    fontWeight: 'bold',
                    color: colors.gray + 90,
                  }}
                  placeholder={en.mobile_no_placeholder}
                  onChangeTextInput={mobileNumber =>
                    onChangeMobileNumber(mobileNumber)
                  }
                />
                {!otpStatus ? (
                  <TouchableOpacity onPress={() => _onSendOTP(true)}>
                    <LinearGradient
                      colors={[colors.prime, colors.secondary]}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{
                        padding: 5,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.white,
                          fontWeight: 'bold',
                        }}>
                        Send OTP
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity onPress={() => _onSendOTP(true)}>
                      <LinearGradient
                        colors={[colors.prime, colors.secondary]}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={{
                          padding: 5,
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: colors.white,
                            fontWeight: 'bold',
                          }}>
                          Resend OTP
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 14,
                        color: colors.prime,
                        fontWeight: 'bold',
                      }}>
                      OTP has been send to your register mobile number
                    </Text>
                  </>
                )}
                <MyTextInput
                  title={en.enter_password}
                  titleStyle={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: colors.gray + 90,
                  }}
                  value={password}
                  keyboardType={keyboardType.default}
                  textInputStyle={{fontWeight: 'bold', color: colors.gray + 90}}
                  placeholder={en.password_placeholder}
                  isSecureText={true}
                  onChangeTextInput={password => this.setState({password})}
                />
                <MyTextInput
                  title={en.enter_confirm_password}
                  titleStyle={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: colors.gray + 90,
                  }}
                  value={confirmPassword}
                  keyboardType={keyboardType.default}
                  textInputStyle={{fontWeight: 'bold', color: colors.gray + 90}}
                  placeholder={en.password_placeholder}
                  isSecureText={true}
                  onChangeTextInput={confirmPassword =>
                    this.setState({confirmPassword})
                  }
                />
                <MyTextInput
                  title={en.enter_otp}
                  titleStyle={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: colors.gray + 90,
                  }}
                  value={OTP}
                  keyboardType={keyboardType.numeric}
                  textInputStyle={{fontWeight: 'bold', color: colors.gray + 90}}
                  placeholder={en.otp_placeholder}
                  onChangeTextInput={OTP => this.setState({OTP})}
                  disabledText={true}
                />
                <MyButton
                  title={en.reset_password}
                  onPressButton={_onResetPassword}
                />
              </View>
              <View style={{flex: 1, justifyContent: 'space-evenly'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      flex: 1,
                      borderBottomWidth: 1,
                      borderColor: colors.gray + 50,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: colors.gray,
                      alignSelf: 'center',
                      padding: 10,
                      backgroundColor: colors.white,
                    }}>
                    {en.or}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      borderBottomWidth: 1,
                      borderColor: colors.gray + 50,
                    }}
                  />
                </View>
                <MyButton
                  title={en.back}
                  onPressButton={() =>
                    navigation.navigate(NavigationRoutes.Login)
                  }
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    );
  }
}

export default ForgotPassword;
