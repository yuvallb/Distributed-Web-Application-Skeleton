import { v4 as uuidv4 } from 'uuid';
import NoteEvent from '../model/note-event.js';

export default class NoteService {
    constructor(noteData, noteEvents) {
        this.data = noteData;
        this.events = noteEvents;
    }

    async getAll() {
        return await this.data.getAll();
    }
    
    async get(id) {
        return await this.data.getById(id);
    }

    async search(query) {
        this.requiredField(query, "text");
        return await this.data.search(query.text);
    }

    async add(note) {
        note.id = uuidv4();
        this.requiredField(note, "title");
        const result = await this.data.add(note);
        await this.events.publish(new NoteEvent({eventType:'add', after: result}))
        return result;
    }

    async update(id, note) {
        this.requiredField(note, "id");
        this.requiredField(note, "title");
        if (!id || id != note.id) {
            const error = new Error("id missing or not match");
            error.name = "BadRequest";
            throw error;
        }
        const before = await this.data.getById(note.id);
        const after = await this.data.update(note);
        await this.events.publish(new NoteEvent({eventType:'update', before: before, after: after}))
        return after;
    }
    async delete(id) {
        const before = await this.data.getById(id);
        const result = await this.data.delete(id);
        await this.events.publish(new NoteEvent({eventType:'delete', before: before}))
        return result;
    }

    // private
    requiredField(obj, fieldName) {
        let missing = false;
        try {
            missing = !obj[fieldName];
        } catch (e) {
            missing = true;
        }
        if (missing) {
            const error = new Error("Missing " + fieldName);
            error.name = "BadRequest";
            throw error;
        }
    }
    
}