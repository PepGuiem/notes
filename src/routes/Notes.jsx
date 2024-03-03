import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { doFetchGetNotes, doFetchGetNote } from "../js/fetchNotes.js";

export default function Notes() {
  const [notes, setNotes] = useState("");
  const [order, setOrder] = useState("Null");
  const [filter, setFilter] = useState("All");
  const [searchType, setSearchType] = useState("Title")
  const [search, setSearch] = useState("");

  const handleClick = async () => {
    const notes = await doFetchGetNotes("http://localhost:8080/notes");
    setNotes(notes);
  };

  const handleOrder = (e) => {
    setOrder(e.target.value);
    var notesSorted  = notes;
    if(e.target.value === "Null"){
      setNotes(notesSorted.sort((a,b) => a.id - b.id))
    }else if(e.target.value === "Title"){
      setNotes(notesSorted.sort((a,b) => a.title.localeCompare(b.title)))
    }else if(e.target.value === "Created"){
      setNotes(notesSorted.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt)))
    }else if(e.target.value === "Updated"){
      console.log("hola")
      setNotes(notesSorted.sort((a,b) => new Date(a.modifiedAt) - new Date(b.modifiedAt)))
    }
  }

  const handleFilter = async (e) => {
    setFilter(e.target.value);
    var notesFiltered  = await doFetchGetNotes("http://localhost:8080/notes");
    if(e.target.value === "All"){
      setNotes(notesFiltered)
    }else if(e.target.value === "Voice"){
      setNotes(notesFiltered.filter(note => note.isVoiceNote))
    }else if(e.target.value === "Text"){
      setNotes(notesFiltered.filter(note => !note.isVoiceNote))
    }
  }


  const handleSearchType = async (e) => {
    setSearchType(e.target.value);
  }

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    var notesFiltered  = await doFetchGetNotes("http://localhost:8080/notes");
    if(searchType === "Title"){
      setNotes(notesFiltered.filter(note => note.title.toLowerCase().includes(e.target.value.toLowerCase())));
    }else{
      setNotes(notesFiltered.filter(note => note.body.toLowerCase().includes(e.target.value.toLowerCase())));
    }
  }

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
      <p>Order by:<select className="form-control" id="exampleSelect1" onChange={handleOrder} value={order}>
                    <option value="Null">Nothing</option>
                    <option value="Title">Title</option>
                    <option value="Created">Created date</option>
                    <option value="Updated">Updated date</option>
                  </select>
      </p>
      <p>Filter by:<select className="form-control" id="exampleSelect1" onChange={handleFilter} value={filter}>
                    <option value="All">All</option>
                    <option value="Voice">Voice type</option>
                    <option value="Text">Text type</option>
                  </select>
      </p>
      <p>Search type:<select className="form-control" id="exampleSelect1" onChange={handleSearchType} value={searchType}>
                      <option value="Title">Title</option>
                      <option value="Content">Content</option>
                    </select>
      </p>
      <label htmlFor="content" className="form-label">Search</label>
      <input type="text" className="form-control" id="content" placeholder="Enter a content" onChange={handleSearch}/>
      <br />
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
                <td>{new Date(note.createdAt).toLocaleDateString()}</td>
                <td>{new Date(note.modifiedAt).toLocaleDateString()}</td>
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



