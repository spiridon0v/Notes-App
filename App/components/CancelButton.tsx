import React from 'react';
import Animated, {StretchInY, StretchOutY} from 'react-native-reanimated';
import {Pressable, StyleSheet} from 'react-native';
import CancelIcon from '../svg/CancelIcon';

interface Props {
  show: boolean;
  onPress: () => void;
}

export default function CancelButton({show, onPress}: Props) {
  return show ? (
    <Animated.View
      entering={StretchInY}
      exiting={StretchOutY}
      style={styles.View}>
      <Pressable style={styles.Pressable} onPress={onPress}>
        <CancelIcon />
      </Pressable>
    </Animated.View>
  ) : null;
}

const styles = StyleSheet.create({
  View: {
    height: 40,
    width: 40,
    position: 'absolute',
    left: 5,
  },
  Pressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
