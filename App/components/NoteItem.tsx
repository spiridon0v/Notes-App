import {Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {Note} from '../types/note.type';
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutUp,
  SequencedTransition,
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
      exiting={FadeOutUp}
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
              size={35}
              fillColor={colors.third}
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
    height: 80,
    width: '90%',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 3,
  },
  Pressable: {
    flex: 1,
    padding: 24,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Text: {color: '#fff', fontWeight: 'bold', fontSize: 16, width: '70%'},
  CheckBox: {margin: 0},
});
