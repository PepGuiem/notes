import { doFetchGetNotes } from "../js/fetchNotes.js";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function Notes() {

  const [notes, setNotes] = useState("");

   const handleClick = async () => {
    const notes = await doFetchGetNotes("http://localhost:8080/notes");
    setNotes(notes);
  };

  useEffect( () => {handleClick()}, []);

    return (
      <div>
        <h1>Watch your notes</h1>
          <Link to="/addNote">Add note</Link>
          <table className="table table-bordered table-striped">
            <thead className="thead-light text-center">
              <tr>
                <th>
                  Title
                </th>
                <th>
                  Category
                </th>
                <th>
                  Created date
                </th>
                <th>
                  Updated date
                </th>
                <th>
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
            {notes ? (
                <td><td>Cargando...</td></td>
                ) : (
                <tr><td>¡La página ha cargado completamente!</td></tr>
            )}
            </tbody>
          </table>
        </div>
    );
  }


