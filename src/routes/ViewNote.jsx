import { doFetchGetNote } from "../js/fetchNotes.js";
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ViewNote() {
  const { id } = useParams();
  const [note, setNotes] = useState("");

   const handleClick = async () => {
    const note = await doFetchGetNote("http://localhost:8080/notes/" + id);
    setNotes(note);
    };

  useEffect( () => {handleClick()}, []);

    return (
    <div>
        <h1>Note</h1>
        {note ? (
            <div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">Content: {note.body}</p>
                        <p className="card-text">{note.isVoiceNote ? "Voice note" : "Text note"}</p>
                        <p className="card-text">Created at: {note.createdAt}</p>
                        <p className="card-text">Modified at: {note.modifiedAt}</p>
                        <p className="card-text">{note.isPublic ? "Public" : "Private"}</p>
                        <p><Link to={"/notes/" + id + "/files/"} >View Files</Link></p>
                    </div>
                </div>
            </div>
            ) : (
                <div>Error to charge the note</div>
        )}
    </div>
    );
  }