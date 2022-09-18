import {
  Alert,
  BackHandler,
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

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      password: '',
      rememberMe: false,
      showLoader: false,
    };
  }

  toggleLoader = showLoader => {
    this.setState({showLoader});
  };

  onLoginPress = () => {
    const {mobileNumber, password} = this.state;
    const {navigation} = this.props;
    console.log(passwordValidation.test(password), 'from password validtion');
    if (!mobileValidation.test(mobileNumber)) {
      Alert.alert('Validation Alert', 'Mobile number have only 10 digits');
    } else if (!passwordValidation.test(password)) {
      Alert.alert(
        'Validation Alert',
        'Your password should contain one small letter, one capital letter, one digit, one special character and length between 8 to 24',
      );
    } else if (!mobileNumber) {
      Alert.alert('Validation Alert', 'Please enter mobile number');
    } else if (!password) {
      Alert.alert('Validation Alert', 'Please enter password');
    } else {
      const payload = {
        mobileNumber,
        password,
      };
      http.post(
        urls.login,
        payload,
        this.toggleLoader,
        false,
        async response => {
          await AsyncStorage.setItem(
            'user',
            JSON.stringify({
              userID: response.data[0].user._id,
              firstName: response.data[0].user.firstName,
              lastName: response.data[0].user.lastName,
              mobileNumber: response.data[0].user.mobileNumber,
              email: response.data[0].user.email,
              isAdmin: response.data[0].user.isAdmin,
              address: response.data[0].user.address,
              token: response.data[0].token,
            }),
          );
          if (this.props.route?.params?.from != NavigationRoutes.ProductDetails)
            navigation.navigate(NavigationRoutes.Dashboard);
          else navigation.goBack(NavigationRoutes.ProductDetails);
        },
      );
    }
  };

  render() {
    const {mobileNumber, password, showLoader, rememberMe} = this.state;
    const {navigation} = this.props;

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
                Login
              </Text>
              <View style={{flex: 2, justifyContent: 'space-evenly'}}>
                <MyTextInput
                  title={en.enter_register_mobile_no}
                  titleStyle={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: colors.gray + 90,
                  }}
                  value={mobileNumber}
                  keyboardType={keyboardType.numeric}
                  textInputStyle={{fontWeight: 'bold', color: colors.gray + 90}}
                  placeholder={en.mobile_no_placeholder}
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
                  placeholder={en.password_placeholder}
                  onChangeTextInput={password => this.setState({password})}
                  isSecureText={true}
                />
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                  onPress={() => this.setState({rememberMe: !rememberMe})}>
                  {rememberMe ? (
                    <MaterialCommunityIcons
                      name={icons.checkedBox}
                      size={20}
                      color={colors.gray + 90}
                      style={{marginLeft: 10, marginRight: 5}}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name={icons.checkBoxEmpty}
                      size={20}
                      color={colors.gray + 90}
                      style={{marginLeft: 10, marginRight: 5}}
                    />
                  )}
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: colors.gray + 90,
                    }}>
                    {en.remember_me}
                  </Text>
                </TouchableOpacity>
                <MyButton
                  title={en.login}
                  onPressButton={this.onLoginPress}
                  buttonStyle={{marginVertical: 5}}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(NavigationRoutes.ForgotPassword)
                  }
                  style={{
                    alignSelf: 'center',
                    paddingVertical: 5,
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: colors.gray + 90,
                    }}>
                    {en.forgot_your_password}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}} />
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
                  title={en.sign_up}
                  onPressButton={() => {
                    if (
                      this.props.route?.params?.from !=
                      NavigationRoutes.ProductDetails
                    )
                      navigation.navigate(NavigationRoutes.Signup);
                    else
                      navigation.navigate(NavigationRoutes.Signup, {
                        from: this.props.route?.params?.from,
                      });
                  }}
                  buttonStyle={{marginVertical: 5}}
                />
                {this.props.route?.params?.from !=
                  NavigationRoutes.ProductDetails && (
                  <MyButton
                    title={en.home}
                    onPressButton={() => navigation.goBack()}
                    buttonStyle={{marginVertical: 5}}
                  />
                )}
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    );
  }
}

export default Login;
