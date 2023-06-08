import {StyleSheet} from 'react-native';
import React from 'react';
import BackArrowIcon from '../svg/BackArrowIcon';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AnimatedPressable} from '../src/AnimatedPressable';

interface Props {
  onPress: () => void;
}

export default function BackArrowButton({onPress}: Props) {
  const backgroundColor = useSharedValue('transparent');

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });

  const startAnimation = () => {
    backgroundColor.value = withTiming('rgba(128, 128, 128, 0.2)', {
      duration: 300,
    });
  };

  const endAnimation = () => {
    backgroundColor.value = withTiming('transparent)', {
      duration: 300,
    });
  };

  return (
    <AnimatedPressable
      onPressIn={startAnimation}
      onPressOut={endAnimation}
      onPress={onPress}
      style={[styles.Pressable, animatedStyle]}>
      <BackArrowIcon />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  Pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    position: 'absolute',
    left: 5,
    borderRadius: 20,
  },
});
