import http from "../http-common";

class NoteDataService {
  getAll() {
    return http.get("/notes");
  }

  get(id) {
    return http.get(`/notes/${id}`);
  }

  create(data) {
    return http.post("/notes", data);
  }

  update(id, data) {
    return http.put(`/notes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/notes/${id}`);
  }

  deleteAll() {
    return http.delete(`/notes`);
  }

  findByTitle(title) {
    return http.get(`/notes/search?text=${title}`);
  }
}

export default new NoteDataService();