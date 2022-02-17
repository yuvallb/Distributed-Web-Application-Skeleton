import React, { Component } from "react";
import NoteDataService from "../services/note.service";
import { Link } from "react-router-dom";

export default class NotesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveNotes = this.retrieveNotes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveNote = this.setActiveNote.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      notes: [],
      currentNote: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveNotes();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveNotes() {
    NoteDataService.getAll()
      .then(response => {
        this.setState({
          notes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveNotes();
    this.setState({
      currentNote: null,
      currentIndex: -1
    });
  }

  setActiveNote(note, index) {
    this.setState({
      currentNote: note,
      currentIndex: index
    });
  }


  searchTitle() {
    this.setState({
      currentNote: null,
      currentIndex: -1
    });

    NoteDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          notes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, notes, currentNote, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Notes List</h4>

          <ul className="list-group">
            {notes &&
              notes.map((note, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveNote(note, index)}
                  key={index}
                >
                  {note.title}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentNote ? (
            <div>
              <h4>Note</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentNote.title}
              </div>
              <div>
                <label>
                  <strong>Content:</strong>
                </label>{" "}
                {currentNote.content}
              </div>
              <div>
                <label>
                  <strong>Deadline:</strong>
                </label>
                {currentNote.deadline}
              </div>

              <Link
                to={"/notes/" + currentNote.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Note...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
