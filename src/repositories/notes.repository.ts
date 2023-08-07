// import { Note } from '../models/note.model.ts';
import _ from 'lodash';

class NotesRepository {
  private readonly notes: Note[] = [
    {
      name: 'Shopping',
      category: 'Task',
      content: 'Buy a milk',
      created: new Date('2022-05-03').toISOString(),
      id: _.uniqueId('note'),
      archived: false,
      dates: '',
    },
    {
      name: 'Shower',
      category: 'Task',
      content: 'Take a shower',
      created: new Date('2023-05-07').toISOString(),
      id: _.uniqueId('note'),
      archived: false,
      dates: '',
    },
    {
      name: 'Appointment',
      category: 'Random Thought',
      content: 'Some another content on content 3',
      created: new Date('2021-05-16').toISOString(),
      id: _.uniqueId('note'),
      archived: true,
      dates: '',
    },
    {
      name: 'Appointment',
      category: 'Task',
      content: 'I have to go to the dentist on 2024-05-03',
      created: new Date('2021-05-25').toISOString(),
      id: _.uniqueId('note'),
      archived: false,
      dates: '2024-05-03',
    },
    {
      name: 'Appointment',
      category: 'Random Thought',
      content: 'Some another content on content 4',
      created: new Date('2021-05-25').toISOString(),
      id: _.uniqueId('note'),
      archived: false,
      dates: '',
    },
    {
      name: 'New type of car',
      category: 'Idea',
      content: 'Create car with coal engine',
      created: new Date('2021-05-25').toISOString(),
      id: _.uniqueId('note'),
      archived: true,
      dates: '',
    },
    {
      name: 'Another life',
      category: 'Random Thought',
      content: 'Is there anything beyond the Earth?',
      created: new Date('2023-05-25').toISOString(),
      id: _.uniqueId('note'),
      archived: true,
      dates: '',
    },
  ];

  addNote = (note: Note) => {
    this.notes.push(note);
  };
  getNoteById = (noteId: string) => {
    return this.notes.find((note) => note.id === noteId);
  };

  deleteNoteById = (noteId: string) => {
    const indexToDelete = this.notes.findIndex((note) => note.id === noteId);
    if (indexToDelete !== -1) {
      this.notes.splice(indexToDelete, 1);
      return true;
    }
    return false;
  };

  getNotes = () => {
    return this.notes;
  };

  updateNoteById = (noteId: string, patchNote: PatchNote) => {
    const noteIndex = this.notes.findIndex((note) => note.id === noteId);

    if (noteIndex !== -1) {
      const updatedNote = { ...this.notes[noteIndex], ...patchNote };
      this.notes[noteIndex] = updatedNote;
    }

    return this.notes[noteIndex];
  };
}

const Notes = new NotesRepository();

export default Notes;
