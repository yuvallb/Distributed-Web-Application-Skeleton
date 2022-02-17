export default class InMemoryNotes {
    constructor() {
        this.notes = {};
    }
    add(note) {
        this.notes[note.id] = note;
        return note;
    }
    update(note) {
        this.notes[note.id] = note;
        return note;
    }
    delete(id) {
        let note = this.notes[id];
        delete this.notes[id];
        return note;
    }
    getById(id) {
        return this.notes[id];
    }
    getAll() {
        return Object.keys(this.notes)
            .map(k => this.notes[k]);
    }
    search(text) {
        return Object.keys(this.notes)
            .filter(k => this.matchNote(this.notes[k], text))
            .map(k => this.notes[k]);
    }


    // private 
    matchNote(note, text) {
        return this.matchField(note.title, text) || this.matchField(note.content, text);
    }
    matchField(field, text) {
        return field?.toLowerCase().indexOf(text?.toLowerCase()) > -1;
    }
}