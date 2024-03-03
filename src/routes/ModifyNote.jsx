import { doFetchGetNote } from "../js/fetchNotes.js";
import { doFetchModifyNote } from "../js/fetchNotes.js";
import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { doFetchGetFiles, doFetchGetFile, doFetchAddFileNote, doFetchDelteFileNote } from "../js/fetchFilesNotes.js";

export default function ModifyNote() {
  const { id } = useParams();
  const [note, setNotes] = useState("");
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("");
  const [semaforo, setSemaforo] = useState(false);
  const [type, setType] = useState("")
  const [privacity, setPrivacity] = useState("");
  const [files, setFiles] = useState([]);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

   const handleClick = async () => {
    try {
        const noteData = await doFetchGetNote("http://localhost:8080/notes/" + id);
        setTitle(noteData.title);
        setType( noteData.isVoiceNote ? "Voice" : "Text");
        setPrivacity( noteData.isPublic ? "Public" : "Private");
        setContent(noteData.body);
        setNotes(noteData);
        setSemaforo(true)

        const filesData = await doFetchGetFiles(`http://localhost:8080/notes/${id}/files`);
        setFiles(filesData);
        if (!noteData.isVoiceNote) {
          const filePromises = filesData.map(async element => {
            const file = await doFetchGetFile(element.uri);
            return file;
          });
          const resolvedFiles = await Promise.all(filePromises);
          setFiles(resolvedFiles);
        }

        if (filesData && filesData.length > 0 && noteData.isVoiceNote) {
          const file = await doFetchGetFile(filesData[0].uri);
          setAudioBlob(file);
        }
      } catch (error) {
        console.error('Error al obtener la nota:', error);
      } 
    };

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            const audioChunks = [];
            mediaRecorder.addEventListener("dataavailable", event => {
              audioChunks.push(event.data);
            });
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
    

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handlePrivacityChange = (e) => {
        setPrivacity(e.target.value);
    };

    const sendModify = async () => {
        const notes = await doFetchModifyNote("http://localhost:8080/notes/" + id, title, content, (privacity === "Private" ? false : true), (type === "Voice" ? true : false));
        if (notes) {
            const filesData = await doFetchGetFiles(`http://localhost:8080/notes/${id}/files`);
            if(type === "Voice"){
                filesData.map(async element => {
                    console.log(element)
                     await doFetchDelteFileNote(element.uri);
                });
              await doFetchAddFileNote(`http://localhost:8080/notes/${notes.id}/files`, new File([await audioBlob.arrayBuffer()], `${notes.title}.wav`, { type: 'audio/wav'}))
            }else if(type === "Text" && filesData){
                filesData.map(async element => {
                    const file = await doFetchGetFile(element.uri);
                    if(file.type === "audio/wav"){
                        await doFetchDelteFileNote(element.uri);
                    }
                });
            }
      
            if(type !== "Voice" && file){
              await doFetchAddFileNote(`http://localhost:8080/notes/${notes.id}/files`, file)
            }
            navigate("/notes/" + notes.id);
        } else {
            setError("Error at registration time");
        }

        if(notes){
            navigate("/notes/" + notes.id)
        }else{
            setError("Error at registration time");
        }
    }

    const addFile = async () => {
        await doFetchAddFileNote(`http://localhost:8080/notes/${id}/files`, file)
        const filesData = await doFetchGetFiles(`http://localhost:8080/notes/${id}/files`);
        setFiles(filesData);
        if (type !== "Voice") {
          const filePromises = filesData.map(async element => {
            const file = await doFetchGetFile(element.uri);
            if(file.type !== "audio/wav"){
                return file;
            }
          });
          const resolvedFiles = await Promise.all(filePromises);
          setFiles(resolvedFiles);
        }
    }

    async function deleteFile(index){
        var filesData = await doFetchGetFiles(`http://localhost:8080/notes/${id}/files`);
        await doFetchDelteFileNote(filesData[index].uri);
        filesData = await doFetchGetFiles(`http://localhost:8080/notes/${id}/files`);
        const filePromises = filesData.map(async element => {
            const file = await doFetchGetFile(element.uri);
            if(file.type !== "audio/wav"){
                return file;
            }
          });
          const resolvedFiles = await Promise.all(filePromises);
          setFiles(resolvedFiles);
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
                            {type === "Voice" ? (
                                <div>
                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-primary me-2" onClick={handleStartRecording}>Start Recording</button>
                                        <button className="btn btn-danger" onClick={handleStopRecording}>Stop Recording</button>
                                    </div>
                                    <br />
                                    <article className="clip">
                                        {audioBlob && <audio controls src={URL.createObjectURL(audioBlob)}></audio>}
                                    </article>
                                </div>
                            ) : (
                                <div>
                                    <label htmlFor="content" className="form-label">Content</label>
                                    <input type="text" className="form-control" id="content" placeholder="Enter a content" value={content} onChange={(e) => setContent(e.target.value)}/>
                                    <form>
                                        <label htmlFor="fileInput">File:</label>
                                        <input
                                        id="fileInput"
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => setFile(event.target.files[0])}
                                        />
                                        <button onClick={addFile}>Add file</button>
                                        <br />
                                    </form>
                                </div>
                            )}
                            {type !== "Voice" && files ? files.map((file, index) => (
                                <div key={index}>
                                    {file instanceof Blob && (
                                        <div>
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt=""
                                                srcSet=""
                                                width="400px"
                                                height="200px"
                                            />
                                            <button onClick={() => deleteFile(index)}>Delete File</button>
                                        </div>
                                    )}
                                    <br />
                                </div>
                            )) : ""}
                    </div>
                    <label className="form-label">Type</label>
                    <select className="form-control" id="exampleSelect1" onChange={handleTypeChange} value={type}>
                        <option value="Text">Text</option>
                        <option value="Voice">Voice</option>
                    </select>
                    <br />
                    <label className="form-label">Privacity</label>
                    <select className="form-control" id="exampleSelect1" onChange={handlePrivacityChange} value={privacity}>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                    </div>
                    
                    <div className="mb-3">
                        <button type="submit" className="card-text btn btn-primary" onClick={sendModify}>Submit</button>
                    </div>
                </div>
            </div>
            ) : (
            <div>Error to charge the note</div>
        )}
        {error ? "Error to register the note" : ""}
    </div>
    );
}
