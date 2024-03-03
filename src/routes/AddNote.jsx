import { doFetchAddNote } from "../js/fetchNotes.js";
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { doFetchAddFileNote } from "../js/fetchFilesNotes.js";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [privacity, setIsPublic] = useState("Private");
  const [type, setType] = useState("Text");
  const navigate = useNavigate();
  const [error, setError] = useState(""); 
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [file, setFile] = useState(null);



  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });
        console.log(audioChunks)
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav"});
          setAudioBlob(audioBlob);
        });
        mediaRecorder.start();
      })
      .catch(error => {
        console.error("Error accessing microphone:", error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  const handleStartRecording = () => {
    startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleClick = async () => {
    let contentToSend = content;
    if (type === "Voice" && audioBlob) {
      contentToSend = URL.createObjectURL(audioBlob);
    }

    const notes = await doFetchAddNote("http://localhost:8080/notes", title, contentToSend, (privacity === "Public" ? true : false), (type === "Voice" ? true : false));
    if (notes) {
      if(type === "Voice"){
        console.log(audioBlob);
        await doFetchAddFileNote(`http://localhost:8080/notes/${notes.id}/files`, new File([await audioBlob.arrayBuffer()], `${notes.title}.wav`, { type: 'audio/wav'}))
      }

      if(type !== "Voice" && file){
        await doFetchAddFileNote(`http://localhost:8080/notes/${notes.id}/files`, file)
      }
      navigate("/notes/" + notes.id);
    } else {
      setError("Error at registration time");
    } 
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handlePrivacityChange = (e) => {
    setIsPublic(e.target.value);
  }

  return (
    <div className="container">
      <h1 className="mb-4">Add Note</h1>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" placeholder="Enter a title" onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">Type</label>
        <select className="form-control" id="exampleSelect1" onChange={handleTypeChange} value={type}>
          <option value="Text">Text</option>
          <option value="Voice">Voice</option>
        </select>
      </div>
      {type === "Voice" && (
        <div className="mb-3">
          <div className="d-flex align-items-center">
            <button className="btn btn-primary me-2" onClick={handleStartRecording}>Start Recording</button>
            <button className="btn btn-danger" onClick={handleStopRecording}>Stop Recording</button>
          </div>
          <br />
          <article className="clip">
            <audio controls src={audioBlob ? URL.createObjectURL(audioBlob) : ""}></audio>
          </article>
        </div>
      )}
      {type !== "Voice" && (
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <input type="text" className="form-control" id="content" placeholder="Enter a content" onChange={(e) => setContent(e.target.value)}/>
          <br />
          <form>
            <label htmlFor="fileInput">File:</label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={(event) => setFile(event.target.files[0])}
            />
          </form>
        </div>
        
      )}
      <div className="mb-3">
        <label htmlFor="content" className="form-label">Privacity</label>
        <select className="form-control" id="exampleSelect1" onChange={handlePrivacityChange} value={privacity}>
          <option value="Private" >Private</option>
          <option value="Public" >Public</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
      <br />
      <br />
      {error !== "" ? <p>{error}</p> : <p></p>}
    </div>
  );
}
