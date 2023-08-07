import { Request, Response } from 'express';
import { ValidationError } from 'yup';
import _ from 'lodash';

import { NotesService } from '../services/notes.service.ts';
import Notes from '../repositories/notes.repository.ts';
import { patchNoteValidationSchema } from '../schemas/patchNoteValidationSchema.ts';

import { noteValidationSchema } from '../schemas/noteValidationSchema.ts';
import { Note } from '../models/note.model.ts';

export class NotesController {
  private readonly notesService: NotesService;

  constructor() {
    this.notesService = new NotesService();
  }

  async postNote(req: Request) {
    try {
      await noteValidationSchema.validate(req.body, {
        strict: true,
        abortEarly: false,
      });

      const newNote: Note = {
        name: req.body.name,
        category: req.body.category,
        content: req.body.content,
        created: req.body.created,
        id: _.uniqueId('note'),
        archived: req.body.archived,
        dates: req.body.dates,
      };

      Notes.addNote(newNote);

      return { status: 201, data: newNote };
    } catch (error: ValidationError | any) {
      console.error('Error creating note:', error);
      return { status: 400, data: error };
    }
  }

  deleteNote(req: Request) {
    try {
      const noteId = req.params.id;

      const existingNote = Notes.getNoteById(noteId);
      if (!existingNote) {
        return {
          status: 400,
          data: 'Note does not exist',
        };
      }

      const isSucceed = Notes.deleteNoteById(noteId);

      if (isSucceed) {
        const customResponse: CustomResponse = {
          status: 204,
        };
        return customResponse;
      }

      return {
        status: 500,
        data: 'Server had problem with deleting',
      };
    } catch (error: Error | any) {
      console.error('Error deleting note:', error);

      return {
        status: error.options.errorCode,
        data: error.message,
      };
    }
  }

  async editNote(req: Request) {
    try {
      const noteId = req.params.id;
      const updatedNoteData = req.body;

      const existingNote = Notes.getNoteById(noteId);
      if (!existingNote) {
        return {
          status: 400,
          data: 'Note does not exist',
        };
      }

      const validatedUpdatedNoteData: PatchNote =
        await patchNoteValidationSchema.validate(updatedNoteData, {
          abortEarly: false,
          stripUnknown: true,
        });

      const updatedNote = Notes.updateNoteById(noteId, validatedUpdatedNoteData);

      return {
        status: 200,
        data: updatedNote,
      };
    } catch (error: Error | any) {
      if (error.name === 'ValidationError') {
        return {
          status: 400,
          data: error.message,
        };
      }
      console.error('Error editing note:', error);
      return {
        status: 500,
        data: 'Internal Server Error',
      };
    }
  }

  getNoteById(req: Request) {
    try {
      const noteId = req.params.id;

      const note = Notes.getNoteById(noteId);
      if (!note) {
        return {
          status: 404,
          data: 'Note not found',
        };
      }

      return {
        status: 200,
        data: note,
      };
    } catch (error) {
      console.error('Error retrieving note:', error);

      return {
        status: 500,
        data: 'Internal Server Error',
      };
    }
  }

  getAllNotes() {
    try {
      const allNotes = Notes.getNotes();

      return {
        status: 200,
        data: allNotes,
      };
    } catch (error) {
      console.error('Error editing note:', error);
      return {
        status: 500,
        data: 'Internal Server Error',
      };
    }
  }

  getNotesStatistics() {
    try {
      const stats = this.notesService.calculateNotesStatistics(Notes.getNotes());

      return {
        status: 200,
        data: stats,
      };
    } catch (error) {
      console.error('Error retrieving notes statistics:', error);

      return {
        status: 500,
        data: 'Internal Server Error',
      };
    }
  }
}
