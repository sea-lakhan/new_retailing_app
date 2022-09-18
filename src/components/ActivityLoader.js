import React from 'react';

import {Modal, ActivityIndicator, Text, View, StyleSheet} from 'react-native';
import Lottie from 'lottie-react-native';

const ActivityLoader = props => (
  <Modal
    transparent={true}
    visible={props.showLoader}
    onRequestClose={() => console.log('Modal has been closed.')}>
    <View style={styles.container}>
      {/* <View style={styles.middleView}>
        <ActivityIndicator size="large" color="#6dbe0e" />
        <Text style={styles.txtLoading}>Loading...</Text>
      </View> */}
      <Lottie
        source={require('./loader.json')}
        style={{width: 100, height: 100, borderRadius: 10}}
        autoPlay
        loop
      />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000040',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  middleView: {
    height: 120,
    width: 200,
    borderRadius: 10,
    backgroundColor: '#00000050',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  txtLoading: {
    fontSize: 18,
    color: '#fff',
  },
});

export default ActivityLoader;
