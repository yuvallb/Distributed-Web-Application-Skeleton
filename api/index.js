import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import NoteService from './service/note.js';
import InMemoryNotes from './data-access/note/in-memory.js';
import MongoNotes from './data-access/note/mongo.js';
import RedisNotes from './data-access/note/redis.js';
import CachedNotes from './data-access/note/cached.js';
import Note from './model/note.js';
import NoteSearchQuery from './model/note-search-query.js';

// create dependencies from configuration
let notesData;
if (process.env.MONGO_URI && process.env.REDIS_URI) {
    notesData = new CachedNotes(new MongoNotes(process.env.MONGO_URI) , new RedisNotes(process.env.REDIS_URI));
} else if (process.env.MONGO_URI) {
    notesData = new MongoNotes(process.env.MONGO_URI);
} else {
    notesData = new InMemoryNotes();
}
// inject dependencies into services
const noteService = new NoteService(notesData);

const app = express();
const port = process.env.PORT;
const jsonParser = bodyParser.json()

app.use(cors({origin: process.env.CORS_ALLOWED_ORIGIN}));

app.get('/', (req, res) => {
    res.send('API is up!');
});

// get all notes
app.get('/notes', async (req, res, next) => {
    try {
        const notes = await noteService.getAll();
        if (!notes || notes.length == 0) {
            res.sendStatus(404);
        } else {
            res.send(notes);
        }
    } catch (error) {
        return next(error)
    }
});

// search notes
app.get('/notes/search', async (req, res, next) => {
    try {
        const notes = await noteService.search(new NoteSearchQuery(req.query));
        if (!notes) {
            notes = [];
        }
        res.send(notes);
    } catch (error) {
        return next(error)
    }
});

// get one note by id. Notice that this should come AFTER the search endpoint, since it will match /notes/search
app.get('/notes/:noteId', async (req, res, next) => {
    try {
        const note = await noteService.get(req.params.noteId);
        if (!note) {
            res.sendStatus(404);
        } else {
            res.send(note);
        }
    } catch (error) {
        return next(error)
    }
});

// add a note
app.post('/notes/', jsonParser, async (req, res, next) => {
    try {
        const note = await noteService.add(new Note(req.body));
        res.send(note);
    } catch (error) {
        return next(error)
    }
});

// update a note
app.put('/notes/:noteId', jsonParser, async (req, res, next) => {
    try {
        const note = await noteService.update(req.params.noteId, new Note(req.body));
        res.send(note);
    } catch (error) {
        return next(error)
    }
});

// delte a note
app.delete('/notes/:noteId', async (req, res, next) => {
    try {
        const note = await noteService.delete(req.params.noteId);
        res.send(note);
    } catch (error) {
        return next(error)
    }
});

// error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    if (err.name == "BadRequest") {
        res.sendStatus(400);
    } else {
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`Api listening on port ${port}`)
});

