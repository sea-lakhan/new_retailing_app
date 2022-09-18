import React, {Component} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BackHandler, StatusBar, View} from 'react-native';
import {Header} from './components/header';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from 'react-native-splash-screen';

import colors from './utility/colors';

import Dashboard from './screens/Dashboard';
import Search from './screens/Search';
import Help from './screens/Help';
import Login from './screens/Login';
import VerifyOtp from './screens/VerifyOtp';
import Wishlist from './screens/Wishlist';
import ForgotPassword from './screens/ForgotPassword';
import Signup from './screens/Signup';
import Profile from './screens/Profile';
import {Categories} from './screens/Categories';
import {SubCategories} from './screens/SubCategories';
import {Products} from './screens/Products';
import {ProductDetails} from './screens/ProductDetails';
import {createStackNavigator} from '@react-navigation/stack';
import ChangePassword from './screens/ChangePassword';
import Address from './screens/Address';
import Orders from './screens/Orders';
import Cart from './screens/Cart';
import http from './utility/http';

const Stack = createStackNavigator();

function CategoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoryStack"
        component={Categories}
        options={{unmountOnBlur: true}}
      />
      <Stack.Screen name="SubCategories" component={SubCategories} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{unmountOnBlur: true}}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="VerifyOtp"
        component={VerifyOtp}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </Stack.Navigator>
  );
}

function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DashboardStack"
        component={Dashboard}
        options={{unmountOnBlur: true}}
      />
      <Stack.Screen name="SubCategories" component={SubCategories} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{unmountOnBlur: true}}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="VerifyOtp"
        component={VerifyOtp}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </Stack.Navigator>
  );
}

function WishlistStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="wishlistStack"
        component={Wishlist}
        options={{unmountOnBlur: true}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{unmountOnBlur: true}}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileStack"
        component={Profile}
        options={{unmountOnBlur: true}}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen
        name="Wishlist"
        component={WishlistStack}
        options={{unmountOnBlur: true, headerShown: false}}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{unmountOnBlur: true}}
      />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  

  render() {
    return (
      <>
        <StatusBar
          animated={true}
          backgroundColor={colors.prime}
          barStyle="dark-content"
          showHideTransition="fade"
        />
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{
              drawerStyle: {
                backgroundColor: '#c6cbef',
                width: '60%',
              },
              headerTintColor: colors.prime,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center',
              },
              headerStyle: {
                backgroundColor: colors.primaryColor,
                // color:colors.white,
              },
              headerRight:
                () =>
                ({color, size}) =>
                  (
                    <MaterialCommunityIcons
                      name="cart"
                      color={colors.white}
                      size={20}
                    />
                  ),
              headerShown: true,
            }}
            drawerContent={props => <Header {...props} />}>
            <Drawer.Screen
              name="Dashboard"
              component={DashboardStack}
              options={{unmountOnBlur: true, headerShown: false}}
            />
            <Drawer.Screen name="Search" component={Search} />
            <Drawer.Screen name="Help" component={Help} />
            <Drawer.Screen
              name="Categories"
              component={CategoryStack}
              options={{unmountOnBlur: true, headerShown: false}}
            />
            <Drawer.Screen
              name="Cart"
              component={Cart}
              options={{unmountOnBlur: true}}
            />
            <Stack.Screen
              name="Address"
              component={Address}
              options={{unmountOnBlur: true}}
            />
            <Drawer.Screen
              name="Orders"
              component={Orders}
              options={{unmountOnBlur: true}}
            />
            <Drawer.Screen
              name="Wishlist"
              component={WishlistStack}
              options={{unmountOnBlur: true, headerShown: false}}
            />
            <Drawer.Screen
              name="Profile"
              component={ProfileStack}
              options={{unmountOnBlur: true, headerShown: false}}
            />
            {/* <Drawer.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{unmountOnBlur: true}}
            />
            <Drawer.Screen
              name="Address"
              component={Address}
              options={{unmountOnBlur: true}}
            /> */}
            <Drawer.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
                unmountOnBlur: true,
              }}
            />
            <Drawer.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{
                headerShown: false,
                unmountOnBlur: true,
              }}
            />
            <Drawer.Screen
              name="Signup"
              component={Signup}
              options={{
                headerShown: false,
                unmountOnBlur: true,
              }}
            />
            <Drawer.Screen
              name="VerifyOtp"
              component={VerifyOtp}
              options={{
                headerShown: false,
                unmountOnBlur: true,
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

export default App;
