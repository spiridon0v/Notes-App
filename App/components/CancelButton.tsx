import React from 'react';
import {StretchInY, StretchOutY} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import CancelIcon from '../svg/CancelIcon';
import {AnimatedPressable} from '../src/AnimatedPressable';

interface Props {
  show: boolean;
  onPress: () => void;
}

export default function CancelButton({show, onPress}: Props) {
  return show ? (
    <AnimatedPressable
      entering={StretchInY}
      exiting={StretchOutY}
      style={styles.Pressable}
      onPress={onPress}>
      <CancelIcon />
    </AnimatedPressable>
  ) : null;
}

const styles = StyleSheet.create({
  Pressable: {
    height: 40,
    width: 40,
    position: 'absolute',
    left: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
