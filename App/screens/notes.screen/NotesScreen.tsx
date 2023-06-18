/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {Text, ScrollView, BackHandler} from 'react-native';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {Note, Notes} from '../../types/note.type';
import {Props} from '../../types/props.type';
import {storage} from '../../src/storage';
import {vibration} from '../../src/vibration';
import {colors} from '../../src/colors';
import PlusButton from '../../components/PlusButton';
import NoteItem from '../../components/NoteItem';
import DeleteButton from '../../components/DeleteButton';
import CancelButton from '../../components/CancelButton';
import {styles} from './styles';

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

  const cancelDeleting = (isBackPress: boolean) => {
    !isBackPress && vibration();
    setIsDeleting(false);
    setDeleteList([]);
    setNotes(notes.map(note => ({...note, state: false})));
  };

  const deleteNotes = () => {
    vibration();
    setIsDeleting(false);
    setDeleteList([]);
    setNotes(notes.filter(note => !deleteList.includes(note.date)));
  };

  const onDeleteButtonPress = () => deleteNotes();
  const onCancelButtonPress = () => cancelDeleting(false);

  const onNoteItemPress = (note: Note) => {
    if (isDeleting) {
      onNoteItemCheck(note);
    } else {
      navigation.navigate('AddNote', {isNew: false, note: note, notes: notes});
    }
  };

  const onNoteItemLongPress = (note: Note) => {
    if (!isDeleting) {
      vibration();
      setIsDeleting(true);
      note.state = true;
      setDeleteList([...deleteList, note.date]);
    }
  };

  const onNoteItemCheck = (note: Note) => {
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
        cancelDeleting(true);
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
        <CancelButton show={isDeleting} onPress={onCancelButtonPress} />
      ),
      headerRight: () => (
        <DeleteButton show={isDeleting} onPress={onDeleteButtonPress} />
      ),
    }),
  );

  return (
    <>
      {notes.length === 0 && <Text style={{color: colors.fourth}}>Пусто</Text>}
      <ScrollView
        style={styles.ScrollView}
        contentContainerStyle={styles.ContentContainer}
        showsVerticalScrollIndicator={false}>
        {notes.map(note => (
          <NoteItem
            key={note.date}
            note={note}
            isDeleting={isDeleting}
            onPress={() => onNoteItemPress(note)}
            onLongPress={() => onNoteItemLongPress(note)}
          />
        ))}
      </ScrollView>
      <PlusButton show={!isDeleting} onPress={navigateToAddNote} />
    </>
  );
}
