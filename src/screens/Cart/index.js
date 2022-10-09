import {Alert, FlatList, Image, ScrollView, Text, View} from 'react-native';
import React, {Component} from 'react';
import {styles} from './styles';
import colors from '../../utility/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import urls from '../../utility/urls';
import http from '../../utility/http';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  getPendingStatus,
  getUser,
  NavigationRoutes,
  windowHeight,
  windowWidth,
} from '../../utility/util';
import {HeaderBar} from '../../components/HeaderBar';
import ActivityLoader from '../../components/ActivityLoader';
import LinearGradient from 'react-native-linear-gradient';
import {color} from 'react-native-reanimated';
import MyTextInput from '../../components/TextInput';
import MyButton from '../../components/Button';
import {keyboardType} from '../../utility/types';
import {en} from '../../localization/english';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      showLoader: false,
      cartItemsQuantity: [],
      total: 0,
      totalQuantity: 0,
      cartItemsForOrder: [],
      couponCode: '',
      appliedCouponObject: null,
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
          title="Cart"
          onBackPress={() => navigation.navigate('Dashboard')}
        />
      ),
    });
    this.getCartItems();
    // this.getStatus();
  }

  getCartItems = async () => {
    const user = await getUser();
    http.get(
      `${urls.getCartItems}${user.userID}`,
      {},
      showLoader => this.setState({showLoader}),
      true,
      async response => {
        console.log(response, 'from get Cart items');
        if (response.message != 'Your cart is empty!')
          this.setState(
            {
              cart: response.result[0].cartItemsList,
              cartItemsQuantity: response.result[0].cartItems,
            },
            () => this.calculateTotal(),
          );
        else Alert.alert('Cart Alert', response.message);
      },
    );
  };

  increaseQuantity = async productID => {
    const user = await getUser();
    http.put(
      `${urls.increaseCartItemQuantity}${user.userID}`,
      {productID},
      showLoader => this.setState({showLoader}),
      true,
      async response => {
        if (response.result[0]?.cartItemsList.length > 0)
          this.setState(
            {
              cart: response.result[0].cartItemsList,
              cartItemsQuantity: response.result[0].cartItems,
            },
            () => this.calculateTotal(),
          );
        else Alert.alert('Cart Alert', response.message);
      },
    );
  };

  decreaseQuantity = async productID => {
    const user = await getUser();
    const payload = {productID};
    http.put(
      `${urls.decreaseCartItemQuantity}${user.userID}`,
      payload,
      showLoader => this.setState({showLoader}),
      true,
      async response => {
        if (response.result[0]?.cartItemsList.length > 0)
          this.setState(
            {
              cart: response.result[0].cartItemsList,
              cartItemsQuantity: response.result[0].cartItems,
            },
            () => this.calculateTotal(),
          );
        else Alert.alert('Cart Alert', response.message);
      },
    );
  };

  removeCartItem = async productID => {
    const user = await getUser();
    const payload = {
      productID,
    };
    http.delete(
      `${urls.getCartItems}${user.userID}`,
      payload,
      showLoader => this.setState({showLoader}),
      true,
      response => {
        if (response.result[0]?.cartItemsList.length > 0)
          this.setState({cart: response.result[0].cartItemsList}, () =>
            this.calculateTotal(),
          );
        else this.setState({cart: []}, () => this.calculateTotal());
      },
    );
  };

  renderItem = ({item}) => {
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        disabled
        onPress={() =>
          navigation.navigate(NavigationRoutes.ProductDetails, {
            productID: item._id,
            from: 'Wishlist',
          })
        }
        style={{
          width: windowWidth,
          flexDirection: 'row',
          borderBottomWidth: 0.2,
          borderColor: colors.prime,
          padding: 10,
          marginVertical: 5,
          borderRadius: 5,
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{uri: item.images[0]}}
            style={{height: 100, width: 100}}
            resizeMode="contain"
          />
        </View>
        <View style={{flex: 2}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: colors.prime}}>
            {item.title}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: '25%',
                flexDirection: 'row',
                backgroundColor: colors.prime,
                borderRadius: 5,
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.white,
                }}>
                {item.rating.toFixed(2)}
              </Text>
              <Icon
                name="star"
                size={18}
                color={colors.white}
                style={{marginLeft: 5}}
              />
            </View>
            <Text
              style={{
                fontSize: 15,
                color: colors.prime,
                fontWeight: '800',
                marginLeft: 5,
              }}>{`${item.rating} Rating`}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', color: colors.prime}}>
              &#8377; {item.price}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: colors.green,
                marginLeft: 5,
              }}>
              &#8377;{`${item.discount} off`}
            </Text>
          </View>
          <Text style={{fontSize: 15, fontWeight: '700', color: colors.prime}}>
            Quantity
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <TouchableOpacity
              style={{
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderRadius: 5,
                borderColor: colors.prime,
              }}
              onPress={() => this.decreaseQuantity(item._id)}>
              <Icon
                name="remove"
                size={20}
                color={colors.prime}
                style={{fontWeight: 'bold'}}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '800',
                color: colors.prime,
                marginHorizontal: 10,
              }}>
              {item.quantity}
            </Text>
            <TouchableOpacity
              style={{
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderRadius: 5,
                borderColor: colors.prime,
              }}
              onPress={() => this.increaseQuantity(item._id)}>
              <Icon
                name="add"
                size={20}
                color={colors.prime}
                style={{fontWeight: 'bold'}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              width: '50%',
              // alignItems: 'center',
              justifyContent: 'center',
              margin: 5,
            }}>
            <TouchableOpacity
              style={{
                width: '100%',
                paddingVertical: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.prime,
                borderRadius: 40,
              }}
              onPress={() => this.removeCartItem(item._id)}>
              <Text
                style={{fontSize: 15, fontWeight: '500', color: colors.white}}>
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  getPendingStatusID = async () => {
    const status = await getPendingStatus();
    return await status.find(status => status.title == 'Pending')._id;
  };

  onPlaceOrder = async () => {
    const {total, totalQuantity, cartItemsForOrder} = this.state;
    const user = await getUser();
    if (user?.address == undefined || user?.address?.houseNo == undefined) {
      Alert.alert(
        'Address alert',
        'Please add delivery address through your profile',
        [
          {
            text: 'Profile',
            onPress: () =>
              this.props.navigation.navigate(NavigationRoutes.Profile),
          },
        ],
      );
      return;
    }
    const payload = {
      userID: user.userID,
      deliveryStatus: await this.getPendingStatusID(),
      paymentStatus: false,
      paymentMethod: 'COD',
      quantity: totalQuantity,
      amount: this.getTotalAmount().toFixed(2),
      deliveryAddress: `${user?.address?.houseNo} ${user?.address?.area} ${user?.address?.city} ${user?.address?.state} ${user?.address?.country} Pincode: ${user?.address?.pinCode}`,
      products: cartItemsForOrder.map(product => {
        return {id: product._id, quantity: product.quantity};
      }),
    };

    http.post(
      urls.createOrder,
      payload,
      showLoader => this.setState({showLoader}),
      true,
      response => {
        console.log(response, 'from order place api');
        if (response.success != false) {
          Alert.alert('Order alert', 'Your order placed successfully.', [
            {
              text: 'OK',
              onPress: () => {
                this.clearCart();
                this.props.navigation.navigate(NavigationRoutes.Dashboard);
              },
            },
          ]);
        } else {
          Alert.alert('Order Alert', 'Something went wrong');
        }
      },
    );
  };

  clearCart = async () => {
    const user = await getUser();
    http.get(
      `${urls.clearCart}${user.userID}`,
      {},
      showLoader => this.setState({showLoader: false}),
      true,
      response => {
        this.setState({cartItemsForOrder: [], cart: [], cartItemsQuantity: []});
      },
    );
  };

  calculateTotal = async () => {
    const {cart, cartItemsQuantity} = this.state;
    let cartItemsForOrder = [];
    let total = 0;
    let totalQuantity = 0;
    await cart.map(async item => {
      let productQuantityObject = await cartItemsQuantity.find(
        product => product.productID == item._id,
      );
      cartItemsForOrder.push({
        ...item,
        quantity: productQuantityObject.quantity,
      });
      totalQuantity += productQuantityObject.quantity;
      total =
        total +
        (Number(item.price).toFixed(2) - Number(item.discount).toFixed(2)) *
          Number(productQuantityObject.quantity);
    });
    this.setState({total, totalQuantity, cartItemsForOrder});
  };

  onApplyPress = async () => {
    const {couponCode} = this.state;
    http.get(
      `${urls.applyCouponCode}${couponCode.toUpperCase()}`,
      {},
      showLoader => this.setState({showLoader}),
      false,
      response => {
        console.log(response, 'from apply pressed method');
        if (response.message == 'Coupons Applied successfully!') {
          this.setState({appliedCouponObject: response.result[0]});
          Alert.alert('Coupon Alert', 'Coupon code applied');
        } else
          Alert.alert(
            'Coupon Alert',
            'Coupon code does not valid, Please enter valid coupon code',
          );
      },
    );
  };

  getTotalAmount = () => {
    const {appliedCouponObject, total} = this.state;
    if (!!appliedCouponObject && appliedCouponObject?.isPercent)
      return total - (total * appliedCouponObject.amount) / 100;
    else if (!!appliedCouponObject) return total - appliedCouponObject.amount;
    else return total;
  };

  getDiscountAmount = () => {
    const {appliedCouponObject, total} = this.state;
    if (!!appliedCouponObject && appliedCouponObject?.isPercent)
      return (total * appliedCouponObject.amount) / 100;
    else if (!!appliedCouponObject) return appliedCouponObject.amount;
    else return 0;
  };

  render() {
    const {cartItemsForOrder, showLoader, total, couponCode} = this.state;
    return (
      <LinearGradient
        colors={[colors.secondary, colors.prime]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {showLoader && <ActivityLoader showLoader={showLoader} />}
        <View
          style={{
            flex: 1,
            width: '100%',
            borderRadius: 40,
            paddingTop: 20,
            backgroundColor: colors.white,
          }}>
          <LinearGradient
            colors={[colors.secondary, colors.prime]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 40,
            }}>
            {!!cartItemsForOrder && cartItemsForOrder.length > 0 ? (
              <ScrollView style={{width: windowWidth, marginBottom: 60}}>
                <FlatList
                  data={cartItemsForOrder}
                  renderItem={this.renderItem}
                  keyExtractor={item => item._id}
                  extraData={item => item._id}
                  style={{flex: 1}}
                  contentContainerStyle={{
                    // height: '100%',
                    width: '100%',
                    // paddingHorizontal: 10,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    // paddingBottom: 60,
                  }}
                />
                <View
                  style={{
                    backgroundColor: colors.white,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: colors.secondary,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: colors.secondary + 90,
                      marginLeft: (windowWidth * 3) / 100,
                      marginVertical: 5,
                    }}>
                    Coupon Code
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: colors.white,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.prime,
                    }}>
                    <MyTextInput
                      title="Coupon Code"
                      titleStyle={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: colors.gray + 90,
                      }}
                      value={couponCode}
                      keyboardType={keyboardType.default}
                      textInputStyle={{
                        fontWeight: 'bold',
                        color: colors.gray + 90,
                      }}
                      placeholder={en.coupon_code_placeholder}
                      onChangeTextInput={couponCode =>
                        this.setState({couponCode})
                      }
                      disabledTitle={true}
                      textInputViewStyle={{width: '75%'}}
                    />
                    <MyButton
                      title="Apply"
                      onPressButton={this.onApplyPress}
                      buttonStyle={{width: '100%', marginVertical: 5}}
                    />
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    // alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: colors.secondary + 90,
                      marginLeft: (windowWidth * 3) / 100,
                      marginVertical: 5,
                    }}>
                    Price Details
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginHorizontal: (windowWidth * 3) / 100,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: colors.prime,
                      }}>
                      Total mrp of ({cartItemsForOrder.length}) products{' '}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: colors.prime,
                      }}>
                      &#8377;{total.toFixed(2)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginHorizontal: (windowWidth * 3) / 100,
                      borderBottomWidth: 1,
                      borderColor: colors.secondary + 90,
                      paddingBottom: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: colors.prime,
                      }}>
                      Discount
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: colors.cancelStatusColor,
                      }}>
                      &#8377;{this.getDiscountAmount().toFixed(2)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginHorizontal: (windowWidth * 3) / 100,
                      borderBottomWidth: 1,
                      borderColor: colors.secondary + 90,
                      paddingBottom: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: colors.prime,
                      }}>
                      Total Amount
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: colors.prime,
                      }}>
                      &#8377;
                      {(
                        total.toFixed(2) - this.getDiscountAmount().toFixed(2)
                      ).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            ) : (
              !!cartItemsForOrder && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: colors.white,
                    }}>
                    Product not found
                  </Text>
                </View>
              )
            )}
          </LinearGradient>
        </View>
        {cartItemsForOrder.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth,
              height: 60,
              position: 'absolute',
              bottom: 0,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              backgroundColor: 'white',
            }}>
            {cartItemsForOrder && (
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.prime,
                  }}>
                  Total Cost
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: colors.prime,
                  }}>
                  {/* &#8377;{total.toFixed(2).toString()} */}
                  &#8377;{this.getTotalAmount().toFixed(0)}
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: colors.white,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: colors.prime,
                borderRadius: 40,
              }}
              onPress={() => this.onPlaceOrder()}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: colors.prime,
                }}>
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>
    );
  }
}
