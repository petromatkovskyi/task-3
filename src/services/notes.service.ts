import { Note } from '../models/note.model.ts';

export class NotesService {
  constructor() {}
  calculateNotesStatistics = (notes: Note[]) => {
    const stats: Stats = {};
    for (let i = 0; i < notes.length; i++) {
      const currNote = notes[i];
      if (!stats[currNote.category]) {
        stats[currNote.category] = { archived: 0, active: 0 };
      }
      currNote.archived
        ? (stats[currNote.category].archived += 1)
        : (stats[currNote.category].active += 1);
    }
    console.log(stats);

    return stats;
  };
}
