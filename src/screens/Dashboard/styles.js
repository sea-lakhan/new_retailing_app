import {StyleSheet} from 'react-native';
import colors from '../../utility/colors';
import {windowHeight, windowWidth} from '../../utility/util';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});
