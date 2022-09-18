import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActivityLoader from '../../components/ActivityLoader';
import {HeaderBar} from '../../components/HeaderBar';
import colors from '../../utility/colors';
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
    onPress: NavigationRoutes.Orders,
    icon: 'format-list-text',
    iconType: 'MaterialCommunityIcons',
    updatable: false,
  },
  {
    title: 'My Wishlist',
    onPress: NavigationRoutes.Wishlist,
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

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      showLoader: false,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.setOptions({
      header: () => (
        <HeaderBar
          navigation={navigation}
          title={'Profile'}
          onBackPress={() => navigation.goBack()}
          showCart={false}
        />
      ),
    });
    this.getUserDetails();
  }

  getUserDetails = async () => {
    this.setState({user: await getUser()});
  };

  renderItem = ({item}) => {
    const {user} = this.state;
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          padding: 15,
          borderWidth: 1,
          borderColor: colors.prime + 80,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onPress={() => navigation.navigate(item.onPress)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Icon name={item.icon} size={18} color={colors.prime} />
          </View>
          <View style={{width: '80%'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.prime,
                marginLeft: 10,
              }}>
              {item.title}
            </Text>
            {item.title == 'My Addresses' && !!user && (
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '300',
                  color: colors.prime,
                  marginLeft: 10,
                }}>
                {!!user?.address?.houseNo
                  ? `${user?.address?.houseNo} ${user?.address?.area} ${user?.address?.city} ${user?.address?.state} ${user?.address?.country} Pincode: ${user?.address?.pinCode}`
                  : 'Please add address here'}
              </Text>
            )}
          </View>
        </View>
        {item.updatable && (
          <Icon
            name="pencil"
            size={18}
            color={colors.prime}
            style={{justifyContent: 'flex-end'}}
          />
        )}
      </TouchableOpacity>
    );
  };

  render() {
    const {showLoader, user} = this.state;
    const {navigation} = this.props;
    user == null &&
      Alert.alert(
        'Login Alert',
        'Dear user you need to login with your register number',
        [
          {
            text: 'Login',
            onPress: () => navigation.navigate(NavigationRoutes.Login),
          },
          {
            text: 'Cancel',
            onPress: () => navigation.navigate(NavigationRoutes.Dashboard),
          },
        ],
      );
    return (
      user != null && (
        <View style={styles.container}>
          {showLoader && <ActivityLoader showLoader={showLoader} />}
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LinearGradient
              colors={[colors.secondary, colors.prime]}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 75,
                  backgroundColor: colors.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: colors.prime,
                  }}>
                  {user.firstName && user.lastName
                    ? user.firstName.charAt(0) + user.lastName.charAt(0)
                    : user.firstName
                    ? user.firstName.charAt(0)
                    : user.lastName
                    ? user.lastName.charAt(0)
                    : ''}
                </Text>
              </View>
              <Text
                style={{fontSize: 25, fontWeight: 'bold', color: colors.white}}>
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.firstName
                  ? `${user.firstName}`
                  : user.lastName
                  ? `${user.lastName}`
                  : `${user.mobileNumber}`}
              </Text>
              <Text
                style={{fontSize: 18, fontWeight: '300', color: colors.white}}>
                {user.email}
              </Text>
              <Text
                style={{fontSize: 18, fontWeight: '300', color: colors.white}}>
                {user.mobileNumber}
              </Text>
            </LinearGradient>
          </View>
          <View
            style={{
              flex: 2,
              width: '100%',
            }}>
            <FlatList
              style={{flex: 1, width: '100%'}}
              data={DATA}
              renderItem={(item, index) => this.renderItem(item, index)}
              keyExtractor={(item, index) => index}
            />
          </View>
        </View>
      )
    );
  }
}
