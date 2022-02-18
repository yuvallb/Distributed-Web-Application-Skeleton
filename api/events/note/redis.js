import { createClient } from 'redis';

const channel = 'myappNoteEvents';

export default class RedisNoteEvents {
    constructor(url) {
        this.client = createClient({url:url});
        this.connected = false;
    }

    async publish(noteEvent) {
        await this.connect();
        await this.client.publish(channel, JSON.stringify(noteEvent));
    }

    // private 
    async connect() {
        if (!this.connected) {
            this.connected = true;
            await this.client.connect();
        }
    }
}