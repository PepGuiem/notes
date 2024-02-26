import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import HomePage from './routes/HomePage.jsx';
import ErrorPage from "./ErrorPage.jsx";
import Login from "./routes/Login";
import Register from "./routes/Register"
import Notes from "./routes/Notes";
import Root from "./routes/Root";
import ChangePassword from './routes/ChangePassword';
import AddNote from './routes/AddNote.jsx'
import ViewNote from './routes/ViewNote.jsx';
import ModifyNote from './routes/ModifyNote.jsx'; 
import FileNote from './routes/FIleNote.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/notes",
        element: <Notes />
      },
      {
        path: "/login",
        element: <Login />
      
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/changePassword",
        element: <ChangePassword />
      },
      {
        path: "/addNote",
        element: <AddNote />
      },
      {
        path: "/notes/:id",
        element: <ViewNote />
      },
      {
        path: "/notesModify/:id",
        element: <ModifyNote />
      },
      {
        path: "/notes/:id/files",
        element: <FileNote />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
