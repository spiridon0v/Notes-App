import {Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {Note} from '../types/note.type';
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  SequencedTransition,
  SlideOutRight,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {colors} from '../src/colors';

interface Props {
  note: Note;
  isDeleting: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

export default function NoteItem({
  note,
  isDeleting,
  onPress,
  onLongPress,
}: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: interpolate(scale.value, [1, 0.9], [1, 0.9])}],
    };
  });

  const onPressIn = () => (scale.value = withTiming(0.9, {duration: 150}));

  const onPressOut = () => (scale.value = withTiming(1, {duration: 150}));

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={SlideOutRight}
      layout={SequencedTransition}
      style={[styles.NoteItem, animatedStyle]}>
      <Pressable
        style={styles.Pressable}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        delayLongPress={300}>
        <Text style={styles.Text}>{note.title}</Text>
        {isDeleting ? (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <BouncyCheckbox
              disabled
              disableBuiltInState
              isChecked={note.state}
              key={note.date}
              disableText={true}
              style={styles.CheckBox}
              size={30}
              fillColor={colors.third}
              unfillColor={colors.background}
            />
          </Animated.View>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  NoteItem: {
    marginBottom: 20,
    backgroundColor: colors.second,
    height: 65,
    width: '90%',
    borderRadius: 13,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
  Pressable: {
    flex: 1,
    padding: 24,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Text: {color: '#fff', fontWeight: '400', fontSize: 17, width: '70%'},
  CheckBox: {margin: 0},
});
