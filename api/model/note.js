export default class Note {
    constructor(obj) {
        this.id = obj?.id;
        this.title = obj?.title;
        this.content = obj?.content;
        this.deadline = obj?.deadline;
    }
}