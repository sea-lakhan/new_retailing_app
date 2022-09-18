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
  emailValidation,
  mobileValidation,
  nameValidation,
  NavigationRoutes,
  passwordValidation,
  windowHeight,
  windowWidth,
} from '../../utility/util';

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
      OTP: '',
      otpStatus: false,
      showLoader: false,
    };
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      confirmPassword,
      showLoader,
    } = this.state;
    const {navigation} = this.props;

    const toggleLoader = showLoader => {
      this.setState({showLoader});
    };

    const _onRegisterUser = () => {
      // const {mobileNumber, password} = this.state;
      // const {navigation} = this.props;
      if (showLoader) {
        Alert.alert('Registration', 'Registration inprogress');
      } else if (!firstName) {
        Alert.alert('Validation Alert', 'Enter first name');
      } else if (!nameValidation.test(firstName)) {
        Alert.alert('Validation Alert', 'First name should have only one word');
      } else if (!lastName) {
        Alert.alert('Validation Alert', 'Enter last name');
      } else if (!nameValidation.test(lastName)) {
        Alert.alert('Validation Alert', 'Last name should have only one word');
      } else if (!email) {
        Alert.alert('Validation Alert', 'Enter email id');
      } else if (!emailValidation.test(email)) {
        Alert.alert('Validation Alert', 'Enter valid email id');
      } else if (!mobileNumber) {
        Alert.alert('Validation Alert', 'Enter mobile number');
      } else if (!mobileValidation.test(mobileNumber)) {
        Alert.alert('Validation Alert', 'Mobile number have only 10 digits');
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
      } else if (
        firstName &&
        lastName &&
        email &&
        mobileNumber &&
        password &&
        confirmPassword
      ) {
        const payload = {
          firstName,
          lastName,
          email,
          mobileNumber,
          password,
          confirmPassword,
          countryCode: '+91',
        };
        http.post(
          urls.userRegistration,
          payload,
          toggleLoader,
          false,
          async response => {
            navigation.navigate(NavigationRoutes.VerifyOtp, {
              userID: response.userID,
              OTP: response.OTP,
            });
          },
        );
      }
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
                width: '90%',
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
                Registration
              </Text>
              <View style={{flex: 4, justifyContent: 'space-evenly'}}>
                <MyTextInput
                  title={en.enter_first_name}
                  titleStyle={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: colors.gray + 90,
                  }}
                  value={firstName}
                  keyboardType={keyboardType.default}
                  textInputStyle={{fontWeight: 'bold', color: colors.gray + 90}}
                  // placeholder={en.first_name_placeholder}
                  onChangeTextInput={firstName => this.setState({firstName})}
                />
                <MyTextInput
                  title={en.enter_last_name}
                  titleStyle={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: colors.gray + 90,
                  }}
                  value={lastName}
                  keyboardType={keyboardType.default}
                  textInputStyle={{fontWeight: 'bold', color: colors.gray + 90}}
                  // placeholder={en.last_name_placeholder}
                  onChangeTextInput={lastName => this.setState({lastName})}
                />
                <MyTextInput
                  title={en.enter_email_id}
                  titleStyle={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: colors.gray + 90,
                  }}
                  value={email}
                  keyboardType={keyboardType.default}
                  textInputStyle={{fontWeight: 'bold', color: colors.gray + 90}}
                  // placeholder={en.email_placeholder}
                  onChangeTextInput={email => this.setState({email})}
                />
                <MyTextInput
                  title={en.enter_mobile_no}
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
                  // placeholder={en.mobile_no_placeholder}
                  onChangeTextInput={mobileNumber =>
                    this.setState({mobileNumber})
                  }
                />
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
                  // placeholder={en.password_placeholder}
                  onChangeTextInput={password => this.setState({password})}
                  isSecureText={true}
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
                  // placeholder={en.password_placeholder}
                  onChangeTextInput={confirmPassword =>
                    this.setState({confirmPassword})
                  }
                  isSecureText={true}
                />
                <MyButton
                  title={en.register}
                  onPressButton={_onRegisterUser}
                  buttonStyle={{marginTop: 10}}
                />
              </View>
              <View
                style={{marginVertical: 10, justifyContent: 'space-evenly'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
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
                      paddingHorizontal: 5,
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
                  onPressButton={() => {
                    if (
                      this.props.route?.params?.from !=
                      NavigationRoutes.ProductDetails
                    )
                      navigation.navigate(NavigationRoutes.Login);
                    else navigation.pop();
                  }}
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    );
  }
}

export default Signup;
