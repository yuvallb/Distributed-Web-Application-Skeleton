export default class NoteEvent {
    constructor(obj) {
        this.eventType = obj?.eventType;
        this.before = obj?.before;
        this.after =obj?.after;
    }
}