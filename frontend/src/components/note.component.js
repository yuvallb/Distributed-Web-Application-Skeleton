import React, { Component } from "react";
import NoteDataService from "../services/note.service";

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.getNote = this.getNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);

    this.state = {
      currentNote: {
        id: null,
        title: "",
        content: "",
        deadline: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getNote(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentNote: {
          ...prevState.currentNote,
          title: title
        }
      };
    });
  }

  onChangeContent(e) {
    const content = e.target.value;
    
    this.setState(prevState => ({
      currentNote: {
        ...prevState.currentNote,
        content: content
      }
    }));
  }

  onChangeDeadline(e) {
    const deadline = e.target.value;
    
    this.setState(prevState => ({
      currentNote: {
        ...prevState.currentNote,
        deadline: deadline
      }
    }));
  }

  getNote(id) {
    NoteDataService.get(id)
      .then(response => {
        this.setState({
          currentNote: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateNote() {
    NoteDataService.update(
      this.state.currentNote.id,
      this.state.currentNote
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The note was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteNote() {    
    NoteDataService.delete(this.state.currentNote.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/notes')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentNote } = this.state;

    return (
      <div>
        {currentNote ? (
          <div className="edit-form">
            <h4>Note</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentNote.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <input
                  type="text"
                  className="form-control"
                  id="content"
                  value={currentNote.content}
                  onChange={this.onChangeContent}
                />
              </div>
              <div className="form-group">
                <label htmlFor="deadline">Deadline</label>
                <input
                  type="text"
                  className="form-control"
                  id="deadline"
                  value={currentNote.deadline}
                  onChange={this.onChangeDeadline}
                />
              </div>
              </form>
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteNote}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateNote}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Note...</p>
          </div>
        )}
      </div>
    );
  }
}
