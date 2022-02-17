export default class CachedNotes {
    constructor(persistant, cache) {
        this.persistant = persistant;
        this.cache = cache;
    }
    async add(note) {
        return await this.persistant.add(note);
    }

    async update(note) {
        await this.cache.delete(note.id);
        return await this.persistant.update(note);
    }

    async delete(id) {
        await this.cache.delete(id);
        await this.persistant.delete(id);
        return id;
    }

    async getAll() {
        return await this.persistant.getAll();
    }

    async getById(id) {
        let found = await this.cache.getById(id);
        if (found) {
            return found;
        }
        found = await this.persistant.getById(id);
        if (found) {
            await this.cache.add(found);
        }
        return found;
    }
    
    async search(text) {
        return await this.persistant.search(text);;
    }
}