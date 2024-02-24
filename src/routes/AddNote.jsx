import { doFetchAddNote } from "../js/fetchNotes.js";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function AddNote() {

  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [privacity, setIsPublic] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState("");

   const handleClick = async () => {
    const notes = await doFetchAddNote("http://localhost:8080/notes");
    if(notes == true){
        navigate("/")
      }else{
        setError("Error at registration time");
      } 
  };

    return (
        <div className="container">
        <h1 className="mb-4">Add Note</h1>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" placeholder="Enter a title" onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Password</label>
            <input type="text" className="form-control" id="content" placeholder="Enter a content" onChange={(e) => setContent(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
          <br />
          <br />
          {error != "" ? <p>{error}</p> : <p></p>}
      </div>
    );
  }