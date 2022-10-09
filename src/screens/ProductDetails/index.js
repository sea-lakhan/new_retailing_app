import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageEditor,
  FlatList,
  Alert,
} from 'react-native';
import {ImageSlider} from 'react-native-image-slider-banner';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {color} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActivityLoader from '../../components/ActivityLoader';
import {HeaderBar} from '../../components/HeaderBar';
import MyText from '../../components/Text';
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

const renderItem = ({item}) => {
  return (
    <View
      onPress={() => navigation.navigate(NavigationRoutes.ProductDetails)}
      style={{
        width: '100%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.white,
        padding: 5,
        marginVertical: 5,
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
              color: colors.white,
              fontWeight: '800',
              marginLeft: 5,
            }}>{`${item.rating} Rating & 10 Reviews`}</Text>
        </View>
        <Text style={{fontSize: 12, color: colors.white}}>
          {item.description}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.white}}>
            &#8377; {item.price}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: colors.green,
              marginLeft: 5,
            }}>{`${item.discount}% off`}</Text>
        </View>
      </View>
    </View>
  );
};

export class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      product: null,
      favorite: false,
      user: null,
      quantity: '0',
      productUnits: [],
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.setOptions({
      header: () => (
        <HeaderBar
          navigation={navigation}
          title={'Product Details'}
          onBackPress={() => navigation.pop()}
          showCart={true}
        />
      ),
    });
    this.getProductDetails();
    this.setUser();
    navigation.addListener('focus', () => this.setUser());
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', () => this.setUser());
  }

  setUser = async () => {
    this.setState({user: await getUser()});
  };

  setQuantity = (quantity, unit) => {
    console.log(quantity, ' ', unit);
    this.setState({quantity: quantity});
    // if (!!unit) {
    // (unit == 'Kilogram' || unit == 'lit') && Number(quantity) > 0
    //   ? this.setState({quantity: parseFloat(quantity).toFixed(3).toString()})
    //   : (unit == 'gm' || unit == 'quantity') && Number(quantity) > 0
    //   ? this.setState({quantity: parseInt(quantity).toFixed(0).toString()})
    //   : !!quantity && this.setState({quantity: '0'});
    // } else this.setState({quantity: '0'});
  };

  getProductDetails = () => {
    http.get(
      `${urls.getAllProducts}${this.props.route.params.productID}`,
      {},
      showLoader => this.setState({showLoader}),
      false,
      response => {
        this.setState({product: response.result[0]});
        console.log(response);
      },
    );
  };

  addToWishlist = async () => {
    const {product, user} = this.state;
    const {navigation} = this.props;
    await this.setUser();
    if (!!user) {
      const payload = {
        userID: user.userID,
        productID: product._id,
      };

      http.put(
        urls.addToWishlist,
        payload,
        showLoader => this.setState({showLoader}),
        true,
        response => {
          Alert.alert('Wishlist Alert', response.message);
          this.setState({
            favorite: true,
          });
        },
      );
    } else {
      Alert.alert(
        'Login Alert',
        'Please log in befoer add product to wishlit',
        [
          {
            text: 'Login',
            onPress: () =>
              navigation.navigate(NavigationRoutes.Login, {
                from: NavigationRoutes.ProductDetails,
              }),
          },
          {
            text: 'cancel',
          },
        ],
      );
    }
  };

  addToCart = async () => {
    const {product, quantity, user} = this.state;
    const {navigation} = this.props;
    await this.setUser();
    if (Number(quantity) <= 0) {
      Alert.alert('Quantity Alert', 'Please enter quantity greater than 0');
      return;
    } else if (!!user) {
      const payload = {
        productID: product._id,
        quantity: quantity,
      };

      http.put(
        `${urls.getCartItems}${user.userID}`,
        payload,
        showLoader => this.setState({showLoader}),
        true,
        response => {
          Alert.alert('Cart Alert', response.message);
        },
      );
    } else {
      Alert.alert('Login Alert', 'Please log in befoer add product to cart', [
        {
          text: 'Login',
          onPress: () =>
            navigation.navigate(NavigationRoutes.Login, {
              from: NavigationRoutes.ProductDetails,
            }),
        },
        {
          text: 'cancel',
        },
      ]);
    }
  };

  render() {
    const {showLoader, product, favorite, quantity} = this.state;
    return (
      <LinearGradient
        colors={[colors.secondary, colors.prime]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          flex: 1,
          width: windowWidth,
          height: windowHeight,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingTop: 20,
          }}>
          {showLoader && <ActivityLoader showLoader={showLoader} />}
          <ScrollView
            style={{
              flex: 1,
              width: windowWidth,
              // height: windowHeight,
              marginBottom: 60,
            }}>
            {!!product && (
              <View>
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    // paddingVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomWidth: product.images.length > 0 ? 1 : 0,
                    borderColor: colors.white,
                    // padding: 10,
                    backgroundColor: colors.white,
                    shadowColor: '#000',
                    elevation: 10,
                    borderRadius: 20,
                    marginVertical: 10,
                  }}>
                  {/* <Image
                  source={{uri: product.images[0]}}
                  style={{height: 300, width: 300}}
                  resizeMode="contain"
                /> */}
                  <ImageSlider
                    data={product.images.map(item => {
                      return {img: item};
                    })}
                    closeIconColor="#fff"
                    caroselImageStyle={{
                      height: 190,
                      width: (windowWidth * 95) / 100,
                      // padding: 10,
                      borderRadius: 20,
                      overflow: 'hidden',
                    }}
                    caroselImageContainerStyle={{
                      marginHorizontal: 10,
                    }}
                    previewImageStyle={{
                      height: '90%',
                      padding: 10,
                      resizeMode: 'contain',
                    }}
                    autoPlay={true}
                    indicatorContainerStyle={{top: 20}}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    padding: 20,

                    backgroundColor: colors.white,
                    shadowColor: '#000',
                    elevation: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: colors.secondary,
                      marginBottom: 5,
                    }}>
                    {product.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: colors.secondary,
                      }}>
                      &#8377; {product.price}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: colors.prime,
                        marginLeft: 5,
                      }}>
                      &#8377;{`${product.discount} off`}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 5,
                    }}>
                    <View
                      style={{
                        width: '25%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <LinearGradient
                        colors={[colors.secondary, colors.prime]}
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 1}}
                        style={{
                          flex: 1,
                          flexDirection: 'row',
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
                          {product.rating.toFixed(2)}
                        </Text>
                        <Icon
                          name="star"
                          size={18}
                          color={colors.white}
                          style={{marginLeft: 5}}
                        />
                      </LinearGradient>
                    </View>
                    <Text
                      style={{
                        fontSize: 15,
                        color: colors.secondary,
                        fontWeight: '800',
                        marginLeft: 5,
                      }}>{`${product.rating.toFixed(0)} Rating`}</Text>
                  </View>
                  {product.description && product.description != 'undefined' && (
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '500',
                          color: colors.secondary,
                          paddingVertical: 5,
                          borderBottomWidth: 0.2,
                          borderColor: colors.prime,
                        }}>
                        Description
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '300',
                          color: colors.secondary,
                        }}>
                        {product.description}
                      </Text>
                    </View>
                  )}
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginVertical: 10,
                      borderRadius: 10,
                    }}>
                    <MyTextInput
                      title={en.enter_quantity}
                      titleStyle={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        color: colors.white,
                        marginLeft: -5,
                        backgroundColor: colors.prime,
                      }}
                      value={quantity}
                      keyboardType={keyboardType.numeric}
                      textInputStyle={{
                        fontWeight: 'bold',
                        color: colors.secondary,
                        borderColor: colors.secondary,
                        marginLeft: -10,
                      }}
                      // placeholder={en.quantity_placeholder}
                      onChangeTextInput={quantity =>
                        this.setQuantity(
                          quantity,
                          !!product.unit && product.unit != 'undefined'
                            ? product.unit.title
                            : 'quantity',
                        )
                      }
                      textInputViewStyle={{width: '50%'}}
                      disabledTitle={true}
                    />
                    <MyText
                      title={en.product_unit}
                      titleStyle={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: colors.secondary,
                      }}
                      value={
                        !!product.unit && product.unit != 'undefined'
                          ? product.unit.title
                          : 'quantity'
                      }
                      textStyle={{
                        fontWeight: 'bold',
                        color: colors.secondary,
                        borderBottomWidth: 0,
                      }}
                      // textViewStyle={{width: '50%'}}r
                    />
                  </View>
                  {product.review && (
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '500',
                          color: colors.white,
                          paddingVertical: 5,
                          borderBottomWidth: 1,
                          borderColor: colors.secondary,
                        }}>
                        Review
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '300',
                          color: colors.secondary,
                        }}>
                        {product.review}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: windowWidth,
            height: 60,
            position: 'absolute',
            bottom: 0,
            shadowColor: '#000000',
            elevation: 10,
          }}>
          <LinearGradient
            colors={[colors.secondary, colors.prime]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={{
              flex: 1,
              width: windowWidth,
              // height: windowHeight,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                // backgroundColor: colors.white,
                width:
                  this.props?.route?.params?.from != 'Wishlist'
                    ? (windowWidth * 85) / 100
                    : windowWidth,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.addToCart()}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: colors.white,
                }}>
                Add To Cart
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
            style={{
              backgroundColor: colors.secondary,
              width: (windowWidth * 50) / 100,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: colors.white,
              }}>
              Add To Wishlist
            </Text>
          </TouchableOpacity> */}
            {this.props.route?.params?.from != 'Wishlist' && (
              <TouchableOpacity
                style={{
                  backgroundColor: colors.white,
                  width: (windowWidth * 15) / 100,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderLeftWidth: 1,
                }}
                disabled={favorite}
                onPress={() => this.addToWishlist()}>
                <Icon
                  name={favorite ? 'favorite' : 'favorite-border'}
                  size={34}
                  color={favorite ? colors.red : colors.prime}
                />
              </TouchableOpacity>
            )}
          </LinearGradient>
        </View>
      </LinearGradient>
    );
  }
}
