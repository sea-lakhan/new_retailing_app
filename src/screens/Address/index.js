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
  getToken,
  getUser,
  NavigationRoutes,
  pincodeValidation,
  windowHeight,
  windowWidth,
} from '../../utility/util';
import {styles} from './styles';

export default class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      houseNo: '',
      area: '',
      city: '',
      state: '',
      pinCode: '',
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
          title={'Address'}
          onBackPress={() => navigation.navigate(NavigationRoutes.Profile)}
        />
      ),
    });
    this.getUserDetails();
  }

  getUserDetails = async () => {
    let user = await getUser();
    this.setState({
      user,
      houseNo: user?.address?.houseNo,
      area: user?.address?.area,
      city: user?.address?.city,
      state: user?.address?.state,
      pinCode: user?.address?.pinCode,
    });
  };

  onPressChangePassword = () => {
    const {houseNo, area, city, state, pinCode, user} = this.state;
    const {navigation} = this.props;
    if (!pincodeValidation.test(pinCode)) {
      Alert.alert('Validation Alert', 'Pincode should contain 6 digits only');
    } else if (!!houseNo && !!area && !!city && !!state && !!pinCode) {
      const payload = {
        address: {
          houseNo: houseNo,
          area: area,
          city: city,
          state: state,
          country: 'india',
          pinCode: pinCode,
        },
      };
      http.put(
        `${urls.updateUser}${user.userID}`,
        payload,
        this.toggleLoader,
        true,
        async response => {
          await AsyncStorage.setItem(
            'user',
            JSON.stringify({
              userID: response.data[0]._id,
              firstName: response.data[0].firstName,
              lastName: response.data[0].lastName,
              mobileNumber: response.data[0].mobileNumber,
              email: response.data[0].email,
              isAdmin: response.data[0].isAdmin,
              address: response.data[0].address,
              token: user.token,
            }),
            () =>
              Alert.alert(
                'Address Alert',
                'Your delivery address saved successfully',
                [
                  {
                    text: 'OK',
                    onPress: () =>
                      this.props.navigation.navigate(NavigationRoutes.Profile),
                  },
                ],
              ),
          );
        },
      );
    } else {
      Alert.alert('Validation', 'Please enter all required fields');
    }
  };

  render() {
    const {showLoader, houseNo, area, city, state, pinCode, user} = this.state;
    return (
      <ScrollView style={{width: windowWidth, height: windowHeight}}>
        <LinearGradient
          colors={[colors.secondary, colors.prime]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            width: windowWidth,
            height: windowHeight,
            justifyContent: 'center',
          }}>
          {showLoader && <ActivityLoader showLoader={showLoader} />}
          <View style={styles.container}>
            <View
              style={{
                height: '70%',
                width: '80%',
                borderRadius: 30,
                padding: 20,
                // paddingVertical: 30,
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
                {user.address ? 'Change Address' : 'Add Address'}
              </Text>
              <View style={{flex: 2, justifyContent: 'space-evenly'}}>
                <MyTextInput
                  title={en.enter_address1}
                  titleStyle={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: colors.gray + 90,
                  }}
                  value={houseNo}
                  keyboardType={keyboardType.default}
                  textInputStyle={{fontWeight: 'bold', color: colors.gray + 90}}
                  placeholder={en.address1_placeholder}
                  onChangeTextInput={houseNo => this.setState({houseNo})}
                />
                <MyTextInput
                  title={en.enter_area}
                  titleStyle={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: colors.gray + 90,
                  }}
                  value={area}
                  keyboardType={keyboardType.default}
                  textInputStyle={{fontWeight: 'bold', color: colors.gray + 90}}
                  placeholder={en.area_placeholder}
                  onChangeTextInput={area => this.setState({area})}
                />
                <MyTextInput
                  title={en.enter_city}
                  titleStyle={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: colors.gray + 90,
                  }}
                  value={city}
                  keyboardType={keyboardType.default}
                  textInputStyle={{fontWeight: 'bold', color: colors.gray + 90}}
                  placeholder={en.city_placeholder}
                  onChangeTextInput={city => this.setState({city})}
                />
                <MyTextInput
                  title={en.enter_state}
                  titleStyle={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: colors.gray + 90,
                  }}
                  value={state}
                  keyboardType={keyboardType.default}
                  textInputStyle={{fontWeight: 'bold', color: colors.gray + 90}}
                  placeholder={en.state_placeholder}
                  onChangeTextInput={state => this.setState({state})}
                />
                <MyTextInput
                  title={en.enter_pincode}
                  titleStyle={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: colors.gray + 90,
                  }}
                  value={pinCode}
                  keyboardType={keyboardType.numeric}
                  textInputStyle={{fontWeight: 'bold', color: colors.gray + 90}}
                  placeholder={en.pincode_placeholder}
                  onChangeTextInput={pinCode => this.setState({pinCode})}
                />

                <MyButton
                  title={user.address ? en.change_address : en.add_address}
                  onPressButton={() => this.onPressChangePassword()}
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    );
  }
}
