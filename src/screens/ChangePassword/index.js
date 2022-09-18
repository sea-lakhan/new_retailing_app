import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {View, Text, FlatList, ScrollView, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActivityLoader from '../../components/ActivityLoader';
import MyButton from '../../components/Button';
import {HeaderBar} from '../../components/HeaderBar';
import MyTextInput from '../../components/TextInput';
import {en} from '../../localization/english';
import colors from '../../utility/colors';
import http from '../../utility/http';
import {keyboardType} from '../../utility/types';
import urls from '../../utility/urls';
import {
  getUser,
  NavigationRoutes,
  windowHeight,
  windowWidth,
} from '../../utility/util';
import {styles} from './styles';

const DATA = [
  {
    title: 'Change Password',
    onPress: NavigationRoutes.ChangePassword,
    icon: 'account-key',
    iconType: 'MaterialCommunityIcons',
    updatable: true,
  },
  {
    title: 'My Orders',
    onPress: NavigationRoutes.Wishlist,
    icon: 'format-list-text',
    iconType: 'MaterialCommunityIcons',
    updatable: false,
  },
  {
    title: 'My Wishlist',
    onPress: () => NavigationRoutes.Wishlist,
    icon: 'format-list-text',
    iconType: 'MaterialCommunityIcons',
    updatable: false,
  },
  {
    title: 'My Addresses',
    onPress: NavigationRoutes.Address,
    icon: 'map-marker-circle',
    iconType: 'MaterialIcons',
    updatable: true,
  },
];

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      password: '',
      confirmPassword: '',
      showLoader: false,
    };
  }

  toggleLoader = showLoader => {
    this.setState({showLoader});
  };

  componentDidMount() {
    const {navigation} = this.props;
    navigation.setOptions({
      header: () => (
        <HeaderBar
          navigation={navigation}
          title={'Change Password'}
          onBackPress={() => navigation.pop()}
        />
      ),
    });
    this.getUserDetails();
  }

  getUserDetails = async () => {
    this.setState({user: await getUser()});
  };

  onPressChangePassword = () => {
    const {password, confirmPassword, user} = this.state;
    const {navigation} = this.props;
    if (!!password && !!confirmPassword) {
      const payload = {
        password,
        confirmPassword,
      };
      http.put(
        `${urls.changePassword}${user.userID}`,
        payload,
        this.toggleLoader,
        true,
        response => {
          if (response.status == true)
            Alert.alert(
              'Change Password Alert',
              'Password change successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.goBack(),
                },
              ],
            );
          else Alert.alert('Change Password Alert', response.message);
        },
      );
    } else {
      Alert.alert('Validation Alert', 'Please enter all required fields');
    }
  };

  render() {
    const {showLoader, password, confirmPassword} = this.state;
    return (
      <ScrollView style={{width: windowWidth, height: windowHeight}}>
        <LinearGradient
          colors={[colors.secondary, colors.prime]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            width: windowWidth,
            height: windowHeight - 60,
            justifyContent: 'center',
          }}>
          {showLoader && <ActivityLoader showLoader={showLoader} />}
          <View style={styles.container}>
            <View
              style={{
                height: (windowHeight * 50) / 100,
                width: '80%',
                borderRadius: 30,
                padding: 20,
                // paddingVertical: 30,
                backgroundColor: colors.white,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: colors.prime,
                  alignSelf: 'center',
                }}>
                Change Password
              </Text>
              <View style={{flex: 2, justifyContent: 'space-evenly'}}>
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
                  placeholder={en.confirm_password_placeholder}
                  onChangeTextInput={confirmPassword =>
                    this.setState({confirmPassword})
                  }
                  isSecureText={true}
                />
                <MyButton
                  title={en.change_password}
                  onPressButton={() => this.onPressChangePassword()}
                  buttonStyle={{marginVertical: 5}}
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    );
  }
}
