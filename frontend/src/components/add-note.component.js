import React, { Component } from "react";
import NoteDataService from "../services/note.service";

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.newNote = this.newNote.bind(this);

    this.state = {
      id: null,
      title: "",
      content: "",
      deadline: "",

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeContent(e) {
    this.setState({
      content: e.target.value
    });
  }

  onChangeDeadline(e) {
    this.setState({
      deadline: e.target.value
    });
  }

  saveNote() {
    var data = {
      title: this.state.title,
      content: this.state.content,
      deadline: this.state.deadline
    };

    NoteDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          content: response.data.content,
          deadline: response.data.deadline,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newNote() {
    this.setState({
      id: null,
      title: "",
      content: "",
      deadline: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newNote}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <input
                type="text"
                className="form-control"
                id="content"
                required
                value={this.state.content}
                onChange={this.onChangeContent}
                name="content"
              />
            </div>

            <div className="form-group">
              <label htmlFor="deadline">Deadline</label>
              <input
                type="text"
                className="form-control"
                id="deadline"
                required
                value={this.state.deadline}
                onChange={this.onChangeDeadline}
                name="deadline"
              />
            </div>

            <button onClick={this.saveNote} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
