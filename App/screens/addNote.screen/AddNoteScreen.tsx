/* eslint-disable react/no-unstable-nested-components */
import {View, Text, TextInput, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Props} from '../../types/props.type';
import {styles} from './styles';
import BackArrowButton from '../../components/BackArrowButton';
import SaveButton from '../../components/SaveButton';
import {storage} from '../../src/storage';
import {vibration} from '../../src/vibration';
import {Note} from '../../types/note.type';

export default function AddNoteScreen({route, navigation}: Props<'AddNote'>) {
  let {note, notes, isNew} = route.params;

  const [title, setTitle] = useState<string>(note?.title || '');
  const [text, setText] = useState<string>(note?.text || '');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackArrowButton onPress={() => navigation.goBack()} />,
      headerRight: () => <SaveButton onPress={saveNote} />,
    });
  });

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
        onChangeText={t => setTitle(t)}
        style={styles.TitleInput}
        placeholder="Заголовок"
        onFocus={onFocus}
      />
      {error && (
        <View style={styles.ErrorView}>
          <Text style={styles.Error}>Введите заголовок</Text>
        </View>
      )}
      <ScrollView style={styles.ScrollView}>
        <TextInput
          value={text}
          onChangeText={t => setText(t)}
          style={styles.TextInput}
          placeholder="Текст"
          multiline
          numberOfLines={100}
          textAlignVertical="top"
          onFocus={onFocus}
        />
      </ScrollView>
    </>
  );
}
