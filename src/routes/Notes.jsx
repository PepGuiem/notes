import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { doFetchGetNotes, doFetchGetNote } from "../js/fetchNotes.js";

export default function Notes() {
  const [notes, setNotes] = useState("");

  const handleClick = async () => {
    const notes = await doFetchGetNotes("http://localhost:8080/notes");
    setNotes(notes);
  };

  async function deleteNote(id) {
    const response = await fetch(`http://localhost:8080/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      handleClick();
    } else {
      console.error('Failed to delete note');
    }
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div>
      <h1>Watch your notes</h1>
      <Link to="/addNote">Add note</Link>
      <table className="table table-bordered table-striped">
        <thead className="thead-light text-center">
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Created date</th>
            <th>Updated date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody className="text-center items-center">
          {notes ? (
            notes.map((note, index) => (
              <tr key={index}>
                <td>{note.title}</td>
                <td>{note.isVoiceNote ? "Voice note" : "Text note"}</td>
                <td>{note.createdAt}</td>
                <td>{note.modifiedAt}</td>
                <td>
                  <Link to={"/notes/" + note.id}>View</Link>
                  <br />
                  <Link to={"/notesModify/" + note.id}>Modify</Link>
                  <br />
                  <button type="button" className="btn btn-danger" onClick={() => deleteNote(note.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Error</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}



