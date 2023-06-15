import {StyleSheet} from 'react-native';
import {colors} from '../../src/colors';

export const styles = StyleSheet.create({
  TitleInput: {
    width: '100%',
    height: '7%',
    color: 'white',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 25,
    borderBottomWidth: 0.2,
    borderColor: colors.gray,
  },
  TextInput: {
    width: '100%',
    color: 'white',
    padding: 10,
    fontSize: 20,
    lineHeight: 32,
    includeFontPadding: false,
  },
  ScrollView: {
    width: '100%',
    height: '100%',
  },
  Error: {
    color: 'red',
    position: 'absolute',
    paddingLeft: 10,
  },
  ErrorView: {
    height: 20,
    width: '100%',
  },
  BoldText: {
    fontWeight: 'bold',
  },
});
