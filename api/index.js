import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import NoteService from './service/note.js';
import InMemoryNotes from './data-access/note/in-memory.js';
import MongoNotes from './data-access/note/mongo.js';
import RedisNotes from './data-access/note/redis.js';
import CachedNotes from './data-access/note/cached.js';

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

app.get('/', (req, res) => {
    res.send('API is up!');
});

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

app.post('/notes/search', jsonParser, async (req, res, next) => {
    try {
        const notes = await noteService.search(req.body);
        res.send(notes);
    } catch (error) {
        return next(error)
    }
    if (!notes) {
        notes = [];
    }
});

app.post('/notes/', jsonParser, async (req, res, next) => {
    try {
        const note = await noteService.add(req.body);
        res.send(note);
    } catch (error) {
        return next(error)
    }
});

app.put('/notes/:noteId', jsonParser, async (req, res, next) => {
    try {
        const note = await noteService.update(req.params.noteId, req.body);
        res.send(note);
    } catch (error) {
        return next(error)
    }
});

app.delete('/notes/:noteId', async (req, res, next) => {
    try {
        const note = await noteService.delete(req.params.noteId);
        res.send(note);
    } catch (error) {
        return next(error)
    }
});

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

