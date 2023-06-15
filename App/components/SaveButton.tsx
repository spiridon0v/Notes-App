import {StyleSheet} from 'react-native';
import React from 'react';
import SaveIcon from '../svg/SaveIcon';
import {AnimatedPressable} from '../src/AnimatedPressable';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  onPress: () => void;
}

export default function SaveButton({onPress}: Props) {
  const backgroundColor = useSharedValue('transparent');

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });

  const startAnimation = () => {
    backgroundColor.value = withTiming('rgba(128, 128, 128, 0.2)', {
      duration: 200,
    });
  };

  const endAnimation = () => {
    backgroundColor.value = withTiming('transparent)', {
      duration: 200,
    });
  };

  return (
    <AnimatedPressable
      onPressIn={startAnimation}
      onPressOut={endAnimation}
      onPress={onPress}
      style={[styles.Pressable, animatedStyle]}>
      <SaveIcon />
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
    right: 0,
    borderRadius: 20,
  },
});
