import { doFetchGetNote } from "../js/fetchNotes.js";
import { doFetchModifyNote } from "../js/fetchNotes.js";
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ModifyNote() {
  const { id } = useParams();
  const [note, setNotes] = useState("");
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("");
  const [semaforo, setSemaforo] = useState(false);
  const navigate = useNavigate();

   const handleClick = async () => {
    const note = await doFetchGetNote("http://localhost:8080/notes/" + id);
    setTitle(note.title);
    setContent(note.body)
    setNotes(note);
    setSemaforo(true)
    };

    const sendModify = async () => {
    const notes = await doFetchModifyNote("http://localhost:8080/notes/" + id, title, content);
    if(notes){
        navigate("/notes/" + notes.id)
      }else{
        setError("Error at registration time");
      }
    }

  useEffect( () => {
    if(!semaforo){
        handleClick()
    }
    }, [semaforo]);

    return (
    <div>
        <h1>Modify Note</h1>
        {note ? (
            <div>
                <div className="card">
                    <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" placeholder="Enter a title"  value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>
                        <input type="text" className="form-control" id="content" placeholder="Enter a content" value={content} onChange={(e) => setContent(e.target.value)}/>
                    </div>
                        <p className="card-text">{note.isVoiceNote ? "Voice note" : "Text note"}</p>
                        <p className="card-text">{note.isPublic ? "Public" : "Private"}</p>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="card-text btn btn-primary" onClick={sendModify}>Submit</button>
                    </div>
                </div>
            </div>
            ) : (
            <div>Error to charge the note</div>
        )}
    </div>
    );
  }