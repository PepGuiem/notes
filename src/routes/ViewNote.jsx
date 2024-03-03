import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { doFetchGetNote } from "../js/fetchNotes.js";
import { doFetchGetFiles, doFetchGetFile } from "../js/fetchFilesNotes.js";

export default function ViewNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [files, setFiles] = useState([]);
  const [audioBlob, setAudioBlob] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const noteData = await doFetchGetNote(`http://localhost:8080/notes/${id}`);
        setNote(noteData);
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

    fetchData();
  }, [id]);

  return (
    <div>
      <h1>Note</h1>
      {note ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <div className="card-text">
              Content: {note.isVoiceNote ? (
                <article className="clip">
                  {audioBlob && <audio controls src={URL.createObjectURL(audioBlob)}></audio>}
                </article>
              ) : (
                <div>{note.body}</div>
              )}
              {!note.isVoiceNote && files ? files.map((file, index) => (
                <div key={index}>
                    {file instanceof Blob && <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        srcSet=""
                        width="400px"
                        height="200px"
                    />}
                </div>
              )) : ""}
            </div>
            <p className="card-text">{note.isVoiceNote ? "Voice note" : "Text note"}</p>
            <p className="card-text">Created at: {new Date(note.createdAt).toLocaleDateString()}</p>
            <p className="card-text">Modified at: {new Date(note.modifiedAt).toLocaleDateString()}</p>
            <p className="card-text">{note.isPublic ? "Public" : "Private"}</p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}


