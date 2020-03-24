import React, { Component, Fragment } from "react";
import "./Dashboard.scss";
import {
  addDataToAPI,
  getDataFromAPI,
  updateNoteFromAPI,
  deleteNoteFromAPI
} from "../../../config/redux/action";
import { connect } from "react-redux";
class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    textBtn: "SIMPAN",
    noteId: ""
  };

  componentDidMount() {
    const { getDataAPI } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    getDataAPI(userData.uid);
  }

  hendleSaveNote = () => {
    const { title, content, textBtn, noteId } = this.state;
    const { saveNotes, updateNoteAPI } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));

    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid
    };
    if (textBtn === "SIMPAN") {
      saveNotes(data);
    } else if (textBtn === "UPDATE") {
      data.noteId = noteId;
      updateNoteAPI(data);
      this.setState({
        title: "",
        content: "",
        date: ""
      });
    }
  };

  hendleChangetext = (e, type) => {
    this.setState({
      [type]: e.target.value
    });
  };

  updateNote = note => {
    this.setState({
      title: note.data.title,
      content: note.data.content,
      textBtn: "UPDATE",
      noteId: note.id
    });
  };

  hendleCancel = () => {
    this.setState({
      title: "",
      content: "",
      date: "",
      textBtn: "SIMPAN"
    });
  };

  hendleRemove = (e, note) => {
    console.log(note);
    const { deleteNotes } = this.props;
    e.stopPropagation();
    const userData = JSON.parse(localStorage.getItem("userData"));

    const data = {
      date: new Date().getTime(),
      noteId: note.id,
      userId: userData.uid
    };

    deleteNotes(data);
  };

  render() {
    const { title, content, textBtn } = this.state;
    const { notes } = this.props;
    const { updateNote } = this;
    return (
      <div className="container">
        <div className="input-form">
          <input
            type="text"
            className="input-title"
            placeholder="Title"
            value={title}
            onChange={e => this.hendleChangetext(e, "title")}
          />
          <textarea
            value={content}
            className="input-content"
            name="contant"
            id="content"
            placeholder="Enter Notes"
            onChange={e => this.hendleChangetext(e, "content")}
          ></textarea>
          <div className="actionNotes">
            {textBtn === "UPDATE" ? (
              <Fragment>
                <button className="save-btn cancel" onClick={this.hendleCancel}>
                  CANCEL
                </button>
              </Fragment>
            ) : (
              <Fragment>
                <div className=""></div>
              </Fragment>
            )}
            <button className="save-btn" onClick={this.hendleSaveNote}>
              {textBtn}
            </button>
          </div>
        </div>
        <hr />
        {notes.length > 0 ? (
          <Fragment>
            {notes.map(note => {
              return (
                <div
                  className="card-cotent"
                  key={note.id}
                  onClick={() => updateNote(note)}
                >
                  <p className="title">{note.data.title}</p>
                  <p className="date">{note.data.date}</p>
                  <p className="contant">{note.data.content}</p>
                  <div
                    className="detele-btn"
                    onClick={e => {
                      this.hendleRemove(e, note);
                    }}
                  >
                    x
                  </div>
                </div>
              );
            })}
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const reduxState = state => ({
  userData: state.user,
  notes: state.notes
});

const reduxDispatch = dispatch => ({
  saveNotes: data => dispatch(addDataToAPI(data)),
  getDataAPI: data => dispatch(getDataFromAPI(data)),
  updateNoteAPI: data => dispatch(updateNoteFromAPI(data)),
  deleteNotes: data => dispatch(deleteNoteFromAPI(data))
});

export default connect(reduxState, reduxDispatch)(Dashboard);
