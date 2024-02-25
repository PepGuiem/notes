import { doFetchGetNote } from "../js/fetchNotes.js";
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ModifyNote() {
  const { id } = useParams();
  const [note, setNotes] = useState("");

   const handleClick = async () => {
    const note = await doFetchGetNote("http://localhost:8080/notes/" + id);
    setNotes(note);
    };

  useEffect( () => {handleClick()}, []);

    return (
    <div>
        <h1>Modify Note</h1>
        {note ? (
            <div>
                <div className="card">
                    <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" placeholder="Enter a title" onChange={(e) => setTitle(e.target.value)} value={note.title}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>
                        <input type="text" className="form-control" id="content" placeholder="Enter a content" onChange={(e) => setContent(e.target.value)} value={note.body}/>
                    </div>
                        <p className="card-text">{note.isVoiceNote ? "Voice note" : "Text note"}</p>
                        <p className="card-text">{note.isPublic ? "Public" : "Private"}</p>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="card-text btn btn-primary" onClick={handleClick}>Submit</button>
                    </div>
                </div>
            </div>
            ) : (
            <tr>
                <td colSpan="5">Error to charge the note</td>
            </tr>
        )}
    </div>
    );
  }