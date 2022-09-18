import {Alert, FlatList, Image, SectionList, Text, View} from 'react-native';
import React, {Component} from 'react';

import {styles} from './styles';
import PagerView from 'react-native-pager-view';
import colors from '../../utility/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import urls from '../../utility/urls';
import {HeaderBar} from '../../components/HeaderBar';
import LinearGradient from 'react-native-linear-gradient';
import {
  getPendingStatus,
  getUser,
  NavigationRoutes,
  windowHeight,
  windowWidth,
} from '../../utility/util';
import http from '../../utility/http';
import ActivityLoader from '../../components/ActivityLoader';

export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      orders: null,
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    navigation.setOptions({
      header: () => (
        <HeaderBar
          navigation={navigation}
          title="My Orders"
          onBackPress={() => navigation.goBack()}
        />
      ),
    });
    this.getOrders();
  }

  getOrders = async () => {
    const user = await getUser();
    http.get(
      `${urls.createOrder}/${user.userID}`,
      {},
      showLoader => this.setState({showLoader}),
      true,
      async response => {
        if (response.message == 'Not Orders Found!')
          this.setState({orders: []});
        else if (response.message == 'Order successfull found!')
          this.setState({orders: [...response.result]});
        else this.setState({orders: null});
      },
    );
  };

  getCancelStatusID = async () => {
    const status = await getPendingStatus();
    return await status.find(status => status.title == 'Cancel')._id;
  };

  onPressCancel = async order => {
    const payload = {
      ...order,
      deliveryStatus: await this.getCancelStatusID(),
    };
    console.log(order, 'from on press cancel method');
    http.put(
      `${urls.createOrder}/${order._id}`,
      payload,
      showLoader => this.setState({showLoader}),
      true,
      async response => {
        console.log(response, 'from on Press cancel method');
        if (response.message == 'Order successfull Placed!') this.getOrders();
        else
          Alert.alert(
            'Order Alert',
            'Please check with admin something went wrong',
          );
      },
    );
  };

  onPressDelete = async orderID => {
    http.delete(
      `${urls.createOrder}/${orderID}`,
      {},
      showLoader => this.setState({showLoader}),
      true,
      async response => {
        if (response.message == 'Order deleted successfully!') this.getOrders();
        else
          Alert.alert(
            'Order Alert',
            'Please check with admin something went wrong',
          );
      },
    );
  };

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          width: (windowWidth * 90) / 100,
          flexDirection: 'row',
          alignItems: 'center',
          margin: 5,
          padding: 5,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.white,
        }}>
        <View style={{marginLeft: 20, alignSelf: 'flex-start'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '800',
                color: colors.white,
              }}>
              {`Order no.:${index + 1}`}
            </Text>
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 5,
                backgroundColor: colors.red,
              }}
              onPress={() => this.onPressCancel(item)}>
              <Text
                style={{fontSize: 15, fontWeight: '500', color: colors.white}}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 15, fontWeight: '500', color: colors.white}}>
            {`Total No. of Products: `}
            {item.products.length}
          </Text>
          <Text style={{fontSize: 15, fontWeight: '500', color: colors.white}}>
            {`Total quantity: `}
            {item.quantity}
          </Text>
          <Text style={{fontSize: 15, fontWeight: '500', color: colors.white}}>
            {`Order amount: `}&#8377;{item.amount}
          </Text>
          <Text style={{fontSize: 15, fontWeight: '500', color: colors.white}}>
            {`Payment Method: `}
            {item.paymentMethod == 'COD' ? 'Cash On Delivery' : 'COD'}
          </Text>
          <Text style={{fontSize: 15, fontWeight: '500', color: colors.white}}>
            {`Payment Status: `}
            {item.paymentStatus ? 'Done' : 'Pending'}
          </Text>
          <Text style={{fontSize: 15, fontWeight: '500', color: colors.white}}>
            {`Delivery Address: `}
            {item.deliveryAddress}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              color: colors.white,
            }}>
            {`Delivery Status: `}
            <Text
              style={{
                fontSize: 15,
                fontWeight: '500',
                color:
                  item?.deliveryStatus?.title == 'Pending'
                    ? colors.pendingStatusColor
                    : item?.deliveryStatus?.title == 'InProgress'
                    ? colors.inprogressStatusColor
                    : item?.deliveryStatus?.title == 'Delivered'
                    ? colors.deliveredStatusColor
                    : colors.cancelStatusColor,
              }}>
              {item.deliveryStatus.title}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {showLoader, orders} = this.state;
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
            width: '100%',
            height: '100%',
            backgroundColor: colors.white,
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            paddingTop: 20,
          }}>
          <LinearGradient
            colors={[colors.secondary, colors.prime]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={{
              flex: 1,
              width: windowWidth,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 40,
            }}>
            {showLoader && <ActivityLoader showLoader={showLoader} />}
            {orders?.length <= 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: colors.white,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate(NavigationRoutes.Categories)
                  }>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: colors.white,
                    }}>
                    Please make your first order
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <FlatList
                data={orders}
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
            )}
          </LinearGradient>
        </View>
      </LinearGradient>
    );
  }
}
