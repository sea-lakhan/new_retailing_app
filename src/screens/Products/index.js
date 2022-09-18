import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageEditor,
  FlatList,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {color} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActivityLoader from '../../components/ActivityLoader';
import MyButton from '../../components/Button';
import {HeaderBar} from '../../components/HeaderBar';
import MyTextInput from '../../components/TextInput';
import {en} from '../../localization/english';
import colors from '../../utility/colors';
import http from '../../utility/http';
import {keyboardType} from '../../utility/types';
import urls from '../../utility/urls';
import {NavigationRoutes, windowHeight, windowWidth} from '../../utility/util';
import {styles} from './styles';

export class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      categoryID: this.props.route.params.categoryID,
      categories: this.props.route.params.categories,
      searchText: this.props.route.params.searchText,
      products: [],
      comeFrom: this.props.route.params.searchText,
    };
  }

  componentDidMount() {
    const {comeFrom} = this.state;
    const {navigation} = this.props;
    navigation.setOptions({
      header: () => (
        <HeaderBar
          navigation={navigation}
          title={!comeFrom ? 'Products' : 'Search Products'}
          onBackPress={() => navigation.pop()}
        />
      ),
    });
    if (!comeFrom) this.getProducts();
    else this.getSearchProduct();
  }

  getSearchProduct = async () => {
    const {searchText} = this.state;
    http.get(
      `${urls.searchProduct}${searchText}`,
      {},
      showLoader => this.setState({showLoader}),
      false,
      response => {
        this.setState({products: response.result});
      },
    );
  };

  getProducts = () => {
    const {categoryID} = this.state;
    http.get(
      categoryID == 'All' ? urls.getAllProducts : urls.getProducts + categoryID,
      {},
      showLoader => this.setState({showLoader}),
      false,
      response => {
        this.setState({products: response.result});
      },
    );
  };

  onPressCategory = categoryID => {
    this.setState({categoryID}, () => {
      this.getProducts();
    });
  };

  renderItem = ({item, index}) => {
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(NavigationRoutes.ProductDetails, {
            productID: item._id,
          })
        }
        style={{
          width: (windowWidth * 92) / 100,
          // width: '100%',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: colors.white,
          borderRadius: 10,
          padding: 10,
          backgroundColor: colors.white,
          shadowColor: '#000',
          elevation: 10,
          marginVertical: 10,
        }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item.images[0]}}
            style={{height: 100, width: 100}}
            resizeMode="contain"
          />
        </View>
        <View style={{flex: 2}}>
          <Text
            style={{fontSize: 18, fontWeight: 'bold', color: colors.secondary}}
            numberOfLines={2}>
            {item.title}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: '25%',
                flexDirection: 'row',
                backgroundColor: colors.prime,
                borderRadius: 5,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LinearGradient
                colors={[colors.secondary, colors.prime]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={{
                  flex: 1,
                  borderRadius: 5,
                  flexDirection: 'row',
                  padding: 5,
                  // width: windowWidth,
                  // height: windowHeight,
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
              </LinearGradient>
            </View>
            <Text
              style={{
                fontSize: 15,
                color: colors.white,
                fontWeight: '800',
                marginLeft: 5,
              }}>{`${item.rating} Rating & 10 Reviews`}</Text>
          </View>
          {/* {item.description && item.description != 'undefined' && (
            <Text style={{fontSize: 12, color: colors.white}}>
              {item.description}
            </Text>
          )} */}
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: colors.secondary,
              }}>
              &#8377; {item.price}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: colors.prime,
                marginLeft: 5,
              }}>
              &#8377;{`${item.discount} off`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  onSearchPress = () => {
    this.getSearchProduct();
  };

  render() {
    const {showLoader, products, categories, categoryID, searchText, comeFrom} =
      this.state;
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
            height: '100%',
            width: '100%',
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          {!!comeFrom && (
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: colors.white,
                shadowColor: '#000',
                elevation: 10,
                marginVertical: 5,
                borderRadius: 10,
              }}>
              <MyTextInput
                title="Search Text"
                titleStyle={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: colors.gray + 90,
                }}
                value={searchText}
                keyboardType={keyboardType.default}
                textInputStyle={{
                  fontWeight: 'bold',
                  color: colors.gray + 90,
                }}
                placeholder={en.search_product_placeholder}
                onChangeTextInput={searchText => this.setState({searchText})}
                textInputViewStyle={{width: '75%'}}
                disabledTitle={true}
              />
              <MyButton
                title="Search"
                onPressButton={this.onSearchPress}
                buttonStyle={{width: '100%', marginVertical: 5}}
              />
            </View>
          )}
          <View
            style={{
              width: '100%',
              // marginTop: 20,
              // paddingHorizontal: 10,
              paddintTop: 20,
              backgroundColor: colors.white,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {!comeFrom && (
              <ScrollView
                horizontal={true}
                contentContainerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 30,
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    margin: 5,
                    paddingVertical: 5,
                    borderColor:
                      categoryID == 'All' ? colors.secondary : colors.prime,
                    borderWidth: 2,
                  }}
                  onPress={() => {
                    this.setState({categoryID: 'All'}, () =>
                      this.getProducts(),
                    );
                  }}>
                  <Text
                    style={{
                      color:
                        categoryID == 'All' ? colors.secondary : colors.prime,
                      fontSize: 15,
                      fontWeight: '600',
                    }}>
                    All
                  </Text>
                </TouchableOpacity>
                {categories.map(item => {
                  return (
                    <TouchableOpacity
                      key={item._id}
                      style={{
                        borderRadius: 30,
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        margin: 5,
                        paddingVertical: 5,
                        borderColor:
                          categoryID == item._id
                            ? colors.secondary
                            : colors.prime,
                        borderWidth: 2,
                      }}
                      onPress={() => this.onPressCategory(item._id)}>
                      <Text
                        style={{
                          color:
                            categoryID == item._id
                              ? colors.secondary
                              : colors.prime,
                          fontSize: 15,
                          fontWeight: '600',
                        }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          </View>
          {/* <LinearGradient
            colors={[colors.secondary, colors.prime]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={{
              flex: 1,
              width: (windowWidth * 95) / 100,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}> */}
          {showLoader && <ActivityLoader showLoader={showLoader} />}
          {products.length > 0 ? (
            <FlatList
              data={products}
              renderItem={this.renderItem}
              keyExtractor={item => item._id}
              extraData={item => item._id}
              style={{flex: 1}}
              contentContainerStyle={{
                // height: '100%',
                width: (windowWidth * 95) / 100,
                // paddingHorizontal: 10,
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingVertical: 20,
              }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 15,
                  fontWeight: '600',
                  color: colors.white,
                }}>
                Product not found
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    );
  }
}
