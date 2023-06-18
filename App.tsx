import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from './App/types/screens.type';
import NotesScreen from './App/screens/notes.screen/NotesScreen';
import AddNoteScreen from './App/screens/addNote.screen/AddNoteScreen';
import {StatusBar, StyleSheet} from 'react-native';
import {colors} from './App/src/colors';

const RootStack = createNativeStackNavigator<Screens>();

function App() {
  return (
    <>
      <StatusBar backgroundColor={colors.background} />
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Notes"
          screenOptions={{
            contentStyle: styles.Screens,
            animation: 'slide_from_right',
            headerStyle: {backgroundColor: colors.background},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {fontWeight: '100', fontSize: 17},
            headerBackVisible: false,
          }}>
          <RootStack.Screen
            name="Notes"
            options={{title: 'Заметки'}}
            component={NotesScreen}
          />
          <RootStack.Screen
            name="AddNote"
            options={{title: ''}}
            component={AddNoteScreen}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  Screens: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
});
