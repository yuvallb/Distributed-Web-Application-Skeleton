import { v4 as uuidv4 } from 'uuid';

export default class NoteService {
    constructor(noteData) {
        this.data = noteData;
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
        return await this.data.add(note);
    }
    async update(id, note) {
        this.requiredField(note, "id");
        this.requiredField(note, "title");
        if (!id || id != note.id) {
            const error = new Error("id missing or not match");
            error.name = "BadRequest";
            throw error;
        }
        return await this.data.update(note);
    }
    async delete(id) {
        return await this.data.delete(id);
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