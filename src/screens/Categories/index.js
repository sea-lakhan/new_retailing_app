import React, {Component} from 'react';
import {View, Text, ScrollView, Image, ImageEditor} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import ActivityLoader from '../../components/ActivityLoader';
import {HeaderBar} from '../../components/HeaderBar';
import colors from '../../utility/colors';
import http from '../../utility/http';
import urls from '../../utility/urls';
import {NavigationRoutes, windowHeight, windowWidth} from '../../utility/util';
import {styles} from './styles';

// const categories = [
//   {
//     title: 'Beverages',
//     image:
//       'https://www.mickeyparts.com/pages/media/Are-You-Planning-To-Run-A-Small-Beverage-Business.jpeg',
//     id: '1',
//     hasSubCategory: true,
//   },
//   {
//     title: 'Snacks',
//     image:
//       'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/03/snacks-recipes-fb.jpg',
//     id: '2',
//     hasSubCategory: true,
//   },
//   {
//     title: 'Desserts',
//     image: 'https://static.toiimg.com/photo/msid-88592911/88592911.jpg?83886',
//     id: '3',
//     hasSubCategory: false,
//   },
//   {
//     title: 'Beverages',
//     image:
//       'https://www.mickeyparts.com/pages/media/Are-You-Planning-To-Run-A-Small-Beverage-Business.jpeg',
//     id: '4',
//     hasSubCategory: true,
//   },
//   {
//     title: 'Snacks',
//     image:
//       'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/03/snacks-recipes-fb.jpg',
//     id: '5',
//     hasSubCategory: false,
//   },
//   {
//     title: 'Desserts',
//     image: 'https://static.toiimg.com/photo/msid-88592911/88592911.jpg?83886',
//     id: '6',
//     hasSubCategory: true,
//   },
//   {
//     title: 'Beverages',
//     image:
//       'https://www.mickeyparts.com/pages/media/Are-You-Planning-To-Run-A-Small-Beverage-Business.jpeg',
//     id: '7',
//     hasSubCategory: true,
//   },
//   {
//     title: 'Snacks',
//     image:
//       'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/03/snacks-recipes-fb.jpg',
//     id: '8',
//     hasSubCategory: true,
//   },
//   {
//     title: 'Desserts',
//     image: 'https://static.toiimg.com/photo/msid-88592911/88592911.jpg?83886',
//     id: '9',
//     hasSubCategory: false,
//   },
//   {
//     title: 'Beverages',
//     image:
//       'https://www.mickeyparts.com/pages/media/Are-You-Planning-To-Run-A-Small-Beverage-Business.jpeg',
//     id: '10',
//     hasSubCategory: true,
//   },
//   {
//     title: 'Snacks',
//     image:
//       'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/03/snacks-recipes-fb.jpg',
//     id: '11',
//     hasSubCategory: false,
//   },
//   {
//     title: 'Desserts',
//     image: 'https://static.toiimg.com/photo/msid-88592911/88592911.jpg?83886',
//     id: '12',
//     hasSubCategory: true,
//   },
//   {
//     title: 'Beverages',
//     image:
//       'https://www.mickeyparts.com/pages/media/Are-You-Planning-To-Run-A-Small-Beverage-Business.jpeg',
//     id: '13',
//     hasSubCategory: true,
//   },
//   {
//     title: 'Snacks',
//     image:
//       'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/03/snacks-recipes-fb.jpg',
//     id: '14',
//     hasSubCategory: false,
//   },
//   {
//     title: 'Desserts',
//     image: 'https://static.toiimg.com/photo/msid-88592911/88592911.jpg?83886',
//     id: '15',
//     hasSubCategory: true,
//   },
//   {
//     title: 'Beverages',
//     image:
//       'https://www.mickeyparts.com/pages/media/Are-You-Planning-To-Run-A-Small-Beverage-Business.jpeg',
//     id: '16',
//     hasSubCategory: false,
//   },
//   {
//     title: 'Snacks',
//     image:
//       'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/03/snacks-recipes-fb.jpg',
//     id: '17',
//     hasSubCategory: false,
//   },
//   {
//     title: 'Desserts',
//     image: 'https://static.toiimg.com/photo/msid-88592911/88592911.jpg?83886',
//     id: '18',
//     hasSubCategory: false,
//   },
// ];

export class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      categories: [],
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.setOptions({
      header: () => (
        <HeaderBar
          navigation={navigation}
          title="Categories"
          onBackPress={() => navigation.navigate('Dashboard')}
        />
      ),
    });
    this.getCategories();
  }

  getCategories = () => {
    http.get(
      urls.getCategories,
      {},
      showLoader => this.setState({showLoader}),
      false,
      response => {
        this.setState({categories: response.result});
      },
    );
  };

  render() {
    const {showLoader, categories} = this.state;
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
        {showLoader && <ActivityLoader showLoader={showLoader} />}
        <ScrollView
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
          }}
          contentContainerStyle={{
            height: '100%',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            backgroundColor: colors.white,
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: colors.secondary + 90,
              marginVertical: 10,
            }}>
            All Categories
          </Text>
          <LinearGradient
            colors={[colors.secondary, colors.prime]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={{
              width: '100%',
              // height: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              borderRadius: 40,
            }}>
            {categories.map(item => {
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
                    // backgroundColor: colors.white,
                    margin: 5,
                    // borderRadius: 10,
                    alignContent: 'center',
                    justifyContent: 'center',
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
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '900',
                      color: colors.white,
                      alignSelf: 'center',
                      margin: 5,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </LinearGradient>
        </ScrollView>
      </LinearGradient>
    );
  }
}
