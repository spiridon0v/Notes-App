import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../src/colors';

interface Props {
  onPress: () => void;
}

export default function SaveButton({onPress}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.Touchable}>
      <Text style={styles.Text}>Сохранить</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 70,
  },
  Text: {
    color: colors.gray,
  },
});
