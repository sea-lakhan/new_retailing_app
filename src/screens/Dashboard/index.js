import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  SectionList,
  Text,
  View,
} from 'react-native';
import React, {Component} from 'react';

import {styles} from './styles';
import PagerView from 'react-native-pager-view';
import colors from '../../utility/colors';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import urls from '../../utility/urls';
import http from '../../utility/http';
import LinearGradient from 'react-native-linear-gradient';
import {
  getUser,
  NavigationRoutes,
  windowHeight,
  windowWidth,
} from '../../utility/util';
import ActivityLoader from '../../components/ActivityLoader';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {HeaderBar} from '../../components/HeaderBar';
import {ImageSlider} from 'react-native-image-slider-banner';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyButton from '../../components/Button';
import {en} from '../../localization/english';
import MyTextInput from '../../components/TextInput';
import {keyboardType} from '../../utility/types';

const Data = [
  {
    title: 'Beverage',
    data: [
      {
        title: 'Milk Shake',
        image:
          'https://i2.wp.com/bakingmischief.com/wp-content/uploads/2022/03/coffee-milkshake-image-684x1024.jpg',
        price: '40',
      },
      {
        title: 'Butter Milk',
        image:
          'https://www.ticklingpalates.com/wp-content/uploads/2022/04/spiced-buttermilk.jpg',
        price: '30',
      },
      {
        title: 'Fresh Lime Soda',
        image:
          'https://www.worldvision.org/wp-content/uploads/2017/07/Lime-Soda-167-850x568.jpg',
        price: '50',
      },
    ],
  },
  {
    title: 'Pizza',
    data: [
      {
        title: 'Margarita Pizza',
        image:
          'https://www.vegrecipesofindia.com/wp-content/uploads/2020/12/margherita-pizza-4-1152x1536.jpg',
        price: '250',
      },
      {
        title: 'Tandoor Paneer Pizza',
        image:
          'https://parcelwalaa.in/wp-content/uploads/2022/02/images-2022-02-25T235917.320.jpeg',
        price: '350',
      },
      {
        title: 'Cheezy Corn Pizza',
        image:
          'https://gomyoffer.in/wp-content/uploads/2021/06/cheese-corn-pizza-1.jpg',
        price: '280',
      },
    ],
  },
  {
    title: 'Snacks',
    data: [
      {
        title: 'Apple Sause',
        image:
          'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190829-instant-pot-applesauce-0035-portrait-pf-1568394712.jpg',
        price: '90',
      },
      {
        title: 'Boiled Egg',
        image:
          'https://www.thespruceeats.com/thmb/Oqvuvzic6RJX1xgbyozONodtju4=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/perfect-hard-boiled-eggs-995510-Hero_3-03d1b108d1ca489dad9e1f1d7fdba73f.jpg',
        price: '80',
      },
      {
        title: 'Green Smoothie',
        image:
          'https://www.purelykaylie.com/wp-content/uploads/2021/07/pineapple-green-smoothie-1.jpg',
        price: '90',
      },
    ],
  },
];

