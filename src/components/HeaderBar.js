import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../utility/colors';
import {NavigationRoutes, windowWidth} from '../utility/util';

export class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    const {count} = this.state;
    const {navigation, title, isHome, onBackPress} = this.props;
    return (
      <LinearGradient
        colors={[colors.prime, colors.secondary]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          width: windowWidth,
          height: 60,
          // height: windowHeight,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: colors.primaryColor,
            justifyContent: 'space-between',
            // borderBottomWidth: 1,
            // borderBottomColor: colors.white,
          }}>
          <TouchableOpacity
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}
            onPress={() => {
              if (isHome) {
                onBackPress();
              } else {
                onBackPress();
                // navigation.goBack();
              }
            }}>
            <Icon
              name={isHome ? 'menu' : 'arrow-back'}
              size={25}
              color={colors.white + 70}
              style={{fontWeight: 'bold'}}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 9,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: colors.white + 90,
              }}>
              {title}
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            {this.props.showProfile && (
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate(NavigationRoutes.Profile)}
                // disabled={!this.props.showCart}>
              >
                <Icon
                  name="search"
                  size={25}
                  color={
                    this.props.showProfile
                      ? colors.white + 90
                      : colors.white + 90
                  }
                  style={{fontWeight: 'bold'}}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate(NavigationRoutes.Cart)}
              // disabled={!this.props.showCart}>
            >
              <Icon
                name="shopping-cart"
                size={25}
                color={
                  this.props.showCart ? colors.white + 90 : colors.white + 90
                }
                style={{fontWeight: 'bold'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
    justifyContent: 'space-between',
  },
});
