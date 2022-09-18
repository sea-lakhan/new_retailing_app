import {Alert} from 'react-native';
import {errorCodes} from './errorCodes';
import {getToken} from './util';

let http = {
  get: (url, payload, showLoader, token, callback) => {
    showLoader(true);
    console.log(url);
    fetch(url, {
      params: payload,

      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'acess-token': token ? getToken() : '',
        // UID: UID,
      },
    })
      .then(response => {
        showLoader(false);
        return response.json();
      })

      .then(responseData => {
        showLoader(false);
        callback && callback(responseData);
      })
      .catch(error => {
        showLoader(false);
        console.log(JSON.stringify(error));
        Alert.alert(
          'Whoops',
          'Something went wrong! Please check internet connectivity',
        );
      });
  },
  post: (url, payload, showLoader, token, callback) => {
    showLoader(true);
    console.log(url, token);
    fetch(url, {
      method: 'POST',

      body: JSON.stringify(payload),

      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'acess-token': token ? getToken() : '',
        // UID: UID,
      },
    })
      .then(response => {
        console.log('after response');
        return response.json();
      })

      .then(responseData => {
        showLoader(false);
        console.log('After Decode');
        console.log('Response: ' + JSON.stringify(responseData));
        if (!errorCodes.includes(responseData.status))
          callback && callback(responseData);
        else Alert.alert('Error', responseData.message);
      })

      .catch(error => {
        showLoader(false);
        console.log(JSON.stringify(error));
        Alert.alert(
          'Whoops',
          'Something went wrong! Please check internet connectivity',
        );
      });
  },
  put: (url, payload, showLoader, token, callback) => {
    showLoader(true);

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'acess-token': token ? getToken() : '',
      },
    })
      .then(response => {
        console.log('step2 done');
        console.log('Before JSON: ' + JSON.stringify(response));
        return response.json();
      })

      .then(responseData => {
        console.log('step3 done');
        showLoader(false);
        console.log('Response: ' + JSON.stringify(responseData));
        callback && callback(responseData);
      })

      .catch(error => {
        showLoader(false);
        console.log(JSON.stringify(error));
        Alert.alert(
          'Whoops',
          'Something went wrong! Please check internet connectivity',
        );
      });
  },
  delete: (url, payload, showLoader, token, callback) => {
    showLoader(true);

    fetch(url, {
      method: 'DELETE',

      body: JSON.stringify(payload),

      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'acess-token': token ? getToken() : '',
        // UID: UID,
      },
    })
      .then(response => {
        console.log('step2 done');
        console.log('Before JSON: ' + JSON.stringify(response));
        return response.json();
      })
      .then(responseData => {
        showLoader(false);
        callback && callback(responseData);
      })

      .catch(error => {
        showLoader(false);
        console.log(JSON.stringify(error));
        Alert.alert(
          'Whoops',
          'Something went wrong! Please check internet connectivity',
        );
      });
  },
};

export default http;
