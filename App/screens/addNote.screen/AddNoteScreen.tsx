/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {View, Text, TextInput, ScrollView, Keyboard} from 'react-native';
import {Props} from '../../types/props.type';
import {Note} from '../../types/note.type';
import BackArrowButton from '../../components/BackArrowButton';
import SaveButton from '../../components/SaveButton';
import {storage} from '../../src/storage';
import {vibration} from '../../src/vibration';
import {styles} from './styles';

export default function AddNoteScreen({route, navigation}: Props<'AddNote'>) {
  let {note, notes, isNew} = route.params;

  const [title, onChangeTitle] = useState<string>('');
  const [text, onChangeText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [screenIsFocused, setScreenIsFocused] = useState<boolean>(false);
  const [numberOfLines, setNumberOfLines] = useState<number>(1);
  const textInputRef = useRef<TextInput>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackArrowButton onPress={() => navigation.goBack()} />,
      headerRight: () => <SaveButton onPress={saveNote} />,
    });
    if (!screenIsFocused && note) {
      onChangeTitle(note.title);
      onChangeText(note.text);
      setScreenIsFocused(true);
    }
    setNumberOfLines(text.split('\n').length + 25);
  }, [title, text]);

  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      textInputRef.current?.blur();
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

  const saveNote = () => {
    vibration();
    if (title !== '') {
      const newNote: Note = {
        title: title,
        text: text,
        date: Date.now(),
        state: false,
      };
      if (!isNew) {
        notes = notes.filter(item => item.date !== note?.date);
      }

      storage.setArray('notes', [newNote, ...notes]);
      navigation.goBack();
    } else {
      setError(true);
    }
  };

  const onFocus = () => {
    setError(false);
  };

  return (
    <>
      <TextInput
        autoFocus={isNew}
        value={title}
        onChangeText={onChangeTitle}
        style={styles.TitleInput}
        placeholder="Заголовок"
        onFocus={onFocus}
      />
      {error && (
        <View style={styles.ErrorView}>
          <Text style={styles.Error}>Введите заголовок</Text>
        </View>
      )}
      <ScrollView style={styles.ScrollView} indicatorStyle="black">
        <TextInput
          ref={textInputRef}
          value={text}
          onChangeText={onChangeText}
          style={styles.TextInput}
          placeholder="Текст"
          multiline
          numberOfLines={numberOfLines}
          textAlignVertical="top"
          onFocus={onFocus}
        />
      </ScrollView>
    </>
  );
}
