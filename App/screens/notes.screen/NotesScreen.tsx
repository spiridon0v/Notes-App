/* eslint-disable react/no-unstable-nested-components */
import {Text, ScrollView, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {Note, Notes} from '../../types/note.type';
import {storage} from '../../src/storage';
import {vibration} from '../../src/vibration';
import {Props} from '../../types/props.type';
import {colors} from '../../src/colors';
import PlusButton from '../../components/PlusButton';
import NoteItem from '../../components/NoteItem';
import {styles} from './styles';
import DeleteButton from '../../components/DeleteButton';
import CancelButton from '../../components/CancelButton';

export default function NotesScreen({navigation}: Props<'Notes'>) {
  const [notes, setNotes] = useMMKVStorage<Notes>('notes', storage, []);
  const [deleteList, setDeleteList] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const navigateToAddNote = () => {
    navigation.navigate('AddNote', {
      notes: notes,
      isNew: true,
      note: null,
    });
  };

  const cancelDeleting = () => {
    vibration();
    setIsDeleting(false);
    setDeleteList([]);
    const newNotes = notes.map(note => ({...note, state: false}));
    setNotes(newNotes);
  };

  const deleteNotes = () => {
    vibration();
    setIsDeleting(false);
    setNotes(notes.filter(note => !deleteList.includes(note.date)));
    setDeleteList([]);
  };

  const onPress = (note: Note) => {
    if (isDeleting) {
      onCheck(note);
    } else {
      navigation.navigate('AddNote', {isNew: false, note: note, notes: notes});
    }
  };

  const onLongPress = (note: Note) => {
    if (!isDeleting) {
      vibration();
      setIsDeleting(true);
      note.state = true;
      setDeleteList([...deleteList, note.date]);
    }
  };

  const onCheck = (note: Note) => {
    vibration();
    if (note.state) {
      setDeleteList(deleteList.filter(date => date !== note.date));
    } else {
      setDeleteList([...deleteList, note.date]);
    }
    note.state = !note.state;
  };

  useEffect(() => {
    const backAction = () => {
      if (isDeleting) {
        cancelDeleting();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  });

  useEffect(() =>
    navigation.setOptions({
      headerLeft: () => (
        <CancelButton show={isDeleting} onPress={cancelDeleting} />
      ),
      headerRight: () => (
        <DeleteButton show={isDeleting} onPress={deleteNotes} />
      ),
    }),
  );

  return (
    <>
      {notes.length === 0 && <Text style={{color: colors.gray}}>Пусто</Text>}
      <ScrollView
        style={styles.ScrollView}
        contentContainerStyle={styles.ContentContainer}>
        {notes.map(note => (
          <NoteItem
            key={note.date}
            note={note}
            isDeleting={isDeleting}
            onPress={() => onPress(note)}
            onLongPress={() => onLongPress(note)}
          />
        ))}
      </ScrollView>
      <PlusButton show={!isDeleting} onPress={navigateToAddNote} />
    </>
  );
}
