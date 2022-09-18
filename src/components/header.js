import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import colors from '../utility/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {images} from '../assests/images/images';
import {NavigationRoutes, windowHeight} from '../utility/util';
import LinearGradient from 'react-native-linear-gradient';

export const Header = props => {
  const [user, setUser] = useState(null);
  const menus = [
    {
      title: 'Dashboard',
      icon: 'grid',
      onPress: () => {
        props.navigation.navigate(NavigationRoutes.Dashboard),
          props.navigation.closeDrawer();
      },
    },
    {
      title: 'All Categories',
      icon: 'grid',
      onPress: () => {
        props.navigation.navigate(NavigationRoutes.Categories),
          props.navigation.closeDrawer();
      },
    },
    {
      title: 'Search',
      icon: 'search',
      onPress: () => {
        props.navigation.navigate(NavigationRoutes.Search),
          props.navigation.closeDrawer();
      },
    },
    {
      title: 'Help & Support',
      icon: 'help-circle',
      onPress: () => {
        props.navigation.navigate(NavigationRoutes.Help),
          props.navigation.closeDrawer();
      },
    },
  ];
  const userMenu = [
    {
      title: 'Dashboard',
      icon: 'grid',
      onPress: () => {
        props.navigation.navigate(NavigationRoutes.Dashboard),
          props.navigation.closeDrawer();
      },
    },
    {
      title: 'All Categories',
      icon: 'search',
      onPress: () => {
        props.navigation.navigate(NavigationRoutes.Categories),
          props.navigation.closeDrawer();
      },
    },
    {
      title: 'My Orders',
      icon: 'basket',
      onPress: () => {
        props.navigation.navigate(NavigationRoutes.Orders, {from: 'Home'}),
          props.navigation.closeDrawer();
      },
    },
    {
      title: 'My Cart',
      icon: 'cart',
      onPress: () => {
        props.navigation.navigate(NavigationRoutes.Cart),
          props.navigation.closeDrawer();
      },
    },
    {
      title: 'My Wishlist',
      icon: 'star',
      onPress: () => {
        props.navigation.navigate(NavigationRoutes.Wishlist),
          props.navigation.closeDrawer();
      },
    },
    {
      title: 'Help & Support',
      icon: 'help-circle',
      onPress: () => {
        props.navigation.navigate(NavigationRoutes.Help),
          props.navigation.closeDrawer();
      },
    },
  ];

  const getUser = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('user'));
    setUser(data);
  };

  const onPressLogout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    props.navigation.closeDrawer();
    props.navigation.navigate(NavigationRoutes.Dashboard, {
      screen: 'DashboardStack',
    });
  };

  const onPressLogin = async () => {
    props.navigation.navigate(NavigationRoutes.Login);
    props.navigation.closeDrawer();
  };

  const getUserProfileTitle = () => {
    if (user.firstName && user.lastName)
      return `${user.firstName} ${user.lastName}`;
    else if (user.firstName) return `${user.firstName}`;
    else if (user.lastName) return `${user.lastName}`;
    else return `${user.mobileNumber}`;
  };

  getUser();
  return (
    <ScrollView style={{height: windowHeight}}>
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.prime, colors.secondary]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            flex: 1,
            width: '100%',
            height: (windowHeight * 20) / 100,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 7,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Image
              source={images.round_logo}
              style={styles.logo}
              resizeMode="stretch"
            />

            <TouchableOpacity
              style={{
                alignItems: 'flex-start',
                paddingVertical: 20,
              }}
              onPress={() =>
                props.navigation.navigate(NavigationRoutes.Profile)
              }>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={[
                    styles.menuText,
                    {color: colors.secondary, fontWeight: 'bold'},
                  ]}>
                  {!!user ? getUserProfileTitle().toString() : 'Market'}
                </Text>
                <FontAwesome
                  name="pencil-square-o"
                  size={15}
                  color={colors.secondary + 90}
                  style={{fontWeight: 'bold', marginLeft: 5}}
                />
              </View>
              <Text
                style={[
                  styles.menuText,
                  {color: colors.white + 70, fontSize: 12},
                ]}>
                {!!user ? user.mobileNumber : 'Convenience'}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={{flex: 9, height: '100%', backgroundColor: colors.white}}>
          {user
            ? userMenu.map((obj, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.drawerMenuButtonStyle,
                    {borderTopWidth: index == 0 ? 1 : 0},
                  ]}
                  onPress={obj.onPress}>
                  <Icon
                    name={obj.icon}
                    size={25}
                    color={colors.secondary}
                    style={{fontWeight: 'bold'}}
                  />
                  <Text style={styles.menuText}>{obj.title}</Text>
                </TouchableOpacity>
              ))
            : menus.map((obj, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.drawerMenuButtonStyle,
                    // {borderTopWidth: index == 0 ? 1 : 0},
                  ]}
                  onPress={obj.onPress}>
                  <Icon
                    name={obj.icon}
                    size={20}
                    color={colors.secondary}
                    style={{fontWeight: 'bold'}}
                  />
                  <Text style={styles.menuText}>{obj.title}</Text>
                </TouchableOpacity>
              ))}
        </View>
        {user ? (
          <TouchableOpacity
            style={styles.logoutButtonStyle}
            onPress={onPressLogout}>
            <LinearGradient
              colors={[colors.prime, colors.secondary]}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={{
                width: '100%',
                paddingHorizontal: 20,
                paddingVertical: 20,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <MaterialIcons
                name="logout"
                size={20}
                color={colors.secondary}
                style={{fontWeight: 'bold'}}
              />
              <Text style={[styles.menuText, {color: colors.secondary + 90}]}>
                Logout
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.logoutButtonStyle}
            onPress={onPressLogin}>
            <LinearGradient
              colors={[colors.prime, colors.secondary]}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={{
                width: '100%',
                paddingHorizontal: 20,
                paddingVertical: 20,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <MaterialIcons
                name="login"
                size={20}
                color={colors.secondary}
                style={{fontWeight: 'bold'}}
              />
              <Text style={[styles.menuText, {color: colors.white + 70}]}>
                Login
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.primaryColor,
    height: windowHeight,
    width: '100%',
  },
  logo: {
    height: 50,
    width: 50,
    // width: '100%',
    // resizeMode: 'stretch',
  },
  drawerMenuButtonStyle: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderColor: colors.prime,
  },
  logoutButtonStyle: {
    borderTopWidth: 1,
    borderColor: colors.secondary,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  menuText: {
    marginLeft: 20,
    fontSize: 15,
    letterSpacing: 0.65,
    color: colors.secondary + 90,
    fontWeight: '500',
  },
});
