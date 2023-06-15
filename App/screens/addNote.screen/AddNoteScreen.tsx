/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useRef, useState} from 'react';
import {TextInput, ScrollView, Keyboard, ToastAndroid} from 'react-native';
import {Props} from '../../types/props.type';
import {Note} from '../../types/note.type';
import BackArrowButton from '../../components/BackArrowButton';
import SaveButton from '../../components/SaveButton';
import {storage} from '../../src/storage';
import {vibration} from '../../src/vibration';
import {styles} from './styles';

export default function AddNoteScreen({route, navigation}: Props<'AddNote'>) {
  let {note, notes, isNew} = route.params;

  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [screenIsFocused, setScreenIsFocused] = useState<boolean>(false);
  const [numberOfLines, setNumberOfLines] = useState<number>(1);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackArrowButton onPress={() => navigation.goBack()} />,
      headerRight: () => <SaveButton onPress={saveNote} />,
    });
    if (!screenIsFocused && note) {
      setTitle(note.title);
      setText(note.text);
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
      ToastAndroid.showWithGravity(
        'Введите заголовок!',
        900,
        ToastAndroid.BOTTOM,
      );
    }
  };

  return (
    <>
      <TextInput
        autoFocus={isNew}
        value={title}
        onChangeText={setTitle}
        style={styles.TitleInput}
        placeholder="Заголовок"
        maxLength={28}
      />
      <ScrollView style={styles.ScrollView}>
        <TextInput
          ref={textInputRef}
          value={text}
          onChangeText={setText}
          style={styles.TextInput}
          placeholder="Текст"
          multiline
          numberOfLines={numberOfLines}
          textAlignVertical="top"
        />
      </ScrollView>
    </>
  );
}