// const Item = ({item}) => {
//   return (
//     <TouchableOpacity
//       style={{
//         flex: 1,
//         width: '100%',
//         flexDirection: 'row',
//         alignItems: 'center',
//         margin: 10,
//       }}>
//       <Image
//         source={{uri: item.image}}
//         style={{width: 100, height: 100, borderRadius: 10}}
//       />
//       <View style={{marginLeft: 20, alignSelf: 'flex-start'}}>
//         <Text
//           style={{
//             fontSize: 18,
//             fontWeight: 'bold',
//             color: colors.secondary + 90,
//           }}>
//           {item.title}
//         </Text>
//         <Text
//           style={{fontSize: 15, fontWeight: '800', color: colors.prime + 80}}>
//           {`Price: `}&#8377;{item.price}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      showLoader: false,
      address: '',
      searchText: '',
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    navigation.setOptions({
      header: () => (
        <HeaderBar
          navigation={navigation}
          title={'Dashboard'}
          isHome={true}
          onBackPress={() => navigation.openDrawer()}
          showCart={true}
          showProfile={true}
        />
      ),
    });
    this.getCategories();
    this.getOffers();
    this.getStatus();
    this.getAddress();
  }

  getStatus = async () => {
    http.get(
      `${urls.getOrderStatus}`,
      {},
      showLoader => this.setState({showLoader}),
      false,
      async response => {
        console.log(response, 'from order status');
        const status = await response.result[0].filter(status => {
          if (status.title == 'Pending' || status.title == 'Cancel')
            return status;
        });
        AsyncStorage.setItem('status', JSON.stringify(status));
      },
    );
  };

  getCategories = () => {
    http.get(
      urls.getCategories,
      {},
      showLoader => this.setState({showLoader}),
      false,
      async response => {
        console.log(response.result);
        this.setState({categories: response.result});
      },
    );
  };

  getOffers = async () => {
    console.log('get offers called');
    http.get(
      urls.getOffers,
      {},
      showLoader => this.setState({showLoader}),
      false,
      response => {
        console.log(response, 'from get offer method');
      },
    );
  };

  getAddress = async () => {
    const user = await getUser();
    console.log(user);
    let address = '';
    if (user.firstName) address = `${user.firstName} - `;
    else if (user.lastName) address = `${user.lastName} - `;
    else address = `${user.mobileNumber} - `;
    if (!!user.address.city) address = `${address}${user.address.city}`;
    if (!!user.address.pinCode) address = `${address}${user.address.pinCode}`;
    console.log(address);
    this.setState({address});
  };

  // renderItem = ({item, index}) => {
  //   const {categories} = this.state;
  //   const {navigation} = this.props;
  //   return (
  //     <View
  //       key={item.name + index}
  //       style={{
  //         width: '90%',
  //         alignItems: 'flex-start',
  //         marginVertical: 10,
  //       }}>
  //       <View
  //         style={{
  //           width: '85%',
  //           flexDirection: 'row',
  //           alignSelf: 'flex-start',
  //           justifyContent: 'space-between',
  //         }}>
  //         <Text
  //           style={{
  //             fontSize: 18,
  //             fontWeight: 'bold',
  //             color: colors.secondary + 90,
  //           }}>
  //           {item.name}
  //         </Text>
  //         <TouchableOpacity
  //           style={{
  //             paddingHorizontal: 5,
  //             alignItems: 'center',
  //           }}
  //           onPress={() =>
  //             navigation.navigate(NavigationRoutes.Products, {
  //               categoryID: item._id,
  //               categories: categories,
  //             })
  //           }>
  //           <Text
  //             style={{fontSize: 15, fontWeight: '500', color: colors.prime}}>
  //             More...
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //       {item.subcategory.length > 0 ? (
  //         <View
  //           style={{
  //             width: '100%',
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //             flexWrap: 'wrap',
  //           }}>
  //           {item.subcategory.map(subcategory => {
  //             return (
  //               <TouchableOpacity
  //                 key={subcategory.name}
  //                 style={{
  //                   flex: 1,
  //                   width: '100%',
  //                   alignItems: 'center',
  //                   margin: 10,
  //                 }}
  //                 onPress={() =>
  //                   navigation.navigate(NavigationRoutes.Products, {
  //                     categoryID: item._id,
  //                     categories: categories,
  //                   })
  //                 }>
  //                 <Image
  //                   source={{uri: subcategory.images[0]}}
  //                   style={{width: 100, height: 100, borderRadius: 10}}
  //                 />
  //                 <View style={{marginLeft: 20, alignSelf: 'flex-start'}}>
  //                   <Text
  //                     style={{
  //                       fontSize: 18,
  //                       fontWeight: 'bold',
  //                       color: colors.white,
  //                     }}>
  //                     {subcategory.name}
  //                   </Text>
  //                 </View>
  //               </TouchableOpacity>
  //             );
  //           })}
  //         </View>
  //       ) : (
  //         <TouchableOpacity
  //           style={{
  //             flex: 1,
  //             width: '100%',
  //             alignItems: 'center',
  //             margin: 10,
  //           }}>
  //           <Image
  //             source={{uri: item.images[0]}}
  //             resizeMode="stretch"
  //             style={{
  //               width: 100,
  //               height: 100,
  //               borderRadius: 10,
  //               backgroundColor: colors.white,
  //             }}
  //           />
  //           <View style={{marginLeft: 20, alignSelf: 'flex-start'}}>
  //             <Text
  //               style={{
  //                 fontSize: 18,
  //                 fontWeight: 'bold',
  //                 color: colors.white,
  //               }}>
  //               {item.name}
  //             </Text>
  //           </View>
  //         </TouchableOpacity>
  //       )}
  //     </View>
  //   );
  // };

  onSearchPress = () => {
    const {searchText, categories} = this.state;
    const {navigation} = this.props;
    if (!!searchText) {
      navigation.navigate(NavigationRoutes.Products, {
        comeFrom: 'Search',
        searchText: searchText,
        categories: categories,
      }),
        this.setState({searchText: ''});
    } else {
      Alert.alert('Validation Alert', 'Please add search text first');
    }
  };

  render() {
    const {categories, showLoader, address, searchText} = this.state;
    const {navigation} = this.props;
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
        <ScrollView>
          <View
            style={{
              flex: 1,
              width: windowWidth,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              backgroundColor: colors.white,
              paddingTop: 20,
              paddingHorizontal: 10,
              // padding:50
            }}>
            {showLoader && <ActivityLoader showLoader={showLoader} />}
            {!!address && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}>
                <Ionicons
                  name="location"
                  size={20}
                  color={colors.secondary + 90}
                />
                <Text>Deliver to {address}</Text>
              </View>
            )}
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                // paddingHorizontal: 20,
                backgroundColor: '#ffffff',
                marginVertical: 10,
                shadowColor: '#000000',
                elevation: 10,
                borderRadius: 5,
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
                textInputStyle={{fontWeight: 'bold', color: colors.gray + 90}}
                placeholder={en.search_product_placeholder}
                onChangeTextInput={searchText => this.setState({searchText})}
                disabledTitle={true}
                textInputViewStyle={{width: '75%'}}
              />
              <MyButton
                title="Search"
                onPressButton={this.onSearchPress}
                buttonStyle={{
                  width: '100%',
                  paddingVertical: 2,
                  marginVertical: 5,
                }}
              />
            </View>
            <View
              style={{
                height: 250,
                justifyContent: 'center',
                alignItems: 'center',
                // paddingHorizontal: 10,
                marginVertical: 10,
                borderRadius: 20,
              }}>
              <ImageSlider
                data={[
                  {
                    img: 'https://img.freepik.com/free-psd/healthy-eating-lifestyle-banner-template_23-2149087275.jpg?size=626&ext=jpg&ga=GA1.2.1993081445.1663181427',
                  },
                  {
                    img: 'https://img.freepik.com/premium-psd/super-grocery-sale-web-banner_120329-268.jpg?size=626&ext=jpg&ga=GA1.2.1993081445.1663181427',
                  },
                  {
                    img: 'https://img.freepik.com/free-psd/summer-horizontal-banner-template_23-2148930423.jpg?size=626&ext=jpg&ga=GA1.2.1993081445.1663181427',
                  },
                  {
                    img: 'https://img.freepik.com/free-psd/banner-breakfast-time-template_23-2148707169.jpg?size=626&ext=jpg&ga=GA1.2.1993081445.1663181427',
                  },
                ]}
                autoPlay={true}
                // onItemChanged={item => console.log('item', item)}
                closeIconColor="#fff"
                caroselImageStyle={{
                  height: 190,
                  width: (windowWidth * 95.2) / 100,
                  padding: 10,
                  borderRadius: 20,
                  overflow: 'hidden',
                }}
                indicatorContainerStyle={{top: 5, color: colors.white}}
              />
            </View>
            <LinearGradient
              colors={[colors.prime, colors.white]}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                paddingVertical: 20,
                borderRadius: 20,
                shadowColor: '#000000',
                elevation: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: colors.white + 90,
                  }}>
                  Our Services
                </Text>
              </View>
              <ScrollView
                style={{
                  // flex: 1,
                  // height: '100%',
                  width: '100%',
                  paddingHorizontal: 20,
                }}
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  paddingVertical: 20,
                }}>
                {categories.map((item, index) => {
                  if (index < 9) {
                    return (
                      <TouchableOpacity
                        key={item._id + ''}
                        onPress={() => {
                          // if (item.hasSubCategory) {
                          //   navigation.navigate('SubCategories', {categoryID: item.id});
                          // } else {
                          //   navigation.navigate('Products', {categoryID: item.id});
                          // }
                          navigation.navigate(NavigationRoutes.Products, {
                            categoryID: item._id,
                            categories: categories,
                          });
                        }}
                        style={{
                          width: (windowWidth * 26) / 100,
                          padding: 10,
                          backgroundColor: colors.white,
                          margin: 5,
                          borderRadius: 10,
                          alignContent: 'center',
                          justifyContent: 'center',
                          shadowColor: '#000000',
                          elevation: 10,
                        }}>
                        <Image
                          // source={{
                          //   uri: 'https://www.mickeyparts.com/pages/media/Are-You-Planning-To-Run-A-Small-Beverage-Business.jpeg',
                          // }}
                          source={{uri: item.images[0]}}
                          resizeMode="stretch"
                          style={{
                            height: 90,
                            width: 90,
                            alignSelf: 'center',
                            borderRadius: 45,
                            backgroundColor: colors.white,
                            shadowColor: '#000000',
                            elevation: 10,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: '900',
                            color: colors.secondary + 90,
                            alignSelf: 'center',
                            margin: 5,
                          }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                })}
              </ScrollView>
            </LinearGradient>
            {/* <FlatList
            data={categories}
            renderItem={this.renderItem}
            keyExtractor={item => item._id}
            extraData={item => item._id}
            style={{flex: 1}}
            contentContainerStyle={{
              width: '100%',
              paddingHorizontal: 10,
              justifyContent: 'flex-start',
              paddingVertical: 20,
            }}
          /> */}
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

export default Dashboard;
