import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import BackArrowIcon from '../svg/BackArrowIcon';
import {colors} from '../src/colors';

interface Props {
  onPress: () => void;
}

export default function BackArrowButton({onPress}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.Touchable}>
      <BackArrowIcon />
      <Text style={styles.Text}>Назад</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Touchable: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 30,
    width: 40,
  },
  Text: {
    color: colors.gray,
  },
});
