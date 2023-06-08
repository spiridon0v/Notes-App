import React from 'react';
import {StretchInY, StretchOutY} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import TrashIcon from '../svg/TrashIcon';
import {AnimatedPressable} from '../src/AnimatedPressable';

interface Props {
  show: boolean;
  onPress: () => void;
}

export default function DeleteButton({show, onPress}: Props) {
  return show ? (
    <AnimatedPressable
      entering={StretchInY}
      exiting={StretchOutY}
      style={styles.Pressable}
      onPress={onPress}>
      <TrashIcon />
    </AnimatedPressable>
  ) : null;
}

const styles = StyleSheet.create({
  Pressable: {
    height: 40,
    width: 40,
    position: 'absolute',
    right: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
