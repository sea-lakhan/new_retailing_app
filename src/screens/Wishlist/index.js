import {FlatList, Image, Text, View} from 'react-native';
import React, {Component} from 'react';
import {styles} from './styles';
import PagerView from 'react-native-pager-view';
import colors from '../../utility/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import urls from '../../utility/urls';
import http from '../../utility/http';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  getUser,
  NavigationRoutes,
  windowHeight,
  windowWidth,
} from '../../utility/util';
import {HeaderBar} from '../../components/HeaderBar';
import ActivityLoader from '../../components/ActivityLoader';
import LinearGradient from 'react-native-linear-gradient';

export class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlist: [],
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
          title="Wishlist"
          onBackPress={() => navigation.goBack()}
        />
      ),
    });
    this.getWishlist();
  }

  getWishlist = async () => {
    const user = await getUser();
    http.get(
      `${urls.getWishlist}${user.userID}`,
      {},
      showLoader => this.setState({showLoader}),
      true,
      async response => {
        console.log(response.result);
        this.setState({wishlist: response.result});
      },
    );
  };

  renderItem = ({item}) => {
    const {navigation} = this.props;
    if (item.productList.length > 0) {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(NavigationRoutes.ProductDetails, {
              productID: item.productList[0]._id,
              from: 'Wishlist',
            })
          }
          style={{
            width: (windowWidth * 90) / 100,
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: colors.white,
            padding: 10,
            marginVertical: 5,
            borderRadius: 5,
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={{uri: item.productList[0].images[0]}}
              style={{height: 100, width: 100}}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 2}}>
            <Text
              style={{fontSize: 18, fontWeight: 'bold', color: colors.prime}}>
              {item.productList[0].title}
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
                  {item.productList[0].rating.toFixed(2)}
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
                }}>{`${item.productList[0].rating} Rating & 10 Reviews`}</Text>
            </View>
            {item.productList[0].description &&
              item.productList[0].description != 'undefined' && (
                <Text style={{fontSize: 12, color: colors.white}}>
                  {item.productList[0].description}
                </Text>
              )}
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: colors.white}}>
                &#8377; {item.productList[0].price}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: colors.green,
                  marginLeft: 5,
                }}>
                &#8377;{`${item.productList[0].discount} off`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  render() {
    const {wishlist, showLoader} = this.state;
    return (
      <LinearGradient
        colors={[colors.secondary, colors.prime]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: windowWidth,
          height: windowHeight,
        }}>
        <View
          style={{
            flex: 1,
            width: windowWidth,
            height: windowHeight,
            justifyContent: 'center',
            alignItems: 'center',
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
              justifyContent: 'center',
              alignItems: 'center',
              width: windowWidth,
              height: windowHeight,
              borderRadius: 40,
            }}>
            {showLoader && <ActivityLoader showLoader={showLoader} />}
            {wishlist.length > 0 ? (
              <FlatList
                data={wishlist}
                renderItem={this.renderItem}
                keyExtractor={item => item._id}
                extraData={item => item._id}
                style={{flex: 1}}
                contentContainerStyle={{
                  // height: '100%',
                  width: '100%',
                  paddingHorizontal: 10,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingVertical: 20,
                }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: colors.white + 90,
                  }}>
                  Product Not Found
                </Text>
              </View>
            )}
          </LinearGradient>
        </View>
      </LinearGradient>
    );
  }
}

export default Wishlist;
