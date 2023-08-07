import express, { Request, Response } from 'express';
import _ from 'lodash';

import { validationHelper } from '../helpers/validation.helper.ts';
import { NotesService } from '../services/notes.service.ts';
import { NotesController } from '../controllers/notes.controller.ts';

const router = express.Router();

const notes = new NotesService();
const notesController = new NotesController();

router.get('/notes/stats', (req: Request, res: Response) => {
  console.log(req);

  const response: CustomResponse = notesController.getNotesStatistics();

  res.status(response.status).json(response.data);
});

router.post('/notes', validationHelper, async (req: Request, res: Response) => {
  const response: { status: number; data: any } = await notesController.postNote(req);

  res.status(response.status).json(response.data);
});

router.delete('/notes/:id', async (req: Request, res: Response) => {
  const response: CustomResponse = notesController.deleteNote(req);

  res.status(response.status).json(response.data);
});

router.patch('/notes/:id', validationHelper, async (req: Request, res: Response) => {
  const response: CustomResponse = await notesController.editNote(req);

  res.status(response.status).json(response.data);
});

router.get('/notes/:id', async (req: Request, res: Response) => {
  const response: CustomResponse = notesController.getNoteById(req);

  res.status(response.status).json(response.data);
});

router.get('/notes', async (_, res: Response) => {
  const response: CustomResponse = notesController.getAllNotes();

  res.status(response.status).json(response.data);
});

export default router;
