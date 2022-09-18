import React, {Component} from 'react';
import {View, Text, ScrollView, Image, ImageEditor} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utility/colors';
import http from '../../utility/http';
import {windowHeight, windowWidth} from '../../utility/util';
import {styles} from './styles';

const categories = [
  {
    title: 'Beverages',
    image:
      'https://www.mickeyparts.com/pages/media/Are-You-Planning-To-Run-A-Small-Beverage-Business.jpeg',
    id: '1',
  },
  {
    title: 'Snacks',
    image:
      'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/03/snacks-recipes-fb.jpg',
    id: '2',
  },
  {
    title: 'Desserts',
    image: 'https://static.toiimg.com/photo/msid-88592911/88592911.jpg?83886',
    id: '3',
  },
  {
    title: 'Beverages',
    image:
      'https://www.mickeyparts.com/pages/media/Are-You-Planning-To-Run-A-Small-Beverage-Business.jpeg',
    id: '4',
  },
  {
    title: 'Snacks',
    image:
      'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/03/snacks-recipes-fb.jpg',
    id: '5',
  },
  {
    title: 'Desserts',
    image: 'https://static.toiimg.com/photo/msid-88592911/88592911.jpg?83886',
    id: '6',
  },
  {
    title: 'Beverages',
    image:
      'https://www.mickeyparts.com/pages/media/Are-You-Planning-To-Run-A-Small-Beverage-Business.jpeg',
    id: '7',
  },
  {
    title: 'Snacks',
    image:
      'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/03/snacks-recipes-fb.jpg',
    id: '8',
  },
  {
    title: 'Desserts',
    image: 'https://static.toiimg.com/photo/msid-88592911/88592911.jpg?83886',
    id: '9',
  },
  {
    title: 'Beverages',
    image:
      'https://www.mickeyparts.com/pages/media/Are-You-Planning-To-Run-A-Small-Beverage-Business.jpeg',
    id: '10',
  },
  {
    title: 'Snacks',
    image:
      'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/03/snacks-recipes-fb.jpg',
    id: '11',
  },
  {
    title: 'Desserts',
    image: 'https://static.toiimg.com/photo/msid-88592911/88592911.jpg?83886',
    id: '12',
  },
  {
    title: 'Beverages',
    image:
      'https://www.mickeyparts.com/pages/media/Are-You-Planning-To-Run-A-Small-Beverage-Business.jpeg',
    id: '13',
  },
  {
    title: 'Snacks',
    image:
      'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/03/snacks-recipes-fb.jpg',
    id: '14',
  },
  {
    title: 'Desserts',
    image: 'https://static.toiimg.com/photo/msid-88592911/88592911.jpg?83886',
    id: '15',
  },
  {
    title: 'Beverages',
    image:
      'https://www.mickeyparts.com/pages/media/Are-You-Planning-To-Run-A-Small-Beverage-Business.jpeg',
    id: '16',
  },
  {
    title: 'Snacks',
    image:
      'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/03/snacks-recipes-fb.jpg',
    id: '17',
  },
  {
    title: 'Desserts',
    image: 'https://static.toiimg.com/photo/msid-88592911/88592911.jpg?83886',
    id: '18',
  },
];

export class SubCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      categoryID: this.props.route.params.categoryID,
      subCategories: [],
    };
  }

  // componentDidMount(){
  //   http.post()
  // }

  render() {
    const {showLoader} = this.state;
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
            paddingHorizontal: 20,
          }}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          {categories.map(item => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  navigation.navigate('Products', {subCategoryId: item.id});
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
                  source={{uri: item.image}}
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
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </LinearGradient>
    );
  }
}
