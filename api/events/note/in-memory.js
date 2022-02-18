export default class InMemoryNoteEvents {
    constructor() {
        this.noteEvents = [];
    }
    async publish(noteEvent) {
        this.noteEvents.push(noteEvent);
    }
}