import {Note, Notes} from './note.type';

export type Screens = {
  Notes: undefined;
  AddNote: {
    note: Note | null;
    notes: Notes;
    isNew: boolean;
  };
};
