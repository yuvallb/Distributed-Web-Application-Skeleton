import { MongoClient } from 'mongodb'

const databaseName = 'myapp';
const collectionName = 'notes';

export default class MongoNotes {

    constructor(uri) {
        const client = new MongoClient(uri);
        client.connect();
        const database = client.db(databaseName);
        this.collection = database.collection(collectionName);
    }

    async add(note) {
        note["_id"] = note.id;
        await this.collection.insertOne(note);
        delete note["_id"];
        return note;
    }

    async update(note) {
        note["_id"] = note.id;
        const result = await this.collection.replaceOne({"_id":note.id}, note);
        if (result.matchedCount == 1) {
            delete note["_id"];
            return note;
        } else {
            return {};
        }
    }

    async delete(id) {
        const result = await this.collection.deleteOne({"_id":id});
        if (result.deletedCount === 1) {
            return {id:id};
        } else {
            return {};
        }
    }

    async getAll() {
        return this.mongoFind({});
    }

    async getById(id) {
        const note = await this.collection.findOne({"_id":id});
        delete note["_id"];
        return note;
    }

    async search(text) {
        console.log('searching mongo for ' + text);
        // this is really unsafe - you need to sanitize the regex!
        return this.mongoFind({'title': {'$regex': text, '$options': 'i'}});
    }


    // private
    async mongoFind(query) {
        const notes = this.collection.find(query).map((note)=>{delete note["_id"]; return note});
        return notes.toArray();
    }

}