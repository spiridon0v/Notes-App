import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../src/colors';
import PlusIcon from '../svg/PlusIcon';
import Animated, {
  SlideInDown,
  SlideOutDown,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  onPress: () => void;
  size?: number;
  show?: boolean;
}

export default function PlusButton({onPress, size = 59, show = true}: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: interpolate(scale.value, [1, 0.9], [1, 0.9])}],
    };
  });

  const onPressIn = () => (scale.value = withTiming(0.8, {duration: 100}));

  const onPressOut = () => (scale.value = withTiming(1, {duration: 150}));

  return show ? (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={[
        styles.View,
        animatedStyle,
        {width: size, height: size, borderRadius: size / 2},
      ]}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.Pressable, {borderRadius: size / 2}]}>
        <PlusIcon />
      </Pressable>
    </Animated.View>
  ) : null;
}

const styles = StyleSheet.create({
  View: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 100,
  },
  Pressable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.third,

    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
});
