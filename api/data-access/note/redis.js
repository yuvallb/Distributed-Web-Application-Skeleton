import { createClient } from 'redis';


export default class RedisNotes {

    constructor(url) {
        this.client = createClient({url:url});
        this.connected = false;
    }

    async add(note) {
        await this.connect();
        await this.client.hSet(note.id,  'title', note.title);
        await this.client.hSet(note.id,  'content', note.content);
        await this.client.hSet(note.id,  'deadline', note.deadline);
        return note;
    }

    async update(note) {
        await this.add(note);
    }

    async delete(id) {
        await this.connect();
        await this.client.del(id)
    }

    async getById(id) {
        await this.connect();
        const note = await this.client.hGetAll(id);
        if (Object.keys(note).length==0) {
            return null;
        }
        note["id"] = id;
        return note;
    }

    async search(text) {
        throw new Error("not implemented");
    }

    // private 
    async connect() {
        if (!this.connected) {
            this.connected = true;
            await this.client.connect();
        }
    }
}