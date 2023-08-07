import express from 'express';
import bodyParser from 'body-parser';
import notesRoute from './routes/notes.route.ts';

const app = express();

app.use(bodyParser.json());

app.use('/api', notesRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
