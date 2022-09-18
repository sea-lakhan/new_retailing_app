import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  return await JSON.parse(await AsyncStorage.getItem('user')).token;
};

export const getPendingStatus = async () => {
  return await JSON.parse(await AsyncStorage.getItem('status'));
};

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const mobileValidation = /^[7-9][0-9]{9}$/;
export const passwordValidation =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;
export const pincodeValidation = /^[0-9]{6}$/;
export const nameValidation = /^[A-Z][a-z]+$/;
export const emailValidation = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

export const NavigationRoutes = {
  Dashboard: 'Dashboard',
  Search: 'Search',
  Help: 'Help',
  Login: 'Login',
  VerifyOtp: 'VerifyOtp',
  Categories: 'Categories',
  Cart: 'Cart',
  Wishlist: 'Wishlist',
  ForgotPassword: 'ForgotPassword',
  Signup: 'Signup',
  Profile: 'Profile',
  Products: 'Products',
  ProductDetails: 'ProductDetails',
  ChangePassword: 'ChangePassword',
  Address: 'Address',
  Orders: 'Orders',
};

export const getUser = async () => {
  return await JSON.parse(await AsyncStorage.getItem('user'));
};
